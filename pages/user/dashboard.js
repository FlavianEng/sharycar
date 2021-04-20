import React, { useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FindRoute from '../../components/dashboard/findRoute';
import CreateRoute from '../../components/dashboard/createRoute';
import { useUser } from '../../lib/hooks';

export default function UserDashboard() {
  const user = useUser();

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  // Create route state
  // TODO: Get car informations
  const [humanHasACar, setHumanHasACar] = useState(true); // Set to false at start
  const [isOpenedCreate, setIsOpenedCreate] = useState(false);

  // Find route state
  const [isOpenedSearch, setIsOpenedSearch] = useState(false);

  const throwError = (msg) => {
    setErrorMsg(msg);
    setErrorBanner(true);
  };

  const openCreateRoute = () => {
    humanHasACar
      ? setIsOpenedCreate(true)
      : throwError('You must first provide a car in your profile');
  };

  return (
    <Layout
      errorVisibility={errorBanner}
      errorMessage={errorMsg}
      closeBannerFunc={() => {
        setErrorBanner(false);
      }}
    >
      {!isOpenedSearch && (
        <CreateRoute
          humanHasACar={humanHasACar}
          handleOpen={openCreateRoute}
          handleClose={() => {
            setIsOpenedCreate(false);
          }}
          isOpened={isOpenedCreate}
          displayErrorMessage={(msg) => throwError(msg)}
          userData={user}
        ></CreateRoute>
      )}
      {!isOpenedCreate && (
        <FindRoute
          isOpened={isOpenedSearch}
          handleClose={() => {
            setIsOpenedSearch(false);
          }}
          handleOpen={() => setIsOpenedSearch(true)}
          displayErrorMessage={(msg) => throwError(msg)}
          bookingFailed={() => throwError('Unable to book')}
          userData={user}
        ></FindRoute>
      )}
    </Layout>
  );
}
