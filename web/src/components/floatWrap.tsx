///<reference path="../file.d.ts" />

/**
 * 浮动雷达图
 */

import * as React from "react";
import * as ReactDOM from 'react-dom';
import Radar from  'react-d3-radar';
export default class FloatWrap extends React.Component {
    static addRenderDomNode = (nodeName:string) => {
        if ($('#' + nodeName).length <= 0) {
            $('body').addClass('dialog-open').append('<div id="' + nodeName + '"></div>');
        }
    };
    static open = (x:number, y:number, info:any) =>{
        //雷达图信息初始化
        let param = {
            width:info.width || 500 ,
            height:info.height || 500,
            padding:info.padding || 70,
            domainMax:info.domainMax || 10,
            data:{
                variables:info.variables || [
                    {key: 'resilience', label: 'Resilience'},
                    {key: 'strength', label: 'Strength'},
                    {key: 'adaptability', label: 'Adaptability'},
                    {key: 'creativity', label: 'Creativity'},
                    {key: 'openness', label: 'Open to Change'},
                    {key: 'confidence', label: 'Confidence'}],
                sets: info.sets || [{
                    key: 'me',
                    label: 'My Scores',
                    values: {
                        resilience: 4,
                        strength: 6,
                        adaptability: 7,
                        creativity: 2,
                        openness: 8,
                        confidence: 1,
                    },
                },
                    {
                        key: 'everyone',
                        label: 'Everyone',
                        values: {
                            resilience: 10,
                            strength: 8,
                            adaptability: 6,
                            creativity: 4,
                            openness: 2,
                            confidence: 0,
                        },
                    }],
            }
        };
        let AlertPopView = (
            <Radar
                width={500}
                height={500}
                padding={70}
                domainMax={1000}
                highlighted={null}
                data={param.data}
            />
        );
        FloatWrap.addRenderDomNode('floatRadar');
        $('#floatRadar').css({
            'position':'absolute',
            'top':y,
            'left':x
        })
        ReactDOM.render(
            AlertPopView
            , document.getElementById('floatRadar')
            , () => {
            });
    };
    static close = () => {
        if ($('#floatRadar').length > 0) {
            $('#floatRadar').remove();
            if ($('.blackbg:visible').length == 0) {
                $('body').removeClass('dialog-open');
            }
        }
    };
}