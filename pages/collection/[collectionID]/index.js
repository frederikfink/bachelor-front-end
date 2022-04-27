
// Importing useRouter()
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import TmpTable from '../../../components/TmpTable';

const All = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID

    console.log(collectionID);

    const [data, setData] = useState([]);

    const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://127.0.0.1:5000/collection/all', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
  
    //     setData(await response.json(data));
  
    //   } catch (error) {
    //     console.log(error);
    //   }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    return (
        <>
            alle tokens for collection listes her
            <TmpTable />
        </>
    );
}

export default All;