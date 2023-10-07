
const mongoose =  require("mongoose");
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((data) => {
        console.log(`mongodb connected with server ${data.connection.host}`)
    })
}
module.exports = connectDatabase;