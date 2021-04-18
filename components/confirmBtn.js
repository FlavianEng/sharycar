import React, { useEffect, useState } from 'react';

// btnWitdh match with unity like rem, px, etc...
export default function ConfirmBtn({
  startLabel,
  holdLabel,
  endLabel,
  btnWidth,
  handleSuccess,
}) {
  const [btnState, setBtnState] = useState('start');
  const [btnStyle, setBtnStyle] = useState('');
  const [progressWidth, setProgressWidth] = useState(0);
  const [label, setLabel] = useState(startLabel);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    switch (btnState) {
      case 'holding':
        setLabel(holdLabel);
        setBtnStyle('bg-blueInk text-caribbeanGreen-dark');
        break;

      case 'end':
        // TODO: Display a loading like sign in button while server is answering
        setLabel(endLabel);
        setBtnStyle('bg-caribbeanGreen text-blueInk');
        break;

      default:
        setBtnStyle(
          'bg-blueInk text-caribbeanGreen lg:hover:bg-caribbeanGreen lg:hover:text-blueInk duration-200'
        );
        break;
    }
  }, [btnState]);

  let counter = 0;

  // Holding in milliseconds
  const pressHoldDuration = 150;
  const baseWidth = btnWidth / pressHoldDuration;

  const timer = () => {
    if (counter < pressHoldDuration) {
      setTimerId(requestAnimationFrame(timer));
      counter++;

      setProgressWidth(`${baseWidth * counter}rem`);
    } else {
      // Timer ended
      setBtnState('end');

      handleSuccess();
    }
  };

  const pressionDown = () => {
    if (btnState !== 'end') {
      requestAnimationFrame(timer);
      setBtnState('holding');
    }
  };

  const pressionUp = (evt) => {
    evt.preventDefault();
    cancelAnimationFrame(timerId);
    counter = 0;

    // Reset style if timer released before end
    if (btnState !== 'end') {
      setBtnState('start');
      setLabel(startLabel);
    }
  };

  return (
    <>
      {/* Dashed line */}
      <span className="border-b-2 border-blueInk border-dashed w-64">
        {' '}
      </span>
      <div
        onMouseDown={pressionDown}
        onMouseUp={pressionUp}
        onTouchStart={pressionDown}
        onTouchEnd={pressionUp}
        onTouchCancel={pressionUp}
        className={`relative flex items-center w-full font-bold rounded-md h-10 text-2xl focus:outline-none select-none cursor-pointer ${btnStyle}`}
      >
        <span
          id="progress"
          className={`${
            btnState !== 'holding' ? 'hidden' : 'block'
          } absolute h-10 rounded-md bg-caribbeanGreen select-none`}
          style={{ width: progressWidth }}
        ></span>
        <p className="m-auto z-20 select-none">
          {label || 'Hold me tight'}
        </p>
      </div>
    </>
  );
}
