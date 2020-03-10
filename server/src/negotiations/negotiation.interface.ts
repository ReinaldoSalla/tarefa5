import * as mongoose from "mongoose";

export interface Negotiation extends mongoose.Document {
	data: string | Date,
	quantidade: number,
	valor: number,
}