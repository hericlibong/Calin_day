import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function SimpleBarChart({ data, options }) {
    const svgRef = useRef(null);
    const layout = options?.layout || 'vertical';
    const suffix = options?.suffix || '';

    useEffect(() => {
        if (!svgRef.current || !data) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 100, bottom: 40, left: 160 };

        // Scales
        let x, y;

        if (layout === 'horizontal') {
            x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value) * 1.2]) // +20% breathing room
                .range([margin.left, width - margin.right]);

            y = d3.scaleBand()
                .domain(data.map(d => d.label))
                .range([margin.top, height - margin.bottom])
                .padding(0.4);
        } else {
            // Vertical
            x = d3.scaleBand()
                .domain(data.map(d => d.label))
                .range([margin.left, width - margin.right])
                .padding(0.4);

            y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value) * 1.2])
                .range([height - margin.bottom, margin.top]);
        }

        // Bars
        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("fill", d => d.color || "#cbd5e1")
            .attr("rx", 4)
            // Initial state for animation
            .attr("x", d => layout === 'horizontal' ? x(0) : x(d.label))
            .attr("y", d => layout === 'horizontal' ? y(d.label) : y(0))
            .attr("width", d => layout === 'horizontal' ? 0 : x.bandwidth())
            .attr("height", d => layout === 'horizontal' ? y.bandwidth() : 0)
            // Transition
            .transition().duration(1000).ease(d3.easeCubicOut)
            .attr("x", d => layout === 'horizontal' ? margin.left : x(d.label))
            .attr("y", d => layout === 'horizontal' ? y(d.label) : y(d.value))
            .attr("width", d => layout === 'horizontal' ? x(d.value) - x(0) : x.bandwidth())
            .attr("height", d => layout === 'horizontal' ? y.bandwidth() : y(0) - y(d.value));

        // Labels (Values)
        svg.selectAll(".label")
            .data(data)
            .join("text")
            .attr("class", "label")
            .attr("fill", "#1e293b")
            .attr("font-family", "sans-serif")
            .attr("font-weight", "bold")
            .attr("font-size", "14px")
            .attr("opacity", 0)
            .attr("x", d => layout === 'horizontal' ? x(d.value) + 10 : x(d.label) + x.bandwidth() / 2)
            .attr("y", d => layout === 'horizontal' ? y(d.label) + y.bandwidth() / 2 + 5 : y(d.value) - 10)
            .attr("text-anchor", d => layout === 'horizontal' ? "start" : "middle")
            .text(d => `${d.value}${suffix}`)
            .transition().delay(800).duration(500)
            .attr("opacity", 1);

        // Axis Labels
        svg.selectAll(".axis-label")
            .data(data)
            .join("text")
            .attr("class", "axis-label")
            .attr("fill", "#1e293b")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("text-anchor", layout === 'horizontal' ? "end" : "middle")
            .attr("x", d => layout === 'horizontal' ? margin.left - 10 : x(d.label) + x.bandwidth() / 2)
            .attr("y", d => layout === 'horizontal' ? y(d.label) + y.bandwidth() / 2 + 5 : height - margin.bottom + 20)
            .text(d => d.label);

    }, [data, layout, suffix]);

    return <svg ref={svgRef} viewBox="0 0 600 400" className="w-full h-full max-h-[60vh] mx-auto" />;
}
