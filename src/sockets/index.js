const jwt = require('jsonwebtoken')

const initializeSocket = (io) => {
    io.on("connection", async (socket) => {
        try {
            const authToken = socket.handshake.auth.token || socket.handshake.headers.authorization;
            if(!authToken) throw new Error('Unauthorized', 401); 
            const token = authToken?.split(' ')[1]; 
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
           
            socket.join(decodedToken?.userId); 
            socket.emit('connected', decodedToken?.userId); 

            socket.on("disconnect", () => {
                console.log("User disconnected!!!");
            })
        }
        catch (err) {
            console.log(err);
        }
    })
}


const emitSocketEvent = (req, roomId, event, payload) => {
    try{
        const io = req.app.get('io'); 
        io.to(roomId).emit(event, payload); 
    }
    catch(err){
        console.log(err); 
        throw new Error("Internal server error", 500);
    }
}

module.exports = {
    initializeSocket,
    emitSocketEvent,
}; 