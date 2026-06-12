import mongoose from "mongoose";

const tradeRequestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    trade: String,

    startDate: String,

    area: String,

    quoteType: String,

    hours: String
}, {
    timestamps: true
});

export default mongoose.model(
    "TradeRequest",
    tradeRequestSchema
);