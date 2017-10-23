import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";
import FloatWrap from "./FloatWrap";
interface State {
    value: number;
    info:any;
    showRadar:boolean;
}
class Line extends React.Component<{ relation: d3Types.d3Relation }, State> {
    ref: SVGLineElement;
    constructor(props:any){
        super(props);
        this.state = {
            value:this.props.relation.value,
            info:this.props.relation.info,
            showRadar: false
        }
    };
    componentDidMount() {
        d3.select(this.ref).data([this.props.relation]);
    };

    /***
     * 鼠标移动到线上，显示雷达图
     * @param e
     */
    handleOnHover = (e:any) =>{
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
                label: this.props.relation.start + " -- " + this.props.relation.end,
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
    render() {
        return <line className="link" ref={(ref: SVGLineElement) => this.ref = ref}
                     onMouseEnter={this.handleOnHover.bind(this)}
                     onMouseLeave={this.handleOnLeave.bind(this)}

                     x1={this.props.relation.startCoordinate.x} y1={this.props.relation.startCoordinate.y}
                     x2={this.props.relation.endCoordinate.x} y2={this.props.relation.endCoordinate.y}
                     strokeWidth={Math.sqrt(this.props.relation.value*2)} >
            <title>{this.props.relation.start + " -- " + this.props.relation.end}</title>
        </line>;
    }
}

export default class LineRelations extends React.Component<{ relationList: d3Types.d3Relation[] }, {}> {
    render() {
        const links = this.props.relationList.map((relation: d3Types.d3Relation, index: number) => {
            return <Line key={index} relation={relation} />;
        });

        return (
            <g className="links">
                {links}
            </g>
        );
    }
}