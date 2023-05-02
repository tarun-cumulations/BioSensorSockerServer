
const express = require('express');

var app = express();

const socketServer = require('http').createServer(app);
const io = require('socket.io')(socketServer);

//let io = require('socket.io')(socketServer);

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	if (req.originalUrl === '/webhook') {
		next();
	} else {
		bodyParser.json({ limit: '200mb' })(req, res, next);
	}

});


app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({ error: err.toString() });
});


socketServer.setTimeout(8 * 60 * 1000); // 10 * 60 seconds * 1000 msecs

socketServer.listen(7744, function () {
	console.log('Listening on port ' + socketServer.address().port);
});

io.use((socket, next) => {
	socket.request.headers['Access-Control-Allow-Origin'] = '*';
	next();
});

var nsp = io.of('/socket.io/');
socketServer.on('connection',(socket)=>{
    if(socket){
        console.log("Socket connected | ID : "+socket.id);
    }
})
nsp.on('connection', (socket) => {
    console.log("Socket connected | ID : "+socket.id);
})


module.exports = app;
