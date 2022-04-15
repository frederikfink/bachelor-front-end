// import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ForceGraph3D, { ForceGraph2D, ForceGraphMethods } from "react-force-graph";
import data from "../data/data5";
import NodeInfoBox from "./nodeInfoBox";


const FocusGraph = () => {

  const fgRef = useRef();
  const [clickHistory, setClickHistory] = useState([])
  const [clicked, setClicked] = useState([])

  return (
    <div>
      <NodeInfoBox
        clicked={clicked}
        clickHistory={clickHistory}
      />

      <ForceGraph2D className="fixed top-0"
        linkWidth={link => link.weight}
        linkColor={link => 'rgba(0,0,0,' + link.weight / 10 + ')'}
        nodeColor={node => '#cfcfcf'}
        nodeStr
        d3Force="charge"
        ref={fgRef}
        graphData={data}
        nodeLabel="id"
        linkLabel="id"
        nodeAutoColorBy="group"
        onNodeClick={(node) => {
          node.type = 'node'
          setClicked(node)
          setClickHistory(clickHistory => [...clickHistory, node]);
        }}
        onLinkClick={(link) => {
          link.type = 'link'
          setClicked(link)
          setClickHistory(clickHistory => [...clickHistory, link]);
        }}
      />
    </div>
  );
};

export default FocusGraph;
