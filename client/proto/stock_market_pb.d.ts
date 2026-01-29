// package: stock_market
// file: stock_market.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class StockRequest extends jspb.Message { 
    getSymbol(): string;
    setSymbol(value: string): StockRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StockRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StockRequest): StockRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StockRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StockRequest;
    static deserializeBinaryFromReader(message: StockRequest, reader: jspb.BinaryReader): StockRequest;
}

export namespace StockRequest {
    export type AsObject = {
        symbol: string,
    }
}

export class StockResponse extends jspb.Message { 
    getSymbol(): string;
    setSymbol(value: string): StockResponse;
    getPrice(): number;
    setPrice(value: number): StockResponse;
    getTimestamp(): number;
    setTimestamp(value: number): StockResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StockResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StockResponse): StockResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StockResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StockResponse;
    static deserializeBinaryFromReader(message: StockResponse, reader: jspb.BinaryReader): StockResponse;
}

export namespace StockResponse {
    export type AsObject = {
        symbol: string,
        price: number,
        timestamp: number,
    }
}
