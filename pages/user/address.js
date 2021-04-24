import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import { useUser } from '../../lib/hooks';
import Card from '../../components/dashboard/addressCard';
import CreateAddress from '../../components/dashboard/createAddress';
import DeleteModal from '../../components/deleteModal';

export default function UserJourney() {
  const user = useUser({ redirect: true });

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState();

  const removeAddress = () => {
    console.log('DELETE');
    setConfirmModal(false);
    setAddressIdToDelete();
  };

  const confirmDeletion = (id) => {
    setAddressIdToDelete(id);
    setConfirmModal(true);
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
      <div className="lg:hidden">
        <CreateAddress
          isOpened={isCreateOpen}
          handleOpen={() => setIsCreateOpen(true)}
          handleClose={() => setIsCreateOpen(false)}
        ></CreateAddress>

        {!isCreateOpen && (
          <>
            <div className="flex flex-col w-72 lg:w-96 items-center mt-4 mx-auto lg:mx-8 lg:mr-40">
              <div className="flex flex-col w-full rounded-md items-center mb-4 mx-auto lg:mx-8 bg-blueInk">
                <h2 className="text-2xl text-wildStrawberry p-4 font-bold">
                  My addresses
                </h2>
              </div>
              <Card handleDelete={() => confirmDeletion('ID')}></Card>
            </div>
          </>
        )}
      </div>

      <div className="hidden lg:flex flex-row-reverse">
        <CreateAddress isOpened={true}></CreateAddress>

        <div className="flex flex-col w-72 lg:w-96 items-center mt-4 mx-auto lg:mx-8 lg:mr-40">
          <div className="flex flex-col w-full rounded-md items-center mb-4 mx-auto lg:mx-8 bg-blueInk">
            <h2 className="text-2xl text-wildStrawberry p-4 font-bold">
              My addresses
            </h2>
          </div>
          <Card handleDelete={() => confirmDeletion('ID')}></Card>
        </div>
      </div>
    </Layout>
  );
}
