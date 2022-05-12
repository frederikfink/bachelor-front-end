import Link from 'next/link'
import AddCollectionButton from "./AddCollectionButton";
import { Tooltip } from './Tooltip';



const Table = ({ tableTitle, collectionData }) => {

    return (
        <>
            <div className="flex">
                <h1 className="text-xl font-semibold">{tableTitle}</h1>
                <div className="ml-auto mb-4">
                    <AddCollectionButton />
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
                                Cycles avg / std.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Block diff avg / std.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last updated
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {collectionData.map((elem, i) => (
                            <tr key={elem.contract_address} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {i + 1}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium flex items-center text-gray-900 dark:text-white whitespace-nowrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 text-blue-500 w-4 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <Link href={`/collection/${elem.contract_address}`}>
                                        <span className="cursor-pointer">
                                            {elem.name} <br />
                                            <span className="font-normal text-gray-700">{elem.contract_address}</span>
                                        </span>
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {elem.cycle_average == 0 ? (
                                        <span>-</span>
                                    ) : (
                                        <span className="truncate font-mono">{(elem.cycle_average).toFixed(4)} / {(elem.cycle_std).toFixed(4)} </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {elem.block_diff_average == 0 ? (
                                        <span>-</span>
                                    ) : (
                                        <span className="truncate font-mono">{elem.block_diff_average} / {elem.block_diff_std} </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="truncate">
                                        {elem.last_update}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Table;