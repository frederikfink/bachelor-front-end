
// Importing useRouter()
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import NextBreadcrumbs from '../../../components/BreadCrumps';

import Header from '../../../components/Header'
import Table from '../../../components/Table';

const All = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/collection/all', {
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
  
    useEffect(() => {
      fetchData();
    }, []);

    // Initializing useRouter()
    const router = useRouter()

    return (
        <>
        <Header />
        <NextBreadcrumbs />
        <div className="container m-auto">
          <div className="flex content-between w-100">
            <p className="text-gray-700 dark:text-gray-400">NFT collections</p>
          </div>
          <Table tableTitle={"All availabled collections"} collectionData={data} />
        </div>
      </>
    );
}

export default All;