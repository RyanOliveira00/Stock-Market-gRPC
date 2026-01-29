package main

import (
	"context"
	"log"
	"math"
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

	for ctx.Err() == nil && interations < max && time.Now().Before(deadline) {
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
