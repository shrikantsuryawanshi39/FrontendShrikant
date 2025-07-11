import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="p-5 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 justify-center items-center text-black h-screen">
      <div className="rounded-2xl w-full md:w-2/3 flex flex-col gap-8 justify-center items-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          {t('Home.title')}
        </h1>

        <p className="text-sm sm:text-base md:text-lg max-w-3xl">
          {t('Home.description')}
        </p>
      </div>
    </div>
  );
};

export default Home;
