import React from 'react';
import Layout from '../../components/dashboard/layout';
import { logoutUser } from '../../controllers/session';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';

export default function CompanyAccount() {
  const dispatch = useDispatch();

  const logout = async () => {
    await logoutUser();
    dispatch({ type: userActions.IsAnonymous });
  };

  return (
    <Layout company={true} customStyles="my-auto">
      <div className="flex flex-col items-center">
        <button
          className="focus:outline-none flex p-3 m-4 mb-8 justify-center text-md w-72 rounded-md border-2 border-transparent text-blueInk bg-wildStrawberry lg:hover:bg-blueInk lg:hover:border-wildStrawberry lg:hover:text-wildStrawberry font-monument font-medium"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}
