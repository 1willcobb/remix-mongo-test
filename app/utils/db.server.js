import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI // || "mongodb://localhost:27017/socialdb"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

export default connectDB;
