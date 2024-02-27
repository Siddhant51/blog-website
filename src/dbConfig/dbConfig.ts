import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
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
