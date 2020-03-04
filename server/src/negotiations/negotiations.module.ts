import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NegotiationsController } from "./negotiations.controller";
import { NegotiationsService } from "./negotiations.service";
import { NegotiationSchema } from "./negotiation.model";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Negotiation", schema: NegotiationSchema }])
	],
	controllers: [NegotiationsController],
	providers: [NegotiationsService]
})
export class NegotiationsModule {}