import React from 'react';
import { NavLink } from 'react-router';

const Home = () => {
  return (
    <div className="p-5 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 justify-center items-center text-black min-h-vh">
      <div className="rounded-2xl w-full md:w-2/3 flex flex-col gap-8 justify-center items-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          Welcome to One211 Technologies
        </h1>

        <p className="text-sm sm:text-base md:text-lg max-w-3xl">
          At One211 Technologies, we design secure, scalable, and high-performance database solutions that drive efficiency and innovation. Empower your business with seamless data management, optimized architecture, and future-ready technology.
        </p>
      </div>

      {/* Optional: Navigation buttons shown only on medium+ screens */}
      {/* <div className="hidden md:flex flex-col gap-4">
        <NavLink
          to="/pages/user/UserList"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          All Users
        </NavLink>
        <NavLink
          to="/pages/cluster/ClusterList"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          All Clusters
        </NavLink>
      </div> */}
    </div>
  );
};

export default Home;
