
// Importing useRouter()
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import TmpTable from '../../../components/TmpTable';
import Header from '../../../components/Header'
import NextBreadcrumbs from '../../../components/BreadCrumps';

const All = () => {

  // Initializing useRouter()
  const router = useRouter()
  const collectionID = router.query.collectionID

  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);

  const fetchData = async () => {

    try {
      const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setData(await response.json(data));

    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {

    try {
      const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setStats(await response.json(data));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!collectionID) return;
    fetchData();
    fetchStats();
    return () => { };
  }, [collectionID]);

  return (
    <>
      <Header />
      <NextBreadcrumbs />
      <div className="container m-auto">
        <div className="flex gap-4 mt-4 justify-between w-100 mb-4 border rounded-lg p-4 dark:border-gray-600">
          <div>
            <p className="mb-0 dark:text-gray-400">Collection Age</p>
            <p className="font-bold">{stats !== null ? (
              <div className="flex gap-2">
                {stats.start_block}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {stats.latest_block}
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}</p>
          </div>

          <div>
            <p className="mb-0 dark:text-gray-400">Cycles average</p>
            <p className="font-bold">{stats.cycle_average !== undefined ? (stats.cycle_average).toFixed(3) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}</p>
          </div>

          <div>
            <p className="mb-0 dark:text-gray-400">Cycles Standard Deviation</p>
            {stats.cycle_std == undefined ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <p className="font-bold">{(stats.cycle_std).toFixed(3)}</p>
            )}
          </div>

          <div>
            <p className="mb-0 dark:text-gray-400">Block diff <span className="font-mono">AVG</span></p>
            {stats.block_diff_average == undefined ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <p className="font-bold">{(stats.block_diff_average).toFixed(1)}</p>
            )}
          </div>

          <div>
            <p className="mb-0 dark:text-gray-400">block Diff <span className="font-mono">STD</span></p>
            {stats.block_diff_std == undefined ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <p className="font-bold">{(stats.block_diff_std).toFixed(1)}</p>
            )}
          </div>
        </div>
        <TmpTable collectionStats={stats} tableTitle={collectionID} collectionData={data} collectionID={collectionID} />
      </div>
    </>
  );
}

export default All;