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
import  { ValidationPipe } from "@nestjs/common";
import { Negotiation } from "./negotiation.interface";
import { NegotiationsService } from "./negotiations.service";
import { NegotiationDto } from "./negotiation.dto";
import Calendar from "../utils/calendar"

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

	@Post()
	async postNegotiation(
		@Body() negotiationDto: NegotiationDto,
		@Body("data") date: string,
		@Body("quantidade") amount: number,
		@Body("valor") value: number,
	): Promise<Negotiation> {
		Calendar.validateBrDate(date);
		const convertedDate: Date = Calendar.convertFromBrToUs(date);
		return await this.negotiationsService.postNegotiation(convertedDate, amount, value);
	}

	@Patch(":id")
	async patchNegotiation(
		@Body() negotiationDto: NegotiationDto,
		@Param("id") id: string,
		@Body("data") date: string,
		@Body("quantidade") amount: number,
		@Body("valor") value: number,
	): Promise<null> {
		Calendar.validateBrDate(date);
		const convertedDate: Date = Calendar.convertFromBrToUs(date);
		await this.negotiationsService.patchNegotiation(id, convertedDate, amount, value);
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