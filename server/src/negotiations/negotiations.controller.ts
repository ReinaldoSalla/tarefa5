import {
	Controller,
	Post,
	Get,
	Put,
	Patch,
	Delete,
	Body,
	Param,
	UsePipes
} from "@nestjs/common";
import { 
  negotiationsRoute,
  thisWeekRoute,
  lastWeekRoute,
  beforeLastWeekRoute
} from "../properties";
import  { ValidationPipe } from "@nestjs/common";
import { Negotiation } from "./negotiation.model";
import { NegotiationsService } from "./negotiations.service";
import { Validator } from "class-validator";

@Controller(negotiationsRoute)
export class NegotiationsController {
	constructor(private readonly negotiationsService: NegotiationsService) {}

	@Get(thisWeekRoute)
	async getCurrentNegotiations(): Promise<Negotiation[]> {
		return await this.negotiationsService.getCurrentNegotiations();
	}

	@Get(lastWeekRoute)
	async getLastNegotiations(): Promise<Negotiation[]> {
		return await this.negotiationsService.getLastNegotiations()
	}

	@Get(beforeLastWeekRoute)
	async getPreviousLastNegotiations(): Promise<Negotiation[]> {
		return await this.negotiationsService.getBeforeLastNegotiations();
	}

	@Get(":id")
	async getOneSavedNegotiation(@Param("id") id: string): Promise<Negotiation> {
		return await this.negotiationsService.getOneSavedNegotiation(id);
	}

	@Get() 
	async getAllSavedNegotiations(): Promise<Negotiation[]> {
		return await this.negotiationsService.getAllSavedNegotiations();
	}

	/*
	The data received from the request has to be a string instead of a Date type. This is necessary because
	the user is going to type, for example, 30/01/2020, which is not a valid TypeScript Date type.
	However, the data is converted from string to date in the provider, hence the
	date is saved as a proper Date type in the MongoDB.
	*/
	@Post()
	async postNegotiation(
		@Body("data") date: string,
		@Body("quantidade") amount: number,
		@Body("valor") value: number,
	) {
		return await this.negotiationsService.postNegotiation(date, amount, value);
	}

	@Patch(":id")
	async patchNegotiation(
		@Param("id") negId: string,
		@Body("data") negDate: string,
		@Body("quantidade") negAmount: number,
		@Body("valor") negValue: number,
	): Promise<null> {
		await this.negotiationsService.patchNegotiation(negId, negDate, negAmount, negValue);
		return null;
	}

	@Delete(":id")
	async deleteOneNegotiation(@Param("id") id: string): Promise<null> {
		await this.negotiationsService.deleteOneNegotiation(id);
		return null;
	}

	@Delete()
	async deleteAllNegotiations(): Promise<null> {
		await	this.negotiationsService.deleteAllNegotiations();
		return null
	}
}