import * as mongoose from "mongoose";

export const negotiationSchema = new mongoose.Schema({
	data: { type: Date, required: false },
	quantidade: { type: Number, required: false },
	valor: { type: Number, required: false }
});