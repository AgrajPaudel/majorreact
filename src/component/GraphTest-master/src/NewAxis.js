import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Axis = () => {
  const ref = useRef();

  useEffect(() => {
    // Set up scales
    const xScale = d3.scaleLinear().domain([0, 100]).range([10, 290]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([290, 10]); // Adjust the range for the y-axis

    const svgElement = d3.select(ref.current);

    // Create and append the x-axis
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0, 300)")
      .call(xAxisGenerator);

    // Create and append the y-axis
    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement
      .append("g")
      .attr("transform", "translate(10, 0)")
      .call(yAxisGenerator);
  }, []);

  return <svg ref={ref} />;
};

export default Axis;
