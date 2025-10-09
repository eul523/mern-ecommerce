import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    fileName: String
})

const Image = mongoose.model("Image", imageSchema);

export default Image;