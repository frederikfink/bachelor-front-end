// import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ForceGraph, { ForceGraph2D, ForceGraph3D, ForceGraphMethods } from "react-force-graph";
import NodeInfoBox from "./nodeInfoBox";


const FocusGraph = (data) => {

  const fgRef = useRef();
  const [clickHistory, setClickHistory] = useState([])
  const [clicked, setClicked] = useState([])
  
  return (
    (data.data.length == 0) ? (
      <p>loading...</p>
    ) : (
      <div>
        <ForceGraph3D
          linkWidth={link => link.weight}
          linkColor={link => 'rgba(255,0,0,1)'}
          nodeColor={node => '#cfcfcf'}
          nodeStr
          d3Force="charge"
          ref={fgRef}
          graphData={data.data}
          nodeLabel="id"
          linkDirectionalArrowLength={6}
          linkLabel="id"
          width={700}
          height={500}
          cooldownTime={1000}
          nodeAutoColorBy="group"
          backgroundColor="white"
          onEngineStop={() => fgRef.current.zoomToFit(400)}
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
    )
  );
};

export default FocusGraph;
