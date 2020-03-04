import * as mongoose from "mongoose";

export const negotiationSchema = new mongoose.Schema({
	data: { type: Date, required: true},
	quantidade: { type: Number, required: true},
	valor: { type: Number, required: true},
	description: { type: String, required: false}
});

export interface Negotiation extends mongoose.Document {
	data: Date,
	quantidade: number,
	valor: number,
	description: string
}