package main

import (
	"log"
	"net"

	pb "stock-market-server/proto"

	"google.golang.org/grpc"
)

type Server struct {
	pb.UnimplementedStockPriceServer
}

func main() {
	lis, err := net.Listen("tcp", "0.0.0.0:8080")

	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	log.Printf("Listening on port 8080")

	s := grpc.NewServer()

	pb.RegisterStockPriceServer(s, &Server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
