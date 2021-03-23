import React from 'react';
import NextButton from '../components/NextButton';

const FirstVisit = () => {
  return (
    <div className="w-screen h-screen bg-registerBack">
      <div className="flex flex-col h-full justify-top items-center p-10 md:p-20">
        <h2 className="text-caribbeanGreen text-3xl md:text-6xl lg:text-7xl">
          Hey there !
        </h2>
        <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
          As we have just met, I need some additional information to
          save you time
        </p>
        <p className="text-caribbeanGreen-dark text-center mt-20 font-bold text-md">
          Don&apos;t worry I am not Google, I don&apos;t sell your
          data
        </p>
        <NextButton hasPrevious={false}></NextButton>
      </div>
    </div>
  );
};

export default FirstVisit;
