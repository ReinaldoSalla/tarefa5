import {
	Controller,
	Post,
	Get,
	Put,
	Patch,
	Delete,
	Body,
	Param
} from "@nestjs/common";
import { 
  negotiationsRoute,
  thisWeekRoute,
  lastWeekRoute,
  beforeLastWeekRoute
} from "../properties";
import { NegotiationsService } from "./negotiations.service";

@Controller(negotiationsRoute)
export class NegotiationsController {
	constructor(private readonly negotiationsService: NegotiationsService) {}

	@Get(thisWeekRoute)
	async getCurrentNegotiations() {
		return await this.negotiationsService.getCurrentNegotiations();
	}

	@Get(lastWeekRoute)
	async getLastNegotiations() {
		return await this.negotiationsService.getLastNegotiations()
	}

	@Get(beforeLastWeekRoute)
	async getPreviousLastNegotiations() {
		return await this.negotiationsService.getBeforeLastNegotiations();
	}

	@Get() 
	async getSavedNegotiations() {
		return await this.negotiationsService.getSavedNegotiations();
	}

	@Post()
	/*
		The data received from the request has to be a string instead of a Date type. This is necessary because
	the user is going to type, for example, 30/01/2020, which is not a valid TypeScript Date type.
	However, the data entered by the user is converted from string to date in the provider, hence the
	date is saved as a proper Date type in the MongoDB.
	*/
	async postNegotiation(
		@Body("data") negDate: string,
		@Body("quantidade") negAmount: number,
		@Body("valor") negValue: number,
		@Body("description") negDesc: string
	) {
		return await this.negotiationsService.postNegotiation(negDate, negAmount, negValue, negDesc)
	}

	/*
	@Post()
	async addProduct(
		@Body("data") negDate: Date,
		@Body("quantidade") negAmount: number,
		@Body("valor") negValue: number,
		@Body("description") negDesc: string
	) {
		return await this.negotiationsService.postNegotiation(negDate, negAmount,	negValue, negDesc);
	}

	@Get()
	async getAllNegotiations() {
		return await this.negotiationsService.getNegotiations();
	}

	@Get(":id")
	getSingleNegotiation(@Param("id") negotiationId: string) {
		return this.negotiationsService.getNegotiation(negotiationId);
	}

	@Patch(":id")
	async updateProduct(
		@Param("id") negId: string,
		@Body("data") negDate: Date,
		@Body("quantidade") negAmount: number,
		@Body("valor") negValue: number,
		@Body("description") negDescription: string
	) {
		await this.negotiationsService.updateNegotiation(negId, negDate, negAmount, negValue, negDescription)
	}

	@Delete(":id")
	async removeProduct(@Param("id") negotiationId: string) {
		await this.negotiationsService.deleteNegotiation(negotiationId);
		return null;
	}
	*/
}