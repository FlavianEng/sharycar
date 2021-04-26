import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import Card from '../../components/dashboard/addressCard';
import CreateAddress from '../../components/dashboard/createAddress';
import DeleteModal from '../../components/deleteModal';
import {
  getUserFromId,
  removeUserAddress,
} from '../../controllers/user';
import { useUser } from '../../lib/hooks';

export default function UserJourney() {
  const user = useUser();

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [addresses, setAddresses] = useState(user?.user.addressId);
  const [userId, setUserId] = useState(user?.user._id);
  const [companyNationality, setCompanyNationality] = useState(
    user?.user?.companyId?.companyNationality
  );
  const [addressIdToDelete, setAddressIdToDelete] = useState();

  useEffect(() => {
    setAddresses(user?.user.addressId);
    setUserId(user?.user._id);
    setCompanyNationality(user?.user?.companyId?.companyNationality);
  }, [user]);

  const displayError = (message) => {
    setErrorMsg(message);
    setErrorBanner(true);
  };

  const removeAddress = async () => {
    const data = {
      id: userId,
      address: addressIdToDelete,
    };

    const remove = await removeUserAddress(data);

    if (!remove.success || remove.data.nModified !== 1) {
      displayError('Unable to remove the address');
    }

    if (remove.success && remove.data.nModified === 1) {
      const newAddresses = addresses.filter(
        (address) => address._id !== addressIdToDelete
      );
      setAddresses(newAddresses);
    }

    setConfirmModal(false);
    setAddressIdToDelete();
  };

  const confirmDeletion = (id) => {
    setAddressIdToDelete(id);
    setConfirmModal(true);
  };

  const generateCards = () => {
    if (!addresses || addresses?.length < 1) return;

    let cards = [];

    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      cards.push(
        <Card
          isHome={address.name.toLowerCase() === 'home'}
          addressName={address.name}
          street={address.street}
          city={address.city}
          handleDelete={() => confirmDeletion(address._id)}
          key={address._id}
        ></Card>
      );
    }

    return cards;
  };

  const [cards, setCards] = useState(() => generateCards());

  useEffect(() => {
    setCards(() => generateCards());
  }, [addresses]);

  const refreshAddresses = async () => {
    const user = await getUserFromId(userId);
    setAddresses(user?.data.addressId);
  };

  return (
    <Layout
      errorVisibility={errorBanner}
      errorMessage={errorMsg}
      closeBannerFunc={() => setErrorBanner(false)}
      customStyles={isCreateOpen && 'my-auto lg:my-0'}
    >
      <DeleteModal
        isVisible={confirmModal}
        closeModal={() => setConfirmModal(false)}
        confirmAction={() => removeAddress()}
        title={'Remove this address'}
        message={
          'Are you sure you want to remove this address ? This action cannot be undone'
        }
        confirmBtnMessage={'Yes I am sure Captain !'}
      ></DeleteModal>

      {/* Mobile */}
      <div className="lg:hidden">
        <CreateAddress
          isOpened={isCreateOpen}
          handleOpen={() => setIsCreateOpen(true)}
          handleClose={() => setIsCreateOpen(false)}
          userId={userId}
          companyNationality={companyNationality}
          error={(msg) => displayError(msg)}
          refreshAddresses={() => {
            refreshAddresses();
          }}
        ></CreateAddress>

        {!isCreateOpen && (
          <>
            <div className="flex flex-col w-72 lg:w-96 items-center mt-4 mx-auto lg:mx-8 lg:mr-40">
              <div className="flex flex-col w-full rounded-md items-center mb-4 mx-auto lg:mx-8 bg-blueInk">
                <h2 className="text-2xl text-wildStrawberry p-4 font-bold">
                  My addresses
                </h2>
              </div>
              {cards}
            </div>
          </>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-row-reverse">
        <CreateAddress
          isOpened={true}
          userId={userId}
          companyNationality={companyNationality}
          error={(msg) => displayError(msg)}
          refreshAddresses={() => {
            refreshAddresses();
          }}
        ></CreateAddress>

        <div className="flex flex-col w-72 lg:w-96 items-center mt-4 mx-auto lg:mx-8 lg:mr-40">
          <div className="flex flex-col w-full rounded-md items-center mb-4 mx-auto lg:mx-8 bg-blueInk">
            <h2 className="text-2xl text-wildStrawberry p-4 font-bold">
              My addresses
            </h2>
          </div>
          {cards}
        </div>
      </div>
    </Layout>
  );
}
