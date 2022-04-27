
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

  useEffect(() => {
    if (!collectionID) return;
    fetchData();
  }, [collectionID]);

  return (
    <>
      <Header />
      <NextBreadcrumbs />
      <div className="container m-auto">
        <TmpTable tableTitle={collectionID} collectionData={data} collectionID={collectionID}/>
      </div>
    </>
  );
}

export default All;