import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";

import Graph from "../components/Graph"
import Header from '../components/Header'
import data from "../data/data.json"
import FocusGraph from "../components/FocusGraphWrapper";
import Table from '../components/Table';

export default function Home() {

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

  return (

    <div className="">
      <Header />
      <div className="container m-auto">
        <div className="h-24"></div>
        <div className="flex content-between w-100">
          <p className="text-gray-700 dark:text-gray-400">NFT collections</p>
        </div>
        <Table tableTitle={"All availabled collections"} collectionData={data} />
      </div>
    </div>

  )
}