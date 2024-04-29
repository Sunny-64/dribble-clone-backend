const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 

const initiateServer = async (app) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected 🍀");
        app.listen(PORT, () => {
            console.log(`SERVER RUNNING AT PORT : ${PORT}`)
        }); 
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = initiateServer; 