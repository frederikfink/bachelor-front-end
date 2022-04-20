import React, { useState, useEffect } from "react";
import Link from 'next/link'


const Table = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setfetchData] = useState([]);
    const [collection, setCollection] = useState('');

    const fetchData = () => {
        fetch('http://127.0.0.1:5000/collection/all')
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                setfetchData(data);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsError(true);
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submitCollection = async () => {

        try {
            const response = await fetch('http://127.0.0.1:5000/collection/add', {
                method: 'POST',
                body: JSON.stringify({ collection }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json(data)

            console.log(data)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex">
                <p>All collections</p>
                <div className="ml-auto">
                    <input className="border" type="text" value={collection} onChange={(e) => setCollection(e.target.value)}></input>
                    <button className="border" onClick={submitCollection}>Add collection</button>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                no.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last updated
                            </th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <div>loading</div>
                    ) : (
                        <tbody>
                            {data.map((elem, i) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {i + 1}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        <Link href={`/collection/${elem.contract_address}`}>
                                            <span className="cursor-pointer">
                                                {elem.name} <br />
                                                <span className="font-normal text-gray-700">{elem.contract_address}</span>
                                            </span>
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {elem.last_update}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    )
};

export default Table;