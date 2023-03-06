import mongoose from "mongoose";

const PresentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    presentType: { type: String, required: true },
    price: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    person: { type: String, required: true },
    date: { type: Date, required: true },
});

const PresentModel = mongoose.model("Presents", PresentSchema);

export default PresentModel;