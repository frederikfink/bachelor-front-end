
// Importing useRouter()
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import FocusGraph from "../../../../components/FocusGraphWrapper";
import Header from '../../../../components/Header';
import NextBreadcrumbs from '../../../../components/BreadCrumps';

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
    const [stats, setStats] = useState(null);
    const [tokenStats, setTokenStats] = useState(null);
    const [collectionStats, setCollectionStats] = useState(null);

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const toggleDimensions = async () => {
        if (dimensions == 2) setDimensions(3);
        else setDimensions(2);
        setDimensionsToggled(!dimensionsToggled);
    }

    const resetAnimation = async () => {
        setData({ nodes: [], links: [] });
        setAnimationSpeed(50);
        setAnimationRunning(false);
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`https://api.opensea.io/api/v1/asset/${collectionID}/${tokenID}/?include_orders=false`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setOpenseaData(await response.json());

        } catch (error) {
            console.log(error);
        }

    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}/token/${tokenID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setStats(await response.json());

        } catch (error) {
            console.log(error);
        }
    }

    const fetchCollectionStats = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setCollectionStats(await response.json(data));

        } catch (error) {
            console.log(error);
        }
    }

    const fetchTokenStats = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/collection/${collectionID}/token/${tokenID}/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setTokenStats(await response.json());

        } catch (error) {
            console.log(error);
        }
    }

    const calcPercentageDiff = (b, a, lower_mark = 0, upper_mark = 0) => {
        // if(a == 0) return "";
        let diff = (100 * ((a - b) / b)).toFixed(1);
        if (diff < lower_mark) return <span className="text-red-500 flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>{diff} %</span>
        if (diff > upper_mark) return <span className="text-red-500 flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>{diff} %</span>
        return <span className="text-gray-500 flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>{diff} %</span>
        // return (100 * ((a-b)/b)).toFixed(1);
    }

    const startAnimation = async () => {
        setData({ nodes: [], links: [] });
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
                let color = 'text-red-500';
                let curvature = (Math.random() * (0.1 - 0.9) + 0.9).toFixed(2);


                setData(({ nodes, links }) => {

                    if (!(nodes.some(e => e.id === from))) {
                        nodes = [...nodes, { id: from }];
                        color = 'text-gray-500';
                        curvature = 0;
                    }

                    if (!(nodes.some(e => e.id === to))) {
                        nodes = [...nodes, { id: to }];
                        color = 'text-gray-500';
                        curvature = 0;
                    }

                    let prevBlock = [...links].at(-1) !== undefined ? [...links].at(-1).block : 0
                    let blockDiff = link.block - prevBlock

                    return {
                        nodes: nodes,
                        links: [...links, {
                            source: link.source,
                            target: link.target,
                            tx: link.tx,
                            block: link.block,
                            blockDiff: blockDiff,
                            color: color,
                            curvature: curvature
                        }]
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
        if (!collectionID) return;
        fetchData();
        fetchStats();
        fetchTokenStats();
        fetchCollectionStats();
    }, [collectionID, tokenID]);

    return (
        <>
            <Header />
            <NextBreadcrumbs />

            <div className="container m-auto">
                <div className="flex items-center">
                    {openseaData.image_url == undefined ? (
                        <div className="rounded-lg mr-4 bg-slate-200 dark:bg-slate-700 force-120-px animate-pulse" />
                    ) : (
                        <img src={openseaData.image_url} width="120px" height="120px" className="rounded-lg mr-4" />
                    )}
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
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Start animation
                            </>
                        )}
                    </button>
                    <div className="relative pt-1">
                        <label htmlFor="customRange1" className="form-label truncate">Animation speed | {(animationSpeed / 1000).toFixed(2)} s/t</label>
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

                    <div className="pt-1">
                        <label htmlFor="customRange1" className="form-label truncate">Toggle 3D</label>
                        <label htmlFor="toggle-example-checked" className="flex mb-4 items-center cursor-pointer relative">
                            <input onChange={e => toggleDimensions()} value={dimensionsToggled} type="checkbox" id="toggle-example-checked" className="sr-only" />
                            <div className="toggle-bg mt-1 bg-gray-200 border border-gray-400 h-2 w-8 rounded-full"></div>
                        </label>
                    </div>
                    <button onClick={resetAnimation} type="button" className="w-full inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:bg-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reset
                    </button>

                </div>
                <div className="flex 3">
                    <div className="border border-gray-800 flex-1 border-l rounded-l-lg overflow-auto force-500px-height px-4 py-2">
                        <div>
                            {data.links.map((item, i) => (
                                <div className={`${item.color} grid grid-cols-3 w-full`} key={item.tx + i}>
                                    <a className="flex truncate font-mono items-center" target={"_BLANK"} href={`https://etherscan.io/tx/${item.tx}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        {item.tx ? `${item.tx.substring(0, 5)}...${item.tx.substring(item.tx.length - 3)}` : ''}
                                    </a>
                                    {item.source.id !== undefined ? (
                                        <div className="flex">
                                            <a className="flex truncate font-mono items-center" target={"_BLANK"} href={`https://etherscan.io/address/${item.source.id}`}>
                                                {`0x${item.source.id.substring(0, 3)}...${item.source.id.substring(item.source.id.length - 3)}`}
                                            </a>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                            <a className="flex truncate font-mono items-center" target={"_BLANK"} href={`https://etherscan.io/address/${item.target.id}`}>
                                                {`0x${item.target.id.substring(0, 3)}...${item.target.id.substring(item.target.id.length - 3)}`}
                                            </a>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <p className="text-right">{item.blockDiff}</p>
                                </div>
                            ))}
                            <AlwaysScrollToBottom />
                        </div>
                    </div>
                    <FocusGraph data={data} dimensions={dimensions} />
                </div>
                <div className="flex gap-4 mt-4 justify-between w-100">
                    <div>
                        <p className="-mb-1">Transfers</p>
                        <p className="font-bold">{stats !== null ? stats.links.length : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        )}</p>
                    </div>

                    <div>
                        <p className="-mb-1">Unique addresses</p>
                        <p className="font-bold">{stats !== null ? [...new Map(stats.nodes.map(item => [item.id, item])).values()].length : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        )}</p>
                    </div>

                    <div>
                        <p className="-mb-1">Cycles</p>
                        {tokenStats == null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        ) : (
                            <p className="font-bold">
                                {tokenStats.cycle_count}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="-mb-1">Block Diff <span className="font-mono">AVG</span></p>
                        {tokenStats == null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        ) : (
                            <p className="font-bold">
                                {tokenStats.block_diff_average.toFixed(2)}
                                {collectionStats == null ? ("loading") : (calcPercentageDiff(collectionStats.block_diff_average, tokenStats.block_diff_average, -60, 100))}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="-mb-1">Block Diff <span className="font-mono">STD</span></p>
                        {tokenStats == null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        ) : (
                            <p className="font-bold">
                                {tokenStats.block_diff_std.toFixed(2)}
                                {collectionStats == null ? ("loading") : (calcPercentageDiff(collectionStats.block_diff_std, tokenStats.block_diff_std, -60, 100))}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default collection;