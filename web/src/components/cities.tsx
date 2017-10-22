import * as React from "react";
import * as d3 from "d3";
import { d3Types, mapCityTypes } from "../types";

class Node extends React.Component<{ city: mapCityTypes.city}, {}> {
    ref: SVGCircleElement;

    componentDidMount() {
        let projection = d3.geoMercator()
            .center([107, 31])
            .scale(850)
            .translate([1400/2, 1000/2]);
        d3
            .select(this.ref)
            .data([this.props.city])
            .attr("transform", function (d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        });
    }

    render() {
        return (
            <circle className="node" r={this.props.city.value}
                    ref={(ref: SVGCircleElement) => this.ref = ref}>
                <title>{this.props.city.name}</title>
            </circle>
        );
    }
}

export default class Cities extends React.Component<{ cityList: mapCityTypes.city[] }, {}> {
    componentDidMount() {
    }

    render() {
        const color = d3.scaleOrdinal(d3.schemeCategory20);
        const nodes = this.props.cityList.map((city: mapCityTypes.city, index: number) => {
            return <Node key={index} city={city} />;
        });
        return (
            <g className="cities">
                {nodes}
            </g>
        );
    }
}