import React from 'react';
import Nav from '../../components/dashboard/nav';
import ErrorBanner from '../errorBanner';
import Head from 'next/head';
import RefreshBtn from '../refreshBtn';

export default function Layout({
  children,
  errorMessage,
  errorVisibility,
  closeBannerFunc,
  customStyles,
  customBg = '',
  company,
  refreshVisibility,
  closeRefreshBtn,
}) {
  return (
    <>
      <Head>
        <title>Sharycar</title>
      </Head>
      <div
        className={`w-screen h-screen bg-dashboardBack bg-left-bottom ${customBg}`}
      >
        <Nav company={company}></Nav>
        <div className="flex flex-col h-screen-95 items-center overflow-x-hidden">
          <RefreshBtn
            isVisible={refreshVisibility}
            closeRefresh={closeRefreshBtn}
          ></RefreshBtn>
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
