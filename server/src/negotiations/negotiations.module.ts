import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NegotiationsController } from "./negotiations.controller";
import { NegotiationsService } from "./negotiations.service";
import { negotiationSchema } from "./negotiation.schema";

@Module({
	imports: [
		//MongooseModule.forFeature([{ name: "Negotiation", schema: negotiationSchema }])
		MongooseModule.forFeature([
			{ name: "ThisWeek", schema: negotiationSchema }, 
			{ name: "LastWeek", schema: negotiationSchema },
			{ name: "BeforeLastWeek", schema: negotiationSchema},
			{ name: "Saved", schema: negotiationSchema } 
		])
	],
	controllers: [NegotiationsController],
	providers: [NegotiationsService]
})
export class NegotiationsModule {}