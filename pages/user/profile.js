import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import DeleteModal from '../../components/deleteModal';
import TextInput from '../../components/textInput';
import DateInput from '../../components/dateInput';
import { deleteUser, updateUser } from '../../controllers/user';
import { logoutUser } from '../../controllers/session';
import { useSelector, useDispatch } from 'react-redux';
import { userActions, wrapper } from '../../store';
import { useUser } from '../../lib/hooks';

export const getStaticProps = wrapper.getStaticProps(
  (store) => ({ preview }) => {
    store.dispatch({
      type: 'TICK',
      payload: 'was set in other page ' + preview,
    });
  }
);

export default function UserProfile() {
  useUser();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');
  const [confirmModal, setConfirmModal] = useState(false);

  // Local states
  const [phoneInEdition, setPhoneInEditon] = useState(false);
  const [birthdayInEdition, setBirthdayInEditon] = useState(false);
  const [email, setEmail] = useState(user?.user.email);
  const [phone, setPhone] = useState(user?.user.phoneNumber);
  const [birthday, setBirthday] = useState(user?.user.birthday);

  const displayError = (msg) => {
    setErrorMsg(msg);
    setErrorBanner(true);
  };

  useEffect(() => {
    setEmail(user?.user.email);
    setPhone(user?.user.phoneNumber);
    setBirthday(user?.user.birthday);
  }, [user]);

  const togglePhoneEdit = () => {
    setPhoneInEditon(!phoneInEdition);
  };

  const toggleBirthdayEdit = () => {
    setBirthdayInEditon(!birthdayInEdition);
  };

  const save = async (field) => {
    const el = document.querySelector(`#${field}`);
    const value = el.value;

    const isIdentical =
      field === 'phone'
        ? value.trim() === phone.trim()
        : value === birthday;

    if (isIdentical) {
      return;
    }

    field === 'phone' ? setPhone(value) : setBirthday(value);

    const data =
      field === 'phone'
        ? {
            id: user.user._id,
            phone: value,
          }
        : {
            id: user.user._id,
            birthday: value,
          };

    const res = await updateUser(data);

    if (!res.success || res.data.nModified !== 1) {
      displayError('Unable to update');
    }

    field === 'phone' ? setPhone(value) : setBirthday(value);
  };

  const deleteAccount = async () => {
    await deleteUser(user);
    dispatch({ type: userActions.IsAnonymous });
  };

  const logout = async () => {
    await logoutUser();
    dispatch({ type: userActions.IsAnonymous });
  };

  return (
    <Layout
      errorVisibility={errorBanner}
      errorMessage={errorMsg}
      closeBannerFunc={() => setErrorBanner(false)}
      customBg="bg-blueInk"
      useBg={false}
    >
      <DeleteModal
        isVisible={confirmModal}
        closeModal={() => setConfirmModal(false)}
        confirmAction={() => deleteAccount()}
        title={'Delete your account'}
        message={
          'Are you sure you want to delete your account ? This action cannot be undone and all your data will be deleted !'
        }
        confirmBtnMessage={'Delete my account'}
      ></DeleteModal>
      <div className="lg:ml-40 lg:mt-8">
        <button
          className="focus:outline-none flex p-3 m-4 justify-center text-md w-72 rounded-md text-error-dark border-2 border-transparent lg:hover:border-error lg:hover:text-error font-bold"
          onClick={() => setConfirmModal(true)}
        >
          Delete my account
        </button>
        <button
          className="focus:outline-none flex p-3 m-4 mb-8 justify-center text-md w-72 rounded-md border-2 border-transparent text-blueInk bg-wildStrawberry lg:hover:bg-blueInk lg:hover:border-wildStrawberry lg:hover:text-wildStrawberry font-monument font-medium"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <div className="lg:mr-40 lg:mt-8">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col w-72 lg:w-96 rounded-md items-center p-3 bg-caribbeanGreen">
            <h2 className="font-bold text-wildStrawberry text-lg">
              Profile informations
            </h2>
          </div>
          <h2 className="font-bold text-caribbeanGreen text-xl m-2 p-4">
            Bob Sponge
          </h2>

          <div className="flex flex-col w-72 lg:w-96 items-center">
            <TextInput
              label="Email"
              noHelper
              fieldId="email"
              customStyles="lg:w-full mb-4"
              disabled
              placeholder={email || 'bobsponge@underthesea.bloop'}
              inputCustomStyles="bg-transparent border-b-2 border-wildStrawberry-light rounded-b-none text-wildStrawberry cursor-not-allowed"
            ></TextInput>
            <TextInput
              label="Phone number"
              edit
              handleEdit={() => togglePhoneEdit()}
              saveEdition={() => save('phone')}
              disabled={!phoneInEdition}
              mode="tel"
              initialValue={phone || '0289201289281'}
              fieldId="phone"
              customStyles="lg:w-full mb-4"
              inputCustomStyles={`bg-transparent border-b-2 rounded-b-none focus:border-caribbeanGreen focus:ring-2 focus:ring-caribbeanGreen focus:outline-none ${
                phoneInEdition
                  ? 'text-wildStrawberry border-wildStrawberry lg:hover:border-caribbeanGreen cursor-pointer'
                  : 'text-wildStrawberry-light border-wildStrawberry-light cursor-default'
              }  `}
            ></TextInput>
            <DateInput
              label="Birthday"
              edit
              handleEdit={() => toggleBirthdayEdit()}
              saveEdition={() => save('birthday')}
              initialValue={birthday || undefined}
              disabled={!birthdayInEdition}
              fieldId="birthday"
              customStyles="lg:w-full mb-8"
              inputCustomStyles={`bg-transparent border-b-2 rounded-b-none focus:outline-none ${
                birthdayInEdition
                  ? 'text-wildStrawberry border-wildStrawberry lg:hover:border-caribbeanGreen cursor-pointer'
                  : 'text-wildStrawberry-light border-wildStrawberry-light cursor-default'
              } `}
            ></DateInput>
          </div>
        </div>
      </div>
    </Layout>
  );
}
