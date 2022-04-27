import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Tooltip } from "./Tooltip";


const TmpTable = ({ tableTitle, collectionData, collectionID }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [collection, setCollection] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

    return (
        <>
            <div className="flex">
                <h1 className="text-xl font-semibold">{tableTitle}</h1>
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
                                    something something
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