
// Importing useRouter()
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import TmpTable from '../../../components/TmpTable';
import Header from '../../../components/Header'

const All = () => {

  // Initializing useRouter()
  const router = useRouter()
  const collectionID = router.query.collectionID

  const [data, setData] = useState([]);

  const fetchData = async () => {

    try {
      const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setData(await response.json(data));

      console.log(data);


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!collectionID) return;
    fetchData();
  }, [collectionID]);

  return (
    <>
      <Header />
      <div className="container m-auto">
        <div className="h-24"></div>
        <div className="flex content-between w-100">
          <p className="text-gray-700 dark:text-gray-400">NFT collections</p>
        </div>
        <TmpTable tableTitle={`Collection: ${collectionID}`} collectionData={data} collectionID={collectionID}/>
      </div>
    </>
  );
}

export default All;