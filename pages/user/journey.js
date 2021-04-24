import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import Image from 'next/image';
import { useUser } from '../../lib/hooks';
import Card from '../../components/dashboard/smallCard';
import DeleteModal from '../../components/deleteModal';
import { buildLocalDateTime } from '../../lib/common';
import {
  deleteJourneyById,
  removeJourneyPassengerById,
} from '../../controllers/journey';

export default function UserJourney() {
  const user = useUser({ redirect: true });

  const sortObj = (obj) => {
    return obj.sort((a, b) => {
      const date1 = a.timeOfDeparture;
      const date2 = b.timeOfDeparture;
      return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
    });
  };

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  const [confirmModal, setConfirmModal] = useState(false);
  const [journeyIdToDelete, setJourneyIdToDelete] = useState();
  const [journeys, setJourneys] = useState(user?.journey);

  useEffect(() => {
    if (user?.journey) {
      const sortedJourneys = sortObj(user?.journey);
      setJourneys(sortedJourneys);
    }
  }, [user]);

  const generateCards = () => {
    if (!journeys || journeys.length < 1) return;

    let cards = [];

    for (let i = 0; i < sortObj(journeys).length; i++) {
      const element = journeys[i];

      const departure =
        element.departure.name === 'Company'
          ? 'Work'
          : `${element.departure.street}, ${element.departure.city}`;

      const destination =
        element.destination.name === 'Company'
          ? 'Work'
          : `${element.destination.street}, ${element.destination.city}`;

      const seats = element.maxPassengers - element.passengers.length;

      const { date, time } = buildLocalDateTime(
        element.timeOfDeparture,
        true
      );

      const name =
        user.user._id === element.driverId._id
          ? 'You'
          : `${
              element.driverId.firstName
            } ${element.driverId.lastName.substring(0, 1)}.`;

      const phoneNumber = element.driverId.phoneNumber;

      cards.push(
        <Card
          booked={true}
          handleDelete={() => confirmDeletion(element._id)}
          phoneNumber={phoneNumber}
          name={name}
          date={date}
          time={time}
          seats={seats}
          from={departure}
          to={destination}
          key={element._id}
        ></Card>
      );
    }

    return cards;
  };

  const [cards, setCards] = useState(() => generateCards());

  useEffect(() => {
    setCards(() => generateCards());
  }, [journeys]);

  const removeBookedJourney = async () => {
    const journey = journeys.find(
      (trip) => trip._id === journeyIdToDelete
    );
    const userId = user.user._id;
    const driverId = journey.driverId._id;

    if (userId === driverId) {
      await deleteJourneyById(journeyIdToDelete);
    } else {
      await removeJourneyPassengerById(journeyIdToDelete, userId);
    }

    const newJourneys = journeys.filter(
      (trip) => trip._id !== journeyIdToDelete
    );
    setJourneys(newJourneys);

    setConfirmModal(false);
    setJourneyIdToDelete('');
  };

  const confirmDeletion = (id) => {
    setJourneyIdToDelete(id);
    setConfirmModal(true);
  };

  return (
    <Layout
      errorVisibility={errorBanner}
      errorMessage={errorMsg}
      closeBannerFunc={() => setErrorBanner(false)}
      customStyles="lg:my-auto"
    >
      <DeleteModal
        isVisible={confirmModal}
        closeModal={() => setConfirmModal(false)}
        confirmAction={() => removeBookedJourney()}
        title={'Remove this journey'}
        message={
          'Are you sure you want to remove this journey ? This action cannot be undone'
        }
        confirmBtnMessage={'I am sure ! Remove !'}
      ></DeleteModal>
      {journeys && journeys?.length < 1 ? (
        <div className="flex flex-col justify-between items-center">
          <h2 className="font-medium text-md md:text-xl whitespace-nowrap text-caribbeanGreen bg-blueInk px-8 py-4 rounded mx-4 mb-8-mt-12">
            No journeys planned !
          </h2>
          <div className="w-10/12 md:w-6/12">
            <Image
              alt="You have no journeys yet"
              src="/images/noJourneys.png"
              layout="intrinsic"
              width={911}
              height={911}
            />
          </div>
        </div>
      ) : (
        <>{cards}</>
      )}
    </Layout>
  );
}
