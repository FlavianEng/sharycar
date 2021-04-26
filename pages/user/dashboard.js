import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FindRoute from '../../components/dashboard/findRoute';
import CreateRoute from '../../components/dashboard/createRoute';
import { useUser } from '../../lib/hooks';

export default function UserDashboard() {
  const [reloadBanner, setReloadBanner] = useState(false);
  const user = useUser();

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  // Create route state
  const [humanHasACar, setHumanHasACar] = useState(false); // Set to false at start
  const [isOpenedCreate, setIsOpenedCreate] = useState(false);

  // Find route state
  const [isOpenedSearch, setIsOpenedSearch] = useState(false);

  useEffect(() => {
    if (!user) {
      setReloadBanner(true);
    } else {
      setReloadBanner(false);
    }

    if (user?.car) {
      setHumanHasACar(true);
    } else {
      setHumanHasACar(false);
    }
  }, [user]);

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
      refreshVisibility={reloadBanner}
      customStyles="my-auto"
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
          userData={user}
        ></FindRoute>
      )}
    </Layout>
  );
}
