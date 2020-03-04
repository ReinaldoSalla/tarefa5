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
import { NegotiationsService } from "./negotiations.service";
import { negotiationsRoute } from "../properties";

@Controller(negotiationsRoute)
export class NegotiationsController {
	constructor(private readonly negotiationsService: NegotiationsService) {}

	@Post()
	async addProduct(
		@Body("date") negDate: Date,
		@Body("amount") negAmount: number,
		@Body("value") negValue: number,
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
		@Body("date") negDate: Date,
		@Body("amount") negAmount: number,
		@Body("value") negValue: number,
		@Body("description") negDescription: string
	) {
		await this.negotiationsService.updateNegotiation(negId, negDate, negAmount, negValue, negDescription)
	}

	@Delete(":id")
	async removeProduct(@Param("id") negotiationId: string) {
		await this.negotiationsService.deleteNegotiation(negotiationId);
		return null;
	}
}