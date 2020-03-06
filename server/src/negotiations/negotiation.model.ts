import * as mongoose from "mongoose";
import { 
	IsNotEmpty,
	Min,
	Max,
	IsPositive
} from "class-validator";

export const negotiationSchema = new mongoose.Schema({
	data: { type: Date, required: false },
	quantidade: { type: Number, required: false },
	valor: { type: Number, required: false }
});

export interface Negotiation extends mongoose.Document {
	data: string,
	quantidade: number,
	valor: number,
}