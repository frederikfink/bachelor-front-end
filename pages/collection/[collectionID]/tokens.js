import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import Table from '../../../components/Table';

export default function Test() {

  const router = useRouter()

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
    <div className="container m-auto">

      <Table tableTitle={"All availabled collections"} collectionData={data} />

    </div>

  )

}