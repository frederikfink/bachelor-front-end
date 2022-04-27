
// Importing useRouter()
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import FocusGraph from "../../../../components/FocusGraphWrapper";
import Header from '../../../../components/Header';
import { link } from 'd3';
import { timeout } from 'd3';
import NextBreadcrumbs from '../../../../components/BreadCrumps';

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID
    const tokenID = router.query.tokenID

    const [data, setData] = useState({ nodes: [], links: [] })
    const [animationRunning, setAnimationRunning] = useState(false)

    const startAnimation = async () => {
        setAnimationRunning(true);

        try {
            const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}/token/${tokenID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json()

            result.links.sort((a, b) => (a.block < b.block) ? 1 : -1)


            const id = setInterval((interval) => {
                // Add a new connected node every second
                let link = result.links.pop();

                if (link == undefined) {
                    console.log("stop here");
                    setAnimationRunning(false);
                    return;
                }

                let from = link.source;
                let to = link.target;

                setData(({ nodes, links }) => {
                    if (!(nodes.some(e => e.id === from))) {
                        nodes = [...nodes, { id: from }];
                    }
                    if (!(nodes.some(e => e.id === to))) {
                        nodes = [...nodes, { id: to }];
                    }

                    return {
                        nodes: nodes,
                        links: [...links, { source: link.source, target: link.target }]
                    };


                });

                return;

            }, 50);


        } catch (error) {
            console.log(error);
            setAnimationRunning(false);

        }

    }

    return (
        <>
            <Header />
            <NextBreadcrumbs />
            <div className="container m-auto">
                <h1 className="text-xl mb-4 font-mono">{collectionID} | <span className="text-xl font-mono font-bold">{tokenID}</span></h1>

                <div className="flex justify-between items-center gap-4 mb-4">
                    <button onClick={startAnimation} type="button" className="w-full inline-flex items-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">
                        {animationRunning ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Running
                            </>
                        ) : (
                            <>Start animation</>
                        )}
                    </button>
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">Reset</button>
                </div>
                <div className="flex 3">
                    <div className="border border-gray-800 flex-fill w-100 flex-1 border-l rounded-l-lg overflow-auto px-4 py-2">
                        {data.nodes.map((item) => (
                            <li className="text-gray-500 flex justify-between" key={item.id}>
                                <a target={"_BLANK"} href={`https://etherscan.io/address/${item.id}`}>0x{item.id.substring(0, 3)}...{item.id.substring(item.id.length - 3)}</a>
                                <p>20-20-2022</p>
                            </li>
                        ))}
                    </div>
                    {/* <button className="border p-3 rounded border-yellow-500 " onClick={testAction}>click me!</button> */}
                    <FocusGraph data={data} />
                </div>
                <div className="flex gap-4 justify-between w-100">
                    <div>
                        <p className="-mb-1">Transfers</p>
                        <p className="font-bold">192</p>
                    </div>

                    <div>
                        <p className="-mb-1">Unique addresses</p>
                        <p className="font-bold">24</p>
                    </div>

                    <div>
                        <p className="-mb-1">Cycles</p>
                        <p className="font-bold">6</p>
                    </div>

                    <div>
                        <p className="-mb-1">avg blocks between transfers</p>
                        <p className="font-bold">2000</p>
                    </div>

                    <div>
                        <p className="-mb-1">Median blocks between transfers</p>
                        <p className="font-bold">1400</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default collection;