import React, { useEffect, useRef, useState } from "react";

const ClusterList = () => {
  const [allClusters, setAllClusters] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClusters, setFilteredClusters] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("/dummyClusters.json")
      .then((res) => res.json())
      .then((data) => setAllClusters(data))
      .catch((err) => console.error("Error loading clusters:", err));
  }, []);

  useEffect(() => {
    const start = page * 100;
    const clustersInPage = allClusters.slice(start, start + 100);

    if (searchTerm.trim() === "") {
      setFilteredClusters(clustersInPage);
    } else {
      const term = searchTerm.toLowerCase();
      const result = clustersInPage.filter((cluster) => {
        return (
          cluster.name.toLowerCase().includes(term) ||
          cluster.cluster_id.toString().includes(term) ||
          cluster.org_id.toString().includes(term)
        );
      });
      setFilteredClusters(result);
    }
  }, [searchTerm, allClusters, page]);

  const handleNext = () => {
    if ((page + 1) * 100 < allClusters.length) {
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
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Cluster Details</h1>

        <div className="flex justify-between items-center mb-3 px-3 border-1 border-gray-600 rounded-4xl w-full max-w-3xs">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-60 p-1"
          />
          {/* <img
            src="/src/assets/images/file-search.svg"
            className="w-7"
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
              <th className="p-1 sm:p-2 border-x ">Cluster ID</th>
              <th className="p-1 sm:p-2 border-x">Org ID</th>
              <th className="p-1 sm:p-2 border-x">Name</th>
              <th className="p-1 sm:p-2 border-x">Description</th>
              <th className="p-1 sm:p-2 border-x">Active</th>
              <th className="p-1 sm:p-2 border-x">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredClusters.map((cluster) => (
              <tr
                key={cluster.cluster_id}
                className="hover:bg-gray-100">
                <td className="p-1 sm:p-2 w-25 text-center border font-semibold ">
                  {cluster.cluster_id}
                </td>
                <td className="p-1 sm:p-2 w-20 text-center border">{cluster.org_id}</td>
                <td className="p-1 sm:p-2 border text-center">{cluster.name}</td>
                <td className="p-1 sm:p-2 border text-center">{cluster.description}</td>
                <td className="p-1 sm:p-2 w-15 text-center border">
                  {cluster.active ? "Yes" : "No"}
                </td>
                <td className="p-1 sm:p-2 border text-center">{cluster.creation_time}</td>
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
          disabled={(page + 1) * 100 >= allClusters.length}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 sm:py-2 rounded disabled:opacity-50 cursor-pointer transition ease-in-out duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default ClusterList;
