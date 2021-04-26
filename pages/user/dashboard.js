import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FindRoute from '../../components/dashboard/findRoute';
import CreateRoute from '../../components/dashboard/createRoute';
import { useUser } from '../../lib/hooks';
import Image from 'next/image';

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
      closeRefreshBtn={() => setReloadBanner(false)}
      customStyles="m-auto"
    >
      <div className="flex w-full flex-col lg:flex-row-reverse justify-between items-center">
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
      </div>
      {!isOpenedCreate && !isOpenedSearch ? (
        <div className="hidden lg:flex flex-col items-center w-full justify-center mt-8">
          <p className="text-2xl text-wildStrawberry font-bold mb-4 flex flex-col items-center whitespace-nowrap">
            Scan me to download the App !{' '}
            <span className="text-base p-4 pb-2">
              Beta version - For{' '}
              <strong className="underline text-caribbeanGreen text-lg">
                iPhone
              </strong>
              , click on the Share icon then on "Add to Home Screen".
              Et voilà !
            </span>
            <span className="text-base p-4 pt-2">
              Beta version - For{' '}
              <strong className="underline text-caribbeanGreen text-lg">
                Android
              </strong>
              , wait a bit and a popup will appear asking if you want
              to install the app. Et voilà !
            </span>
            <span className="text-xs text-wildStrawberry-light">
              It's like a box of chocolate, you'll never know which
              bug can happen !
            </span>
          </p>
          <div className="w-1/5">
            <Image
              alt="Qr code to download app"
              src="/images/qr-code.png"
              layout="intrinsic"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      ) : undefined}
    </Layout>
  );
}
