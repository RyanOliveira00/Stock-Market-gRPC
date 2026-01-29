import { ChannelCredentials } from '@grpc/grpc-js'
import { StockPriceClient } from './proto/stock_market_grpc_pb'
import { StockRequest } from './proto/stock_market_pb'

const target = '0.0.0.0:8080'

const client = new StockPriceClient(target, ChannelCredentials.createInsecure())

function main() {
  const request = new StockRequest().setSymbol('PETRA4')

  let deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 8);


  client.getStockPrice(request, { deadline: deadline } as any, (err, response) => {
    if (err) return console.log(err)
    console.log("[Unary]Preço da ação: ", response.toObject())
  })

  const call = client.getStockPriceServerStreaming(request, {
    deadline: deadline,
  }
  )

  call.on('data', (response) => {
    console.log("[Server Streaming]Preço da ação: ", response.toObject())
  })
  call.on('error', (err) => {
    console.log("Error on server streaming: ", err)
  })
  call.on('status', (status) => {
    console.log("Status: ", status)
  })
  call.on('end', () => {
    console.log("End of stream")
  })
}

main()
