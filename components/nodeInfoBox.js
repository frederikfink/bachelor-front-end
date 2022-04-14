import React, { useState, useEffect, useCallback, useRef } from "react";

const NodeInfoBox = ({ clickHistory }) => {

    const [clickedData, setClickedData] = useState(null);

    // remove first (dequeue) element if history is greater than 10
    if (clickHistory.length > 10) clickHistory.shift();

    // don't add element if element last element is the same as current element
    if (clickHistory.length > 1) {
        if (clickHistory[clickHistory.length - 2].item.id === clickHistory[clickHistory.length - 1].item.id) {
            clickHistory.pop();
        }
    }

    let url = 'https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc';

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch(url)
            .then(response => response.json())
            .then(data => setClickedData(data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    console.log(clickedData);


    return (
        <div className="hidden lg:block fixed z-20 inset-0 top-16 m-4 right-auto w-96 pb-10 px-8 overflow-y-auto backdrop-blur bg-white/30 dark:bg-black/30 border rounded ">
            <ul className="">
                {clickHistory.map((elem, i) => (
                    <li key={`${elem.item.id}-${i}`} >
                        {clickHistory.length - 1 === i ? (
                            <a
                                className="whitespace-nowrap text-xs font-mono text-orange-400 text-ellipsis overflow-hidden"
                                href={`https://etherscan.io/${elem.type == 'link' ? 'tx' : 'address'}/${elem.item.id}`}
                                target="_blank"
                            >{elem.type + " -> " + elem.item.id}</a>
                        ) : (
                            <a
                                className="whitespace-nowrap text-xs font-mono"
                                href={`https://etherscan.io/${elem.type == 'link' ? 'tx' : 'address'}/${elem.item.id}`}
                                target="_blank"
                            >{elem.type + " -> " + elem.item.id} </a>
                        )
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NodeInfoBox;