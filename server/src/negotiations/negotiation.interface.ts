import * as mongoose from "mongoose";

export interface Negotiation extends mongoose.Document {
	data: string,
	quantidade: number,
	valor: number,
}