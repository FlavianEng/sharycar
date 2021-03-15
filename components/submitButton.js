import React from 'react';

export default function SubmitButton({ label, onClick }) {
  return (
    <button
      type="submit"
      onClick={
        onClick ||
        // eslint-disable-next-line no-alert
        window.alert(
          'Tu viens de cliquer sur un bouton ! \nOh la la !\nComme je suis fier de toi ! '
        )
      }
      className="flex place-content-center align-center p-2 cursor-pointer mt-4 bg-blueInk text-xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen"
    >
      {label || 'Give me a label'}
    </button>
  );
}
