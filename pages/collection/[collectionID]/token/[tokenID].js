
// Importing useRouter()
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import FocusGraph from "../../../../components/FocusGraphWrapper";
import Header from '../../../../components/Header';
import { link } from 'd3';
import { timeout } from 'd3';
import NextBreadcrumbs from '../../../../components/BreadCrumps';
import { utcFormat } from 'd3';

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID
    const tokenID = router.query.tokenID

    const [data, setData] = useState({ nodes: [], links: [] })
    const [animationRunning, setAnimationRunning] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(50)
    const [dimensions, setDimensions] = useState(2)
    const [dimensionsToggled, setDimensionsToggled] = useState(false)
    const [openseaData, setOpenseaData] = useState({});

    const getShortHash = (val, len, dir) => {
        if(dir == 'reverse') return val.substring(val.length - len)
        else return val.substring(0, len)
    }

    const toggleDimensions = async () => {
        if (dimensions == 2) setDimensions(3);
        else setDimensions(2);
        setDimensionsToggled(!dimensionsToggled);
    }

    const resetAnimation = async () => {
        console.log(data);
        setData({ nodes: [], links: [] });
        setAnimationSpeed(50);
        setAnimationRunning(false);
    }

    const fetchData = async () => {

        try {
            console.log(collectionID);
            const response = await fetch(`https://api.opensea.io/api/v1/asset/${collectionID}/${tokenID}/?include_orders=false`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // let result = await response.json();
            // setOpenseaData(JSON.parse(JSON.stringify(result)));

            setOpenseaData(await response.json());

            console.log(openseaData);

        } catch (error) {
            console.log(error);
        }

    };

    const startAnimation = async () => {
        resetAnimation()
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
                    clearInterval(id);
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
                        links: [...links, { source: link.source, target: link.target, tx: link.tx }]
                    };

                });

                return;

            }, animationSpeed);


        } catch (error) {
            console.log(error);
            setAnimationRunning(false);
        }

    }

    useEffect(() => {
        fetchData();
    }, [collectionID]);

    return (
        <>
            <Header />
            <NextBreadcrumbs />

            <div className="container m-auto">
                <div className="flex items-center">
                    <img src={openseaData.image_url} width="120px" height="120px" className="rounded-lg mr-4" />
                    <div>
                        <h1 className="text-xl font-semibold">{openseaData.name}</h1>
                        <p className="text-gray-700 dark:text-gray-400">{collectionID} | {tokenID}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-4 mb-4">
                    <button disabled={animationRunning} onClick={startAnimation} type="button" className="inline-flex items-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">
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
                    <div class="relative pt-1">
                        <label for="customRange1" class="form-label truncate">Animation speed | {(animationSpeed / 1000).toFixed(2)} s/s</label>
                        <input
                            onChange={e => setAnimationSpeed(e.target.value)}
                            type="range"
                            className="w-full h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
                            min="50"
                            max="1000"
                            step="50"
                            value={animationSpeed}
                        />
                    </div>

                    <div class="pt-1">
                        <label for="customRange1" class="form-label truncate">Toggle 3D</label>
                        <label for="toggle-example-checked" class="flex mb-4 items-center cursor-pointer relative">
                            <input onChange={e => toggleDimensions()} value={dimensionsToggled} type="checkbox" id="toggle-example-checked" class="sr-only" />
                            <div class="toggle-bg mt-1 bg-gray-200 border border-gray-400 h-2 w-8 rounded-full"></div>
                        </label>
                    </div>
                    <button onClick={resetAnimation} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">Reset</button>

                </div>
                <div className="flex 3">
                    <div className="border border-gray-800 flex-fill w-100 flex-1 border-l rounded-l-lg overflow-auto force-500px-height px-4 py-2">
                        {data.links.map((item) => (
                            <li className="text-gray-500 flex justify-between" key={item.tx}>
                                <a class="flex truncate font-mono items-center" target={"_BLANK"} href={`https://etherscan.io/tx/${item.tx}`}>
                                    tx
                                </a>
                                <a class="flex truncate font-mono items-center" target={"_BLANK"} href={`https://etherscan.io/tx/${item.tx}`}>
                                    {item.source.id ? `0x${item.source.id.substring(0, 3)}...${item.target.id.substring(item.source.id.length - 3)}` : ''}
                                </a>
                                <a class="flex truncate font-mono items-center" target={"_BLANK"} href={`https://etherscan.io/tx/${item.tx}`}>
                                    {item.target.id ? `0x${item.target.id.substring(0, 3)}...${item.target.id.substring(item.target.id.length - 3)}` : ''}
                                </a>
                            </li>
                        ))}
                    </div>
                    <FocusGraph data={data} dimensions={dimensions} />
                </div>
                <div className="flex gap-4 mt-4 justify-between w-100">
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