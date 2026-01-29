import { ChannelCredentials } from '@grpc/grpc-js'
import { StockPriceClient } from './proto/stock_market_grpc_pb'
import { StockRequest } from './proto/stock_market_pb'

const client = new StockPriceClient('0.0.0.0:8080', ChannelCredentials.createInsecure())

client.getStockPrice(new StockRequest().setSymbol('AAPL'), (err, response) => {
  if (err) return console.log(err)
  console.log(response.toObject())
})