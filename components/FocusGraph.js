// import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";


const FocusGraph = (data, dimensions) => {

  const fgRef = useRef();

  const handleNodeHover = node => {
    console.log(node)
    // implement some highlighting features
  };

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
            linkDirectionalArrowLength={4}
            linkLabel="id"
            linkCurvature="curvature"
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
            linkCurvature="curvature"
            nodeStr
            d3Force="charge"
            ref={fgRef}
            graphData={data.data}
            onNodeHover={handleNodeHover}
            nodeLabel="id"
            linkDirectionalArrowLength={8}
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
