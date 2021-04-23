import React, { useState } from 'react';
import Layout from '../../components/dashboard/layout';
import Image from 'next/image';
import { useUser } from '../../lib/hooks';
import Card from '../../components/dashboard/smallCard';
import DeleteModal from '../../components/deleteModal';
import { buildLocalDateTime } from '../../lib/common';

export default function UserJourney() {
  const user = useUser();
  console.log('🚀   user', user);
  useUser({ redirect: true });
  const journeys = user?.journey;

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  const [confirmModal, setConfirmModal] = useState(false);
  const [journeyIdToDelete, setJourneyIdToDelete] = useState();

  // TODO: Get les journeys non passés

  const generateCards = () => {
    if (!journeys || journeys.length < 1) return;

    let cards = [];

    for (let i = 0; i < journeys.length; i++) {
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

  const removeBookedJourney = () => {
    setConfirmModal(false);
    // TODO: Delete journey + refresh list
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
    >
      <DeleteModal
        isVisible={confirmModal}
        closeModal={() => setConfirmModal(false)}
        confirmAction={() => removeBookedJourney()}
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
        <>{generateCards()}</>
      )}
    </Layout>
  );
}
