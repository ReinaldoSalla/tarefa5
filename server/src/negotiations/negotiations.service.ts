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
import { Negotiation } from "./negotiation.model";
import Calendar from "../utils/calendar";
import { negotiationLogger } from "../logger";

@Injectable()
export class NegotiationsService {
  constructor(
    @InjectModel("ThisWeek") private readonly currentNegotiationModel: Model<Negotiation>,
    @InjectModel("LastWeek") private readonly lastNegotiationModel: Model<Negotiation>,
    @InjectModel("BeforeLastWeek") private readonly BeforeLastNegotiationModel: Model<Negotiation>,
    @InjectModel("Saved") private readonly savedNegotiationModel: Model<Negotiation>
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

  public async postNegotiation(rawDate: string, quantidade: number, valor: number, description: string): Promise<Negotiation> {
    const msg: string = `POST method for route ${routeApi}/${negotiationsRoute}`
    console.log(msg); negotiationLogger.info(msg); 
    const data: Date = Calendar.convertFromBrToUs(rawDate);
    const newNegotiation = new this.savedNegotiationModel({data, quantidade, valor, description});
    return await newNegotiation.save();
  }

  public async updateNegotiation(id: string, rawDate: string, quantidade: number, valor: number, description: string) {
    const msg: string = `PATCH method for route ${routeApi}/${negotiationsRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    const updatedNegotiation = await this.fetchNegotiation(id);
    if(rawDate) updatedNegotiation.data = Calendar.convertFromBrToUs(rawDate);
    if(quantidade) updatedNegotiation.quantidade = quantidade;
    if(valor) updatedNegotiation.valor = valor;
    if(description) updatedNegotiation.description = description;
    updatedNegotiation.save();
  }

  public async deleteOneNegotiation(id) {
    const msg: string = `DELETE method for route ${routeApi}/${negotiationsRoute}/${id}`;
    console.log(msg); negotiationLogger.info(msg); 
    const deletedNegotiation = await this.fetchNegotiation(id, true);
  }

  public async deleteAllNegotiations() {
    const msg: string = `DELETE method for route ${routeApi}/${negotiationsRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.savedNegotiationModel.deleteMany({});
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
