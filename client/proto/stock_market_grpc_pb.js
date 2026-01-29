// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var stock_market_pb = require('./stock_market_pb.js');

function serialize_stock_market_StockRequest(arg) {
  if (!(arg instanceof stock_market_pb.StockRequest)) {
    throw new Error('Expected argument of type stock_market.StockRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stock_market_StockRequest(buffer_arg) {
  return stock_market_pb.StockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stock_market_StockResponse(arg) {
  if (!(arg instanceof stock_market_pb.StockResponse)) {
    throw new Error('Expected argument of type stock_market.StockResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stock_market_StockResponse(buffer_arg) {
  return stock_market_pb.StockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var StockPriceService = exports.StockPriceService = {
  getStockPrice: {
    path: '/stock_market.StockPrice/GetStockPrice',
    requestStream: false,
    responseStream: false,
    requestType: stock_market_pb.StockRequest,
    responseType: stock_market_pb.StockResponse,
    requestSerialize: serialize_stock_market_StockRequest,
    requestDeserialize: deserialize_stock_market_StockRequest,
    responseSerialize: serialize_stock_market_StockResponse,
    responseDeserialize: deserialize_stock_market_StockResponse,
  },
  getStockPriceServerStreaming: {
    path: '/stock_market.StockPrice/GetStockPriceServerStreaming',
    requestStream: false,
    responseStream: true,
    requestType: stock_market_pb.StockRequest,
    responseType: stock_market_pb.StockResponse,
    requestSerialize: serialize_stock_market_StockRequest,
    requestDeserialize: deserialize_stock_market_StockRequest,
    responseSerialize: serialize_stock_market_StockResponse,
    responseDeserialize: deserialize_stock_market_StockResponse,
  },
};

exports.StockPriceClient = grpc.makeGenericClientConstructor(StockPriceService, 'StockPrice');
