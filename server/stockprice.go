package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"math"
	"os"
	"time"

	"math/rand"
	pb "stock-market-server/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func RandomFloat64Between(min, max float64) float64 {
	value := min + rand.Float64()*(max-min)

	return math.Round(value*100) / 100
}

func savePrices(prices map[string]float64) error {
	file, err := os.OpenFile("prices.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	log.Printf("Salvando %d preços no arquivo: %s", len(prices), file.Name())

	for symbol, price := range prices {
		if _, err := file.WriteString(fmt.Sprintf("%s: %.2f\n", symbol, price)); err != nil {
			return err
		}
	}

	return nil
}

func (s *Server) GetStockPrice(ctx context.Context, request *pb.StockRequest) (*pb.StockResponse, error) {

	value := RandomFloat64Between(50.0, 300.0)

	log.Printf("Consulta de preço de ação para %s: {R$ %.2f} \n", request.Symbol, value)

	return &pb.StockResponse{
		Symbol: request.Symbol,
		Price:  value,
		Time: &pb.StockResponse_Timestamp{
			Timestamp: time.Now().UnixMilli(),
		},
	}, nil
}

func (s *Server) GetStockPriceServerStreaming(request *pb.StockRequest, stream pb.StockPrice_GetStockPriceServerStreamingServer) error {
	ctx := stream.Context()

	max := 5
	interations := 0
	deadline, _ := ctx.Deadline()

	deadline = deadline.Add(-3 * time.Second)

	if deadline.Before(time.Now()) {
		return status.Error(codes.Canceled, "insufficient timeout")
	}

	for ctx.Done() == nil && interations < max && time.Now().Before(deadline) {
		value := RandomFloat64Between(50.0, 300.0)

		log.Printf("Enviando preço de ação para %s: {R$ %.2f} \n", request.Symbol, value)

		stream.Send(&pb.StockResponse{
			Symbol: request.Symbol,
			Price:  value,
			Time: &pb.StockResponse_Timestamp{
				Timestamp: time.Now().UnixMilli(),
			},
		})
		time.Sleep(time.Duration(rand.Intn(1000)+1000) * time.Millisecond) // 1s to 2s
		interations++
	}

	log.Printf("Cliente desconectado: %v \n", ctx.Err())

	return ctx.Err()
}

func (s *Server) UpdateStockPriceClientStreaming(stream pb.StockPrice_UpdateStockPriceClientStreamingServer) error {

	ctx := stream.Context()

	prices := make(map[string]float64)

	batchSize := 2

	count := 0

	for ctx.Err() == nil {
		stock, err := stream.Recv()

		if err == io.EOF {
			log.Printf("Cliente finalizou a conexão %v \n", ctx.Err())
			break
		}

		if err != nil {
			return err
		}

		log.Printf("Recebendo preço de ação para %s: {R$ %.2f} \n", stock.Symbol, stock.Price)
		prices[stock.Symbol] = stock.Price
		count++

		if count%batchSize == 0 {
			if err := savePrices(prices); err != nil {
				return err
			}
			prices = make(map[string]float64)
			count = 0
		}
	}

	if len(prices) > 0 {
		log.Println("Salvando dados restantes...")
		if err := savePrices(prices); err != nil {
			return err
		}
	}

	log.Println("Streaming finalizado com sucesso")
	return stream.SendAndClose(&pb.UpdateStockPriceResponse{
		Message: "Preços de ações atualizados",
	})
}

func (s *Server) GetStockPriceBidirectionalStreaming(stream pb.StockPrice_GetStockPriceBidirectionalStreamingServer) error {
	ctx := stream.Context()

	for ctx.Err() == nil {
		request, err := stream.Recv()

		if err == io.EOF {
			log.Printf("Cliente finalizou a conexão %v \n", ctx.Err())
			return nil
		}

		if err != nil {
			return err
		}

		price := RandomFloat64Between(50.0, 300.0)

		log.Printf("Consulta de preço de ação para %s: {R$ %.2f} \n", request.Symbol, price)
		stream.Send(
			&pb.StockResponse{
				Symbol: request.Symbol,
				Price:  price,
				Time: &pb.StockResponse_Timestamp{
					Timestamp: time.Now().UnixMilli(),
				},
			},
		)
	}

	log.Printf("Cliente desconectado: %v \n", ctx.Err())

	return ctx.Err()
}
