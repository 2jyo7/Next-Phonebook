import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

////////////////////////////////
// PhBook Schema Configuration

const phBookSchema = new mongoose.Schema(
  {
    PhNumber: {
      type: String, // Corrected the type to String
    },
    contactName: {
      type: String, // Corrected the type to String
    },
  },
  {
    timestamps: true, // Corrected option name to 'timestamps'
  }
);

// Prevent redefining the model if it already exists
export const PhBook =
  mongoose.models.PhBook || mongoose.model("PhBook", phBookSchema);
