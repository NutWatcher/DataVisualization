import * as React from 'react';
import * as d3 from 'd3';
import { d3Types, mapChinaTypes, mapCityTypes } from "../types";
import Links from "./links";
import Nodes from "./nodes";
import Labels from "./labels";
import Map from "./map";
import Cities from "./cities";
import '../styles/App.css';

interface Props {
    width: number;
    height: number;
    graph: d3Types.d3Graph;
    dataGeoChina:any;
    cityList:any;
}

export default class App extends React.Component<Props, {}> {
    simulation: any;

    constructor(props: Props) {
        super(props);
        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d: d3Types.d3Node) {
                return d.id;
            }))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2))
            .nodes(this.props.graph.nodes);

        this.simulation.force("link").links(this.props.graph.links);
    }

    componentDidMount() {
        const node = d3.selectAll(".node");
        const link = d3.selectAll(".link");
        const label = d3.selectAll(".label");
        const map = d3.selectAll(".map");

        //this.simulation.nodes(this.props.graph.nodes).on("tick", ticked);

        function ticked() {
            link
                .attr("x1", function (d: any) {
                    return d.source.x;
                })
                .attr("y1", function (d: any) {
                    return d.source.y;
                })
                .attr("x2", function (d: any) {
                    return d.target.x;
                })
                .attr("y2", function (d: any) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d: any) {
                    return d.x;
                })
                .attr("cy", function (d: any) {
                    return d.y;
                });

            label
                .attr("x", function (d: any) {
                    return d.x + 5;
                })
                .attr("y", function (d: any) {
                    return d.y + 5;
                });
        }
    }

    render() {
        const { width, height, graph, dataGeoChina, cityList} = this.props;
        return (
            <svg className="container"
                 width={width} height={height}>
                <Map dataGeo={dataGeoChina}/>
                <Cities cityList={cityList}/>
                {/*<Links links={graph.links} />*/}
                {/*<Nodes nodes={graph.nodes} simulation={this.simulation} />*/}
                {/*<Labels nodes={graph.nodes} />*/}
            </svg>
        );
    }
}