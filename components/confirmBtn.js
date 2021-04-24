import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

      case 'loading':
        setLabel('');
        setBtnStyle('bg-caribbeanGreen text-blueInk');
        break;

      case 'end':
        setLabel(endLabel);
        setBtnStyle('bg-caribbeanGreen text-blueInk');
        break;

      default:
        setLabel(startLabel);
        setBtnStyle(
          'bg-blueInk text-caribbeanGreen lg:hover:bg-caribbeanGreen lg:hover:text-blueInk duration-200'
        );
        break;
    }
  }, [btnState]);

  let counter = 0;

  // Holding in milliseconds
  const pressHoldDuration = 100;
  const baseWidth = btnWidth / pressHoldDuration;

  const timer = async () => {
    if (counter < pressHoldDuration) {
      setTimerId(requestAnimationFrame(timer));
      counter++;

      setProgressWidth(`${baseWidth * counter}rem`);
    } else {
      // Timer ended
      setBtnState('loading');

      const successful = await handleSuccess();

      if (successful) {
        setBtnState('end');

        setTimeout(() => setBtnState('start'), 5000);
      } else {
        setBtnState('start');
      }
    }
  };

  const pressionDown = () => {
    if (btnState !== 'end' && btnState !== 'loading') {
      requestAnimationFrame(timer);
      setBtnState('holding');
    }
  };

  const pressionUp = (evt) => {
    evt.preventDefault();
    cancelAnimationFrame(timerId);
    counter = 0;

    // Reset style if timer released before end
    if (btnState !== 'end' && btnState !== 'loading') {
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
        className={`relative flex items-center w-full font-bold rounded-md h-12 text-2xl focus:outline-none select-none cursor-pointer ${btnStyle}`}
      >
        <span
          id="progress"
          className={`${
            btnState !== 'holding' ? 'hidden' : 'block'
          } absolute h-12 rounded-md bg-caribbeanGreen select-none`}
          style={{ width: progressWidth }}
        ></span>

        {btnState === 'loading' && (
          <span className="m-auto animate-spin w-6 select-none">
            <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
          </span>
        )}

        {btnState !== 'loading' && (
          <p className="m-auto z-10 select-none">
            {label || 'Hold me tight'}
          </p>
        )}
      </div>
    </>
  );
}
