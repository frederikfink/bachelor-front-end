import Link from 'next/link'
import AddCollectionButton from "./AddCollectionButton";
import { Tooltip } from './Tooltip';


const Table = ({ tableTitle, collectionData }) => {
    console.log(collectionData);

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

                            <tr key={elem.contract_address} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                    {elem.cycle_average == 0 ? (
                                        <span>-</span>
                                    ) : (
                                        <span className="truncate">{(elem.cycle_average).toFixed(4)} / {(elem.cycle_std).toFixed(4)} </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {elem.block_diff_average == 0 ? (
                                        <span>-</span>
                                    ) : (
                                        <span className="truncate">{(elem.block_diff_average / 13 / 60 / 60).toFixed(2)} / {(elem.block_diff_std / 13 / 60 / 60).toFixed(2)} </span>
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