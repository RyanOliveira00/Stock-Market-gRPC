// package: stock_market
// file: stock_market.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as stock_market_pb from "./stock_market_pb";

interface IStockPriceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getStockPrice: IStockPriceService_IGetStockPrice;
}

interface IStockPriceService_IGetStockPrice extends grpc.MethodDefinition<stock_market_pb.StockRequest, stock_market_pb.StockResponse> {
    path: "/stock_market.StockPrice/GetStockPrice";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<stock_market_pb.StockRequest>;
    requestDeserialize: grpc.deserialize<stock_market_pb.StockRequest>;
    responseSerialize: grpc.serialize<stock_market_pb.StockResponse>;
    responseDeserialize: grpc.deserialize<stock_market_pb.StockResponse>;
}

export const StockPriceService: IStockPriceService;

export interface IStockPriceServer extends grpc.UntypedServiceImplementation {
    getStockPrice: grpc.handleUnaryCall<stock_market_pb.StockRequest, stock_market_pb.StockResponse>;
}

export interface IStockPriceClient {
    getStockPrice(request: stock_market_pb.StockRequest, callback: (error: grpc.ServiceError | null, response: stock_market_pb.StockResponse) => void): grpc.ClientUnaryCall;
    getStockPrice(request: stock_market_pb.StockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_market_pb.StockResponse) => void): grpc.ClientUnaryCall;
    getStockPrice(request: stock_market_pb.StockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_market_pb.StockResponse) => void): grpc.ClientUnaryCall;
}

export class StockPriceClient extends grpc.Client implements IStockPriceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getStockPrice(request: stock_market_pb.StockRequest, callback: (error: grpc.ServiceError | null, response: stock_market_pb.StockResponse) => void): grpc.ClientUnaryCall;
    public getStockPrice(request: stock_market_pb.StockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_market_pb.StockResponse) => void): grpc.ClientUnaryCall;
    public getStockPrice(request: stock_market_pb.StockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_market_pb.StockResponse) => void): grpc.ClientUnaryCall;
}
