import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/moviles');
        console.log('>>> DB is connected');

    } catch (error) {
        console.log('>>> Error connecting to DB');
        console.log(error);
    }
}

export { connectDB };
