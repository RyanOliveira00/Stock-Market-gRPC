import { ChannelCredentials } from '@grpc/grpc-js'
import { StockPriceClient } from './proto/stock_market_grpc_pb'
import { StockRequest } from './proto/stock_market_pb'

const target = '0.0.0.0:8080'

const client = new StockPriceClient(target, ChannelCredentials.createInsecure())

function main() {
  client.getStockPrice(new StockRequest().setSymbol('PETRA4'), (err, response) => {
    if (err) return console.log(err)
      console.log("Response: ", response)
    console.log("Preço da ação: ", response.toObject())
  })
}

main()
