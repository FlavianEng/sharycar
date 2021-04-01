import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

export default function CodeGenerator() {
  const isAlreadyGenerated = () => {
    return sessionStorage.getItem('SHARYCARCOMPANYCODE')
      ? true
      : false;
  };

  const saveGenerateCodeToSessionStorage = (code) => {
    sessionStorage.setItem('SHARYCARCOMPANYCODE', code);
  };

  const restoreCompanyCode = () => {
    return sessionStorage.getItem('SHARYCARCOMPANYCODE');
  };

  const generateACode = (codeLength) => {
    // TODO: Check if the code generated isn't the same for another company
    if (isAlreadyGenerated()) {
      return restoreCompanyCode();
    }

    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < codeLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    saveGenerateCodeToSessionStorage(result);
    return result;
  };

  const companyCode = generateACode(6);

  const [copyState, setCopyState] = useState(false);

  const setClipboard = () => {
    navigator.clipboard.writeText(companyCode).then(() => {
      setCopyState(true);
      setTimeout(() => setCopyState(false), 5000);
    });
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center bg-caribbeanGreen rounded-lg p-6 pt-8 pb-5 m-2 cursor-pointer"
        onClick={setClipboard}
      >
        <h2
          id="codeDisplayer"
          className="text-wildStrawberry text-5xl md:text-9xl font-medium"
        >
          {companyCode}
        </h2>
        <div className="flex flex-row text-blueInk text-xs self-end justify-self-end mt-3 ">
          <span>
            {copyState ? (
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
            )}
          </span>
          <p className="font-bold ml-2">Click to copy</p>
        </div>
      </div>
    </>
  );
}
