import mongoose from 'mongoose';
const MONGO_URL = "mongodb+srv://Siddhant:Siddhant@cluster0.s36geb7.mongodb.net/blog-website";

export async function connect() {
    try {
        mongoose.connect(MONGO_URL);
        const connection = mongoose.connection;

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });

        connection.once('open', () => {
            console.log('MongoDB connected successfully');
            // Additional setup or logic can go here
        });
    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}
