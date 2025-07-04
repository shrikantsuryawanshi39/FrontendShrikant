import React, { useEffect, useRef, useState } from "react";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("/dummyUsers.json")
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  useEffect(() => {
    const start = page * 100;
    const usersInPage = allUsers.slice(start, start + 100);

    if (searchTerm.trim() === "") {
      setFilteredUsers(usersInPage);
    } else {
      const term = searchTerm.toLowerCase();
      const result = usersInPage.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.type.toLowerCase().includes(term) ||
          user.user_id.toString().includes(term)
      );
      setFilteredUsers(result);
    }
  }, [searchTerm, allUsers, page]);

  const handleNext = () => {
    if ((page + 1) * 100 < allUsers.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [page]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">User Details</h1>

        <div className="flex justify-between items-center mb-3 px-3 border-1 border-gray-600 rounded-4xl w-full max-w-3xs">
          <input
            type="text"
            placeholder="Search by name, type or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-60 p-1"
          />
          {/* <img
            src="/src/assets/images/file-search.svg"
            className="w-4 sm:w-5"
            alt="Search"
          /> */}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-auto max-h-[462px] border border-l-0 shadow rounded-sm text-xs sm:text-sm">
        <table className="w-[150dvw] sm:w-[100dvw] md:w-full text-xs lg:text-sm">
          <thead className="bg-gray-300 sticky top-0">
            <tr>
              <th className="p-1 sm:p-2 border-x">User ID</th>
              <th className="p-1 sm:p-2 border-x">Name</th>
              <th className="p-1 sm:p-2 border-x">Email</th>
              <th className="p-1 sm:p-2 border-x">Type</th>
              <th className="p-1 sm:p-2 border-x w-60 sm:w-auto">Description</th>
              <th className="p-1 sm:p-2 border-x">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.user_id}
                className="hover:bg-gray-100">
                <td className="p-1 sm:p-2 text-center border font-semibold">
                  {user.user_id}
                </td>
                <td className="p-1 sm:p-2 border text-center">{user.name}</td>
                <td className="p-1 sm:p-2 border text-center">{user.email}</td>
                <td className="p-1 sm:p-2 text-center border capitalize">
                  {user.type}
                </td>
                <td className="p-1 sm:p-2 border text-center max-w-xl sm:w-auto">{user.description}</td>
                <td className="p-1 sm:p-2 border text-center w-22 lg:w-40">{user.creation_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 max-w-md mx-auto">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 sm:py-2 rounded disabled:opacity-50 cursor-pointer transition ease-in-out duration-300">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(page + 1) * 100 >= allUsers.length}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 sm:py-2 rounded disabled:opacity-50 cursor-pointer transition ease-in-out duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
