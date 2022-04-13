// import dynamic from "next/dynamic";
import React, { useCallback, useRef } from "react";
import ForceGraph3D, { ForceGraph2D, ForceGraphMethods } from "react-force-graph";
import data from "../data/data";

// const _ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
// ssr: false
// });
/*
const ForwardGraph3D = forwardRef(
  (props: ForceGraphProps, ref: MutableRefObject<ForceGraphMethods>) => (
    <ForceGraph3D {...props} ref={ref} />
  )
);
*/
const FocusGraph = () => {
  const fgRef = useRef();

  const handleClick = useCallback(
    (node) => {
      console.log(node.id);
    },
    [fgRef]
  );

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeLabel="id"
      nodeAutoColorBy="group"
      linkDirectionalArrowLength={2}
      onNodeClick={handleClick}
    />
  );
};

export default FocusGraph;
