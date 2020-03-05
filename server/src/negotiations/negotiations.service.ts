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

@Injectable()
export class NegotiationsService {
  constructor(
    @InjectModel("ThisWeek") private readonly currentNegotiationModel: Model<Negotiation>,
    @InjectModel("LastWeek") private readonly lastNegotiationModel: Model<Negotiation>,
    @InjectModel("BeforeLastWeek") private readonly BeforeLastNegotiationModel: Model<Negotiation>,
    @InjectModel("Saved") private readonly savedNegotiationModel: Model<Negotiation>
  ) {}

  public async getCurrentNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${routeApi}/${negotiationsRoute}/${thisWeekRoute}`);
    return await this.currentNegotiationModel.find();
  }

  public async getLastNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${routeApi}/${negotiationsRoute}/${lastWeekRoute}`);
    return await this.lastNegotiationModel.find();
  }

  public async getBeforeLastNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${routeApi}/${negotiationsRoute}/${beforeLastWeekRoute}`);
    return await this.BeforeLastNegotiationModel.find();
  }

  public async getOneSavedNegotiation(id: string): Promise<Negotiation> {
    console.log(`GET method for route ${routeApi}/${negotiationsRoute}/${id}`);
    return await this.fetchNegotiation(id);
  }

  public async getAllSavedNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${routeApi}/${negotiationsRoute}`);
    return await this.savedNegotiationModel.find();
  }

  public async postNegotiation(rawData: string, quantidade: number, valor: number, description: string): Promise<Negotiation> {
    console.log(`POST method for route ${routeApi}/${negotiationsRoute}`);
    const data: Date = Calendar.convertFromBrToUs(rawData);
    const newNegotiation = new this.savedNegotiationModel({data, quantidade, valor, description});
    return await newNegotiation.save();
  }

  public async updateNegotiation(id: string, rawData: string, quantidade: number, valor: number, description: string) {
    console.log(`PATCH method for route ${routeApi}/${negotiationsRoute}`);
    const updatedNegotiation = await this.fetchNegotiation(id);
    if(rawData) updatedNegotiation.rawData = Calendar.convertFromBrToUs(rawData);
    if(quantidade) updatedNegotiation.quantidade = quantidade;
    if(valor) updatedNegotiation.valor = valor;
    if(description) updatedNegotiation.description = description;
    updatedNegotiation.save();
  }

  public async deleteOneNegotiation(id) {
    console.log(`DELETE method for route ${routeApi}/${negotiationsRoute}/${id}`);
    const deletedNegotiation = await this.fetchNegotiation(id, true);
  }

  public async deleteAllNegotiations() {
    console.log(`DELETE method for route ${routeApi}/${negotiationsRoute}`);
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
