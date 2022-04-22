
// Importing useRouter()
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import FocusGraph from "../../../components/FocusGraphWrapper";
import Header from '../../../components/Header';

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID
    const tokenID = router.query.tokenID

    const [data, setData] = useState([])

    const testAction = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}/token/${tokenID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json()
            console.log(result)
            setData(result)

            // setData(await response.json())
            // console.log(response.json())
            
            // const data = await response.json(data)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <p>collection = {collectionID}</p>
            <p>token = {tokenID}</p>
            token view
            <button onClick={testAction}>click me!</button>
            <FocusGraph data={data} />
        </>
    );
}

export default collection;