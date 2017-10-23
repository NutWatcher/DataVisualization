import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import dataGeoChina from "./data/geoChina";
import cityList from "./data/city";
import cityRelationList from "./data/cityRelations";
ReactDOM.render(
    <App
        width={window.screen.availWidth}
        height={window.screen.availHeight}
        dataGeoChina={dataGeoChina}
        cityList={cityList.nodes}
        cityRelationList={cityRelationList.edges}
        />,
    document.getElementById('root')
);