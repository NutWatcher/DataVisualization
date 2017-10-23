///<reference path="../file.d.ts" />

import * as React from "react";
import * as ReactDOM from 'react-dom';
import Radar from  'react-d3-radar';

interface Props {
    info:any
    showMap:any
}
interface State {
    name: string,
    relationList: any[]
}
export default class AppCity extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: this.props.info.name,
            relationList: []
        }
    };
    showMap = () => {
        this.props.showMap();
    };
    render() {
        return (
            <div>
                <p style={{width: "100%",textAlign: "center"}}>
                    <span className="actionBackToMap" style={{fontSize: "15px"}} onClick={this.showMap} >{"<<返回"}</span>
                    <span style={{paddingRight: "100px", fontSize: "25px"}} > {this.state.name}</span>
                </p>
                <div style={{position: "absolute", top: "10px", left: "10px"}}>
                    <ul>
                        <li>加权值</li>
                        <li>频次</li>
                        <li>交易额</li>
                        <li>耦合度</li>
                    </ul>
                    <p>选择不同属性，呈现不同的柱状图</p>
                </div>
            </div>
        );
    }
}
