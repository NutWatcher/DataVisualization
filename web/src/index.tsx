import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import data from "./data/demo1";
import dataGeoChina from "./data/geoChina";
import cityList from "./data/city";
ReactDOM.render(
    <App
        width={window.screen.availWidth}
        height={window.screen.availHeight}
        dataGeoChina={dataGeoChina}
        cityList={cityList.nodes}
        graph={data} />,
    document.getElementById('root')
);