const mongoose = require("mongoose");

async function dbConnect() {

    if (mongoose.connections[0].readyState) {
        return
    }

   await mongoose.connect(
        process.env.MONGODB_URI_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("Mongoose Is Connected");
        }
    );


}
export default dbConnect