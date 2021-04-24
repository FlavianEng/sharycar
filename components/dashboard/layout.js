import React from 'react';
import Image from 'next/image';
import Nav from '../../components/dashboard/nav';
import ErrorBanner from '../errorBanner';

export default function Layout({
  children,
  errorMessage,
  errorVisibility,
  closeBannerFunc,
  customStyles,
  useBg = true,
  customBg,
}) {
  return (
    <>
      <div className={`w-screen h-screen ${customBg}`}>
        {useBg && (
          <div className="fixed w-screen h-screen overflow-hidden -z-1 filter brightness-90">
            <Image
              alt="Background"
              src="/images/dashboardBack.png"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        )}

        <Nav></Nav>
        <div className="flex flex-col h-screen-95 items-center overflow-x-hidden">
          <ErrorBanner
            isVisible={errorVisibility}
            closeBanner={closeBannerFunc}
            errorMsg={errorMessage}
          ></ErrorBanner>
          <div
            className={`pb-14 lg:pb-0 lg:pt-14 flex flex-col lg:flex-row-reverse ${customStyles}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
