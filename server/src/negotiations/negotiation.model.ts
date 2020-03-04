import * as mongoose from "mongoose";

export const NegotiationSchema = new mongoose.Schema({
	date: { type: Date, required: true},
	amount: { type: Number, required: true},
	value: { type: Number, required: true},
	description: { type: String, required: false}
});

export interface Negotiation extends mongoose.Document {
	date: Date,
	amount: number,
	value: number,
	description: string
}