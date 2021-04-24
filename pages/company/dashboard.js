import React from 'react';
import Layout from '../../components/dashboard/layout';
import { useUser } from '../../lib/hooks';
import Stats from '../../components/dashboard/stats';

export default function CompanyDashboard() {
  useUser({ redirect: true });

  return (
    <Layout company={true} customStyles="">
      <div className="flex flex-col items-center ">
        <div className="w-screen mt-12">
          <div className="flex mx-auto w-11/12 items-center justify-center bg-blueInk p-4 rounded-md whitespace-nowrap">
            <h2 className="text-xl text-wildStrawberry font-medium">
              Member statistics
            </h2>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full justify-center">
          <Stats statName="Total number :" statValue={36}></Stats>
          <Stats statName="New this month :" statValue={11}></Stats>
        </div>
      </div>
    </Layout>
  );
}
