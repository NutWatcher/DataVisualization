export namespace d3Types {
    export type d3Node = {
        id: string,
        group: number
    };

    export type d3Link = {
        source: string,
        target: string,
        value: number
    };
    export type d3Coordinate = {
        x:number,
        y:number
    };
    export type d3Polygon  = {
        coordinates:d3Coordinate[],
        value: number  //strokeWidth
    };
    export type d3MultiPolygon   = {
        polygon:d3Polygon[]
    };

    export type d3Graph = {
        nodes: d3Node[],
        links: d3Link[]
    };
    export type d3Map = {
        paths: d3MultiPolygon[],
    };
}
export namespace mapChinaTypes {
    export type province = {
        properties:{
            id: string,
            name: string,
            cp:number[],
            childNum:number
        },
        geometry:{
            type:string,
            coordinates:number[][][][]
        }
    };
    export type china = {
        provinces: province[],
    };
}
export namespace mapCityTypes {
    export type city = {
        id:number;
        name:string,
        longitude:number;
        latitude:number;
        value:number;
    };
}