import mongoose from "mongoose";


const RatingSchema = new mongoose.Schema({

      productId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
 
});




export default mongoose.model("Rating", RatingSchema);