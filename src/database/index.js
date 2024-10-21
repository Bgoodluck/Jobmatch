const { default: mongoose } = require("mongoose")


const connectDB = async () =>{

    const connectionURL = process.env.MONGODB_URL;

    mongoose
    .connect(connectionURL)
    .then(() => console.log('ABG connection to mongoDB is successful'))
    .catch((error) => console.log(error))
}

export default connectDB;