import React, { useEffect, useState } from 'react';
import NextButton from '../components/nextButton';
import SwitchButton from '../components/switchButton';

const FirstVisit = () => {
  const [page, setPage] = useState(0);
  const hasPrevPage = page === 0 ? false : true;
  const initContent = (
    <>
      <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
        As we have just met, I need some additional information to
        save you time
      </p>
      <p className="text-caribbeanGreen-dark text-center mt-20 font-bold text-md">
        Don&apos;t worry I am not Google, I don&apos;t sell your data
      </p>
    </>
  );
  const [title, setTitle] = useState('Hey there');
  const [content, setContent] = useState(initContent);
  // Form values
  const [formValues, setFormValues] = useState({ role: '' });

  useEffect(() => {
    switch (page) {
      case 0:
        setTitle('Hey there !');
        setContent(initContent);
        break;
      case 1:
        setTitle('Before we start !');

        setContent(
          <>
            <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
              Are you an employee or the CEO ?
            </p>
            <div className="flex items-center justify-center mt-8 font-bold">
              <p className="text-caribbeanGreen pr-4">Employee</p>
              <SwitchButton></SwitchButton>
              <p className="text-wildStrawberry px-4">CEO</p>
            </div>
          </>
        );
        break;
      default:
        setTitle('Registration');
        setContent('Error');
      // TODO: Error page, go back to signIn
    }
  }, [page]);

  return (
    <div className="w-screen h-screen bg-registerBack">
      <div className="flex flex-col h-full justify-top items-center p-10 md:p-20">
        <h2 className="text-caribbeanGreen text-3xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {content}
        <pre>Page numéro {page}</pre>
        <pre>{formValues && formValues.role}</pre>
        <NextButton
          hasPrevious={hasPrevPage}
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => {
            setPage(page + 1);
            if (page === 1) {
              setFormValues({
                ...formValues,
                role: document.querySelector('#switchRole').checked
                  ? 'ceo'
                  : 'user',
              });
            }
          }}
        ></NextButton>
      </div>
    </div>
  );
};

export default FirstVisit;
