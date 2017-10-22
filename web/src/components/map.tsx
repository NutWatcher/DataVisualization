import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";
export default class Map extends React.Component<{ dataGeo: any }, {}> {
    ref: SVGGElement;
    componentDidMount(){
        let projection = d3.geoMercator()
            .center([107, 31])
            .scale(850)
            .translate([1400/2, 1000/2]);
        let path = d3.geoPath ()
            .projection(projection);
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        d3.select(this.ref)
            .selectAll("path")
            .data( this.props.dataGeo.features )
            .enter()
            .append("path")
            .attr("stroke","#000")
            .attr("stroke-width",1)
            .attr("fill", function(d,i){
                //return color(i.toString());
                return "#ffffff";
            })
            .attr("d", path )   //使用地理路径生成器
            .on("mouseover",function(d,i){
                d3.select(this)
                    .attr("fill","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .attr("fill","#ffffff");
            });
    }
    render() {
        return (
            <g className="map" ref={(ref: SVGGElement) => this.ref = ref}>
            </g>
        );
    }
}