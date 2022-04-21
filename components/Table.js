import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Tooltip } from "./Tooltip";


const Table = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setfetchData] = useState([]);
    const [collection, setCollection] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

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

    const handleContractChange = async (value) => {
        setCollection(value);

        if (value.length === 42) setDisabled(false);
        else setDisabled(true);
    }

    return (
        <>
            {modalActive ? (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add collection</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Add a collection to the list of collections. paste in a valid contract address as shown below <span className="font-mono text-xs">0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D</span></p>
                                        </div>
                                        <input onChange={(e) => { handleContractChange(e.target.value) }} className="w-full mt-4 border-b focus:ring-0 outline-0 font-mono dark:bg-white dark:text-black text-sm" placeholder="contract address goes here..."></input>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {isDisabled ? (
                                    <Tooltip message={"A contract address must be exactly 42 characters long"}>
                                        <button data-tooltip-target="add-contract-tooltip" disabled={isDisabled} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">Submit</button>
                                    </Tooltip>
                                ) : (
                                    <button onClick={submitCollection} data-tooltip-target="add-contract-tooltip" disabled={isDisabled} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">Submit</button>
                                )}
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => {setModalActive(false); setDisabled(true); setCollection('')}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
                ('')}
            <div className="flex">
                <p>All collections</p>
                <div className="ml-auto mb-4">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModalActive(true)}>Add collection</button>
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
                                <tr  key={elem.contract_address} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                        <span className="truncate">
                                            {elem.last_update}
                                        </span>
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