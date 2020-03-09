import {
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { 
  routeApi,
  negotiationsRoute,
  thisWeekRoute,
  lastWeekRoute,
  beforeLastWeekRoute
} from "../properties";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Negotiation } from "./negotiation.interface";
import Calendar from "../utils/calendar";
import { negotiationLogger } from "../logger";
import { NegotiationDto } from "./negotiation.dto"

@Injectable()
export class NegotiationsService {
  constructor(
    @InjectModel("ThisWeek") public readonly currentNegotiationModel: Model<Negotiation>,
    @InjectModel("LastWeek") public readonly lastNegotiationModel: Model<Negotiation>,
    @InjectModel("BeforeLastWeek") public readonly BeforeLastNegotiationModel: Model<Negotiation>,
    @InjectModel("Saved") public readonly savedNegotiationModel: Model<Negotiation>
  ) {}

  public async getCurrentNegotiations(): Promise<Negotiation[]> {
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${thisWeekRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.currentNegotiationModel.find();
  }

  public async getLastNegotiations(): Promise<Negotiation[]> {
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${lastWeekRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.lastNegotiationModel.find();
  }

  public async getBeforeLastNegotiations(): Promise<Negotiation[]> {
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${beforeLastWeekRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.BeforeLastNegotiationModel.find();
  }

  public async getOneSavedNegotiation(id: string): Promise<Negotiation> {
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${id}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.fetchNegotiation(id);
  }

  public async getAllSavedNegotiations(): Promise<Negotiation[]> {
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.savedNegotiationModel.find();
  }

  public async postNegotiation(data: Date, quantidade: number, valor: number): Promise<Negotiation> {
    const msg: string = `POST method for route ${routeApi}/${negotiationsRoute}`
    console.log(msg); negotiationLogger.info(msg); 
    const newNegotiation = new this.savedNegotiationModel({data, quantidade, valor});
    return await newNegotiation.save();
  }

  public async patchNegotiation(id: string, rawDate: string, quantidade: number, valor: number): Promise<void> {
    const msg: string = `PATCH method for route ${routeApi}/${negotiationsRoute}/${id}`;
    console.log(msg); negotiationLogger.info(msg); 
    const updatedNegotiation = await this.fetchNegotiation(id);
    if(rawDate) updatedNegotiation.data = Calendar.convertFromBrToUs(rawDate);
    if(quantidade) updatedNegotiation.quantidade = quantidade;
    if(valor) updatedNegotiation.valor = valor;
    updatedNegotiation.save();
  }

  public async deleteOneNegotiation(id): Promise<void> {
    const msg: string = `DELETE method for route ${routeApi}/${negotiationsRoute}/${id}`;
    console.log(msg); negotiationLogger.info(msg); 
    const deletedNegotiation = await this.fetchNegotiation(id, true);
  }

  public async deleteAllNegotiations(): Promise<void> {
    const msg: string = `DELETE method for route ${routeApi}/${negotiationsRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    await this.savedNegotiationModel.deleteMany({});
  }

  private async fetchNegotiation(id, fetchAndDelete=false) {
    let negotiation;
    try {
      negotiation = fetchAndDelete ? await this.savedNegotiationModel.deleteOne({_id: id}) : await this.savedNegotiationModel.findById(id)
    } catch(err) {
      throw new NotFoundException(`Id '${id}' is invalid`);
    }
    if(!negotiation || negotiation.n === 0)
      throw new NotFoundException(`Negotiation with id '${id}' does not exist in the database`);
    return negotiation;
  }
}
