package main

import (
	"context"
	"log"
	"math"
	"time"

	"math/rand"
	pb "stock-market-server/proto"
)

func RandomFloat64Between(min, max float64) float64 {
	value := min + rand.Float64()*(max-min)

	return math.Round(value*100) / 100
}

func (s *Server) GetStockPrice(ctx context.Context, request *pb.StockRequest) (*pb.StockResponse, error) {

	value := RandomFloat64Between(50.0, 300.0)

	log.Printf("Consulta de preço de ação para %s: {R$ %.2f} \n", request.Symbol, value)

	return &pb.StockResponse{
		Symbol:    request.Symbol,
		Price:     value,
		Timestamp: time.Now().UnixMilli(),
	}, nil
}
