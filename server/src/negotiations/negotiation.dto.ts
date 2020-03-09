/*
The date received from the request has to be a string instead of a Date type. This is necessary because
the user is going to type, for example, 30/01/2020, which is not a valid TypeScript Date type.
However, the data is converted from string to date in the Calendar class (in the utils folder), hence the
date is saved as a proper Date type in the MongoDB.
*/

import { Min,	Max } from "class-validator";

export class NegotiationDto {
	data: string
	@Min(1) @Max(100) quantidade: number;
	@Min(1) @Max(100) valor: number;
}