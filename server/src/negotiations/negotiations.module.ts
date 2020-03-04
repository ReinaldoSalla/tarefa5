import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NegotiationsController } from "./negotiations.controller";
import { NegotiationsService } from "./negotiations.service";
import { negotiationSchema } from "./negotiation.model";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Negotiation", schema: negotiationSchema }])
	],
	controllers: [NegotiationsController],
	providers: [NegotiationsService]
})
export class NegotiationsModule {}