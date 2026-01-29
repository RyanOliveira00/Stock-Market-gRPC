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

function serialize_stock_market_UpdateStockPriceRequest(arg) {
  if (!(arg instanceof stock_market_pb.UpdateStockPriceRequest)) {
    throw new Error('Expected argument of type stock_market.UpdateStockPriceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stock_market_UpdateStockPriceRequest(buffer_arg) {
  return stock_market_pb.UpdateStockPriceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stock_market_UpdateStockPriceResponse(arg) {
  if (!(arg instanceof stock_market_pb.UpdateStockPriceResponse)) {
    throw new Error('Expected argument of type stock_market.UpdateStockPriceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stock_market_UpdateStockPriceResponse(buffer_arg) {
  return stock_market_pb.UpdateStockPriceResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  updateStockPriceClientStreaming: {
    path: '/stock_market.StockPrice/UpdateStockPriceClientStreaming',
    requestStream: true,
    responseStream: false,
    requestType: stock_market_pb.UpdateStockPriceRequest,
    responseType: stock_market_pb.UpdateStockPriceResponse,
    requestSerialize: serialize_stock_market_UpdateStockPriceRequest,
    requestDeserialize: deserialize_stock_market_UpdateStockPriceRequest,
    responseSerialize: serialize_stock_market_UpdateStockPriceResponse,
    responseDeserialize: deserialize_stock_market_UpdateStockPriceResponse,
  },
};

exports.StockPriceClient = grpc.makeGenericClientConstructor(StockPriceService, 'StockPrice');
