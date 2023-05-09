const net = require('net');

const PORT = 5774;

const server = net.createServer((socket) => {
  console.log('Client connected');

  // handle incoming data from the biosensor
  socket.on('data', (data) => {
    console.log('Received data:', data.toString());
    socket.write('Received data successfully\n');
  });

  // handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// start the server and listen on the specified port
server.listen(PORT ,() => {
  console.log("Server up and running at 5774");
});
