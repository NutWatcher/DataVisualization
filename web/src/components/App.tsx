import * as React from 'react';
import * as d3 from 'd3';
import Map from "./map";
import Config from "../data/config";
import Cities from "./cities";
import LineRelations from "./lineRelation";
import AppCity from "./AppCity";
import '../styles/App.css';

interface Props {
    width: number;
    height: number;
    dataGeoChina:any;
    cityList:any;
    cityRelationList:any;
}
interface State {
    showCity:boolean,
    showCityInfo:any
}
export default class App extends React.Component<Props, State> {
    simulation: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            showCity:false,
            showCityInfo:{}
        }
    }

    componentDidMount() {
    }
    showCity = (city:any) => {
        this.setState({
            showCity:true,
            showCityInfo:city
        })
    };
    showMap = () => {
        this.setState({
            showCity:false,
            showCityInfo:{}
        })
    };
    render() {
        const { width, height, dataGeoChina, cityList, cityRelationList} = this.props;

        //判断显示地图还是进入城市层级
        if (this.state.showCity == false) {
            let projection = d3.geoMercator()
                .center([107, 31])
                .scale(Config.scale)
                .translate([Config.width/2, Config.height/2]);
            //关系链上插入坐标
            for (let i = 0 ; i < cityRelationList.length ; i ++){
                cityRelationList[i].startCoordinate = {x: 0, y: 0};
                cityRelationList[i].endCoordinate = {x: 0, y: 0};
                for (let j = 0 ; j < cityList.length ; j ++){
                    if (cityRelationList[i].startId == cityList[j].id){
                        cityRelationList[i].start = cityList[j].name;
                        let tempCoordinate = projection([cityList[j].longitude, cityList[j].latitude]);
                        cityRelationList[i].startCoordinate = {
                            x: tempCoordinate[0],
                            y: tempCoordinate[1]
                        }
                    }
                    else if (cityRelationList[i].endId == cityList[j].id){
                        cityRelationList[i].end = cityList[j].name;
                        let tempCoordinate = projection([cityList[j].longitude, cityList[j].latitude]);
                        cityRelationList[i].endCoordinate = {
                            x: tempCoordinate[0],
                            y: tempCoordinate[1]
                        }
                    }
                }
            }
            return (
                <div>
                    <p style={{textAlign: "center", fontSize: "25px"}}>通过地理位置聚合后的信息图</p>
                    <div style={{position: "absolute", top: "10px", left: "10px"}}>
                        <ul>
                            <li>加权值</li>
                            <li>频次</li>
                            <li>交易额</li>
                            <li>耦合度</li>
                        </ul>
                        <p>选择不同属性，呈现不同的关系效果。例如关系线宽度发生变化</p>
                    </div>
                    <svg className="container"
                         width={width} height={height}>
                        <Map dataGeo={dataGeoChina}/>
                        <LineRelations relationList={cityRelationList}/>
                        <Cities cityList={cityList} changeCity={this.showCity}/>
                    </svg>
                </div>
            );
        }
        else {
            return (
                <div>
                    <AppCity width={960} height={500} info={this.state.showCityInfo} showMap={this.showMap} />
                </div>
            )
        }
    }
}