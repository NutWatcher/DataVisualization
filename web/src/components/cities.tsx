import * as React from "react";
import * as d3 from "d3";
import { d3Types, mapCityTypes } from "../types";
import Config from "../data/config";
import FloatWrap from "./FloatWrap";
interface State {
    value: number;
    info:any;
    showRadar:boolean;
}
class Node extends React.Component<{ changeCity:any, city: mapCityTypes.city , fillColor: any}, State> {
    ref: SVGCircleElement;
    constructor(props:any){
        super(props);
        this.state = {
            value:this.props.city.value,
            info:this.props.city.info,
            showRadar: false
        }
    };
    componentDidMount() {
        let color = this.props.fillColor;
        let projection = d3.geoMercator()
            .center([107, 31])
            .scale(850)
            .translate([Config.width/2, Config.height/2]);
        d3
            .select(this.ref)
            .data([this.props.city])
            .attr("fill", function(d:mapCityTypes.city,i:number){
                return color(d.value.toString());
            })
            .attr("transform", function (d) {
                return "translate(" + projection([d.longitude, d.latitude]) + ")";
            });
    }
    /***
     * 鼠标移动到线上，显示雷达图
     * @param e
     */
    handleOnEnter = (e:any) =>{
        let x=e.clientX;
        let y=e.clientY;
        console.log(this.state.value);
        FloatWrap.open(x + 50, y-200, {
            variables:[
                {key: 'rate', label: '频次'},
                {key: 'trade', label: '流水'},
                {key: 'totalMoney', label: '总量'},
                {key: 'attention ', label: '关注度'},
                {key: 'communicate', label: '通信频率'},
                {key: 'coupled', label: '耦合度'}],
            sets: [{
                key: 'relation',
                label: "城市雷达图",
                values: this.state.info
            }],
        });
        this.setState({showRadar:true});
    };
    handleOnLeave = () => {
        if (this.state.showRadar == true) {
            FloatWrap.close();
            this.setState({showRadar:false});
        }
    };
    /***
     * 鼠标点击城市节点后，显示城市数据
     * @param e
     */
    handleOnClick = () => {
        FloatWrap.close();
        this.props.changeCity(this.props.city);
    };
    render() {
        return (
            <circle className="nodeCity" r={this.props.city.value}
                    ref={(ref: SVGCircleElement) => this.ref = ref}
                    onMouseEnter={this.handleOnEnter.bind(this)}
                    onClick={this.handleOnClick.bind(this)}
                    onMouseLeave={this.handleOnLeave.bind(this)}
            >
                <title>{this.props.city.name}</title>
            </circle>
        );
    }
}

export default class Cities extends React.Component<{ cityList: mapCityTypes.city[], changeCity:any }, {}> {
    componentDidMount() {
    }

    render() {
        const color = d3.scaleOrdinal(d3.schemeCategory20);
        const nodes = this.props.cityList.map((city: mapCityTypes.city, index: number) => {
            return <Node key={index} city={city} fillColor={color} changeCity={ this.props.changeCity}/>;
        });
        return (
            <g className="cities">
                {nodes}
            </g>
        );
    }
}