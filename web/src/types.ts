export namespace d3Types {
    export type d3Coordinate = {
        x:number,
        y:number
    };
    export type d3Relation = {
        startId:number,
        start: string,
        startCoordinate:d3Coordinate,
        end: string,
        endId:number,
        endCoordinate:d3Coordinate,
        value: number,
        info:any
    };
}
export namespace mapCityTypes {
    export type city = {
        id:number;
        name:string,
        longitude:number;
        latitude:number;
        value:number;
        info:any;
    };
}