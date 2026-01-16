import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function DotPlot({ data, options }) {
    const svgRef = useRef(null);
    const yLabel = options?.yLabel || '';

    useEffect(() => {
        if (!svgRef.current || !data) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 600;
        const height = 300;
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };

        // Scales
        const x = d3.scalePoint()
            .domain(data.map(d => d.label))
            .range([margin.left, width - margin.right])
            .padding(0.5);

        const y = d3.scaleLinear()
            .domain([0, 40]) // Fixed axis for consistency or max * 1.2
            .range([height - margin.bottom, margin.top]);

        // Grid lines (horizontal)
        svg.append("g")
            .selectAll("line")
            .data(y.ticks(5))
            .join("line")
            .attr("x1", margin.left)
            .attr("x2", width - margin.right)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))
            .attr("stroke", "#e2e8f0")
            .attr("stroke-dasharray", "4");

        // Axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .call(g => g.select(".domain").remove())
            .selectAll("text")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "#64748b");

        // Y Axis Label
        if (yLabel) {
            svg.append("text")
                .attr("x", margin.left)
                .attr("y", margin.top - 20)
                .attr("fill", "#64748b")
                .attr("font-size", "12px")
                .attr("font-weight", "bold")
                .text(yLabel);
        }

        // Line connecting dots
        const line = d3.line()
            .x(d => x(d.label))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#94a3b8")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Animate Line
        const length = path.node().getTotalLength();
        path.attr("stroke-dasharray", length + " " + length)
            .attr("stroke-dashoffset", length)
            .transition()
            .duration(1500)
            .ease(d3.easeCubicOut)
            .attr("stroke-dashoffset", 0);

        // Dots
        svg.selectAll(".dot")
            .data(data)
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.label))
            .attr("cy", d => y(d.value))
            .attr("r", 0)
            .attr("fill", d => d.highlight ? "#d90429" : "#1e293b")
            .transition().delay((d, i) => 500 + i * 200).duration(800).ease(d3.easeElastic)
            .attr("r", d => d.highlight ? 8 : 5);

        // Value Labels
        svg.selectAll(".param-label")
            .data(data)
            .join("text")
            .attr("x", d => x(d.label))
            .attr("y", d => y(d.value) - 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .attr("fill", d => d.highlight ? "#d90429" : "#1e293b")
            .attr("opacity", 0)
            .text(d => d.value + "%")
            .transition().delay((d, i) => 800 + i * 200).duration(500)
            .attr("opacity", 1);


    }, [data, yLabel]);

    return <svg ref={svgRef} viewBox="0 0 600 300" className="w-full h-full max-h-[50vh] mx-auto" />;
}
