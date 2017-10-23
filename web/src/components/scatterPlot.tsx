import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";
import Config from "../data/config";


interface Props {
    width: number;
    height: number;
    data:any[]
}
export default class scatterPlot extends React.Component<Props , {}> {
    ref: SVGGElement;
    componentDidMount(){

        let svg:any = d3.select(this.ref);
        let margin = { top: 100, right: 100, bottom: 100, left: 100 };
        let width = svg.attr("width") - margin.left - margin.right;
        let height = svg.attr("height") - margin.top - margin.bottom;
        let color = d3.scaleOrdinal(d3.schemeCategory20);
        svg = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        //画坐标
        let xScale = d3.scaleLinear()
            .domain([0,1000])
            .range([0,width]);
        let yScale = d3.scaleLinear()
            .domain([0,1000])
            .range([height, 0]);
        let xAxis = d3.axisBottom(xScale)
            .tickSize(-height);
        let yAxis = d3.axisLeft(yScale)
            .tickSize(-width);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(0,0)")
            .attr("class", "y axis")
            .call(yAxis);


        let data:any[]= this.props.data;
        data.forEach(function(d) {
            d.y = +d["tradeRate"];
            d.x = +d["tradePerPrice"];
            d.r = +d["r"];
        });
        data.sort(function(a,b) { return b.r - a.r; });


        //画圆
        let radius = d3.scaleSqrt()
            .range([2,8]);
        var group = svg.selectAll("g.bubble")
            .data(data)
            .enter().append("g")
            .attr("class", "bubble")
            .attr("transform", function(d:any) {
                return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
            });

        group
            .append("circle")
            .attr("r", function(d:any) { return radius(d.r);  })
            .style("fill", function(d:any) {
                return color(d["team"]);
            });
        group
            .append("text")
            .attr("x", function(d:any) { return radius(d.r); })
            .attr("alignment-baseline", "middle")
            .text(function(d:any) {
                return d["father"] + " - " + d["child"];
            });

        svg.append("text")
            .attr("x", 6)
            .attr("y", -2)
            .attr("class", "label")
            .text("交易频次");

        svg.append("text")
            .attr("x", width-2)
            .attr("y", height-6)
            .attr("text-anchor", "end")
            .attr("class", "label")
            .text("平均交易额");

    }
    render() {
        return (
            <g className="scatterPlot" width={this.props.width} height={this.props.height}
               ref={(ref: SVGGElement) => this.ref = ref}>
            </g>
        );
    }
}