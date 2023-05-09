const net = require('net');
const winston = require('winston');

const PORT = 5772;

const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: 'app2.log',
        level: 'info'
      })
    ]
  });

const server = net.createServer((socket) => {
  console.log('Client connected');
  logger.info('client connected')
  // handle incoming data from the biosensor
  socket.on('data', (data) => {
    console.log('Received data:', data.toString());
    logger.info('Received data(string):', data.toString())
    logger.info('Received data(raw):', data)
    socket.write('Received data successfully\n');
  });

  // handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
    logger.info('client disconnected')
  });
});

// start the server and listen on the specified port
server.listen(PORT ,() => {
  console.log("Server up and running at 5772");
  logger.info("Server up and running at 5772")
});
