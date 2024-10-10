package main

/*
Importing needed packages
fmt -> used for formatting and printing
io -> used for input and output
golang.org/x/net/websocket -> used for websockets
net/http -> used for networking
sync -> used for synchronization of preventing race conditions
*/

import (
	"fmt"
	"io"
	"net/http"
	"sync"
	"golang.org/x/net/websocket"
)

// Server struct for mapping rooms
type Server struct {
	rooms map[string]*Room
	mutex sync.Mutex
}

// Room struct for handling connected clients and messages
type Room struct {
	conns    map[*websocket.Conn]bool
	messages []string
	mutex    sync.Mutex
}

// Function of creating new server mapping the rooms
func NewServer() *Server {
	return &Server{
		rooms: make(map[string]*Room),
	}
}

// Function for allowing user to join room of specified id
func (s *Server) joinRoom(ws *websocket.Conn, roomID string) {
	// Prevents race condition for shared connections
	s.mutex.Lock()
	defer s.mutex.Unlock()

	// Associate the connections and messages with rooms
	room, ok := s.rooms[roomID]
	// Handle error of no room by creating new room instance
	if !ok {
		room = &Room{
			conns:    make(map[*websocket.Conn]bool),
			messages: make([]string, 0),
		}
		s.rooms[roomID] = room
	}
	//assign websocket connection to room
	room.conns[ws] = true
}

// Delete the connection from the map when user leaves the room
func (s *Server) leaveRoom(ws *websocket.Conn, roomID string) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	if room, ok := s.rooms[roomID]; ok {
		delete(room.conns, ws)
	}
}

// Broadcast the message to all connected users in the room
func (s *Server) broadcastToRoom(roomID, message string) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	if room, ok := s.rooms[roomID]; ok {
		room.mutex.Lock()
		defer room.mutex.Unlock()

		// Broadcast the message for all existing connections in the room
		for conn := range room.conns {
			if err := websocket.Message.Send(conn, message); err != nil {
				fmt.Println("Error broadcasting message:", err)
			}
		}
	}
}

// Function for handling the websocket connections
func (s *Server) handleWS(ws *websocket.Conn) {
	var roomID string
	// Retrieve the socket and room ID from event
	if err := websocket.Message.Receive(ws, &roomID); err != nil {
		if err == io.EOF {
			//fmt.Println("Client disconnected before sending room ID")
			fmt.Println("Worky")
			return
		}
		fmt.Println("Error receiving room ID:", err)
		return
	}

	// Call the join room function of parameters of socket and room ID
	s.joinRoom(ws, roomID)
	fmt.Println("This guy joined: ", ws.RemoteAddr(), " room: ", roomID)
	defer s.leaveRoom(ws, roomID)

	for {
		var message string

		if err := websocket.Message.Receive(ws, &message); err != nil {
			if err == io.EOF {
				fmt.Println("Client disconnected from: ", roomID)
			} else {
				fmt.Println("Error receiving message:", err)
			}
			break
		}

		s.broadcastToRoom(roomID, message)
	}
}

func main() {
	fmt.Println("Server started")
	server := NewServer()
	// Handle all connections to this port using the handleWS function
	http.Handle("/", websocket.Handler(server.handleWS))
	// Listen for incoming connections on port :8080
	http.ListenAndServe(":8080", nil)
}
