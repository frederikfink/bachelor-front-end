import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip } from "./Tooltip";


const TmpTable = ({ tableTitle, collectionData, collectionID }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [collection, setCollection] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

    const [openseaData, setOpenseaData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                console.log(collectionID);
                const response = await fetch(`https://api.opensea.io/api/v1/asset_contract/${collectionID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // let result = await response.json();
                // setOpenseaData(JSON.parse(JSON.stringify(result)));

                setOpenseaData(await response.json());

            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        if (!collectionID) return;

        fetchData();
    }, [collectionID]);

    console.log(openseaData);
    
    return (
        <>
            <div className="flex mb-4">
                <div className="flex items-center">
                    <img src={openseaData.image_url} width="120px" height="120px" className="rounded-lg mr-4" />
                    <div>
                        <h1 className="text-xl font-semibold">{openseaData.name}</h1>
                        <p className="text-gray-700 dark:text-gray-400">{tableTitle}</p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Token id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transfers
                            </th>
                            <th scope="col" className="px-6 py-3">
                                avg. transfer speed
                            </th>
                            <th scope="col" className="px-6 py-3">
                                cycles
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {collectionData.map((elem) => (
                            <tr key={elem.token_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <Link href={`/collection/${collectionID}/token/${elem.token_id}`}>
                                        <span className="cursor-pointer">
                                            {elem.token_id}
                                        </span>
                                    </Link>
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {elem.count}
                                </th>
                                <td className="px-6 py-4">
                                    placeholder
                                </td>
                                <td className="px-6 py-4">
                                    placeholder
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default TmpTable;