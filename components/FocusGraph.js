// import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ForceGraph, { ForceGraph2D, ForceGraph3D, ForceGraphMethods } from "react-force-graph";
import NodeInfoBox from "./nodeInfoBox";
import { useTheme } from "next-themes";


const FocusGraph = (data, dimensions) => {

  const { theme } = useTheme();
  const fgRef = useRef();
  const [clickHistory, setClickHistory] = useState([])
  const [clicked, setClicked] = useState([])

  return (
    (data.data.length == 0) ? (
      <p>loading...</p>
    ) : (
      <div>
        {data.dimensions == 3 ? (
          <ForceGraph3D
            linkWidth={link => link.weight}
            linkColor={link =>'#3b82f6'}
            linkOpacity={1}
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
            backgroundColor={'rgba(0,0,0,0.0)'}
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
        ) : (
          <ForceGraph2D
            linkWidth={link => link.weight}
            linkColor={link => '#3b82f6'}
            nodeColor={node => '#cfcfcf'}
            nodeStr
            d3Force="charge"
            ref={fgRef}
            graphData={data.data}
            nodeLabel="id"
            linkDirectionalArrowLength={14}
            linkLabel="id"
            width={700}
            height={500}
            cooldownTime={1000}
            nodeAutoColorBy="group"
            backgroundColor={'rgba(0,0,0,0.0)'}
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
        )}

      </div>
    )
  );
};

export default FocusGraph;
