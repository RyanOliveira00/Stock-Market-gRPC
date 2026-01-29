import { ChannelCredentials } from '@grpc/grpc-js'
import { StockPriceClient } from './proto/stock_market_grpc_pb'
import { StockRequest, UpdateStockPriceRequest } from './proto/stock_market_pb'
import * as readline from 'readline'
import * as fs from 'fs'

const target = '0.0.0.0:8080'

const client = new StockPriceClient(target, ChannelCredentials.createInsecure())

function main() {
  // const request = new StockRequest().setSymbol('PETRA4')

  let deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 8);


  // client.getStockPrice(request, { deadline: deadline } as any, (err, response) => {
  //   if (err) return console.log(err)
  //   console.log("[Unary]Preço da ação: ", response.toObject())
  // })

  // const call = client.getStockPriceServerStreaming(request, {
  //   deadline: deadline,
  // }
  // )

  // call.on('data', (response) => {
  //   console.log("[Server Streaming]Preço da ação: ", response.toObject())
  // })
  // call.on('error', (err) => {
  //   console.log("Error on server streaming: ", err)
  // })
  // call.on('status', (status) => {
  //   console.log("Status: ", status)
  // })
  // call.on('end', () => {
  //   console.log("End of stream")
  // })

  const callUpdate = client.updateStockPriceClientStreaming({deadline: deadline}, (err, response) => {
    if (err) return console.log(err)

    console.log("[Client Streaming]Preço da ação: ", response.toObject()) 
  })

  const fileStream = fs.createReadStream('data/stockprices.txt')
  const rl = readline.createInterface({
    input: fileStream,
    output: process.stdout,
    terminal: false
  })

  rl.on('line', (line) => {
    const data = JSON.parse(line)
    callUpdate.write(new UpdateStockPriceRequest().setSymbol(data.symbol).setPrice(data.price))
  })
  rl.on('close', () => {
    callUpdate.end()
  })
}

main()
