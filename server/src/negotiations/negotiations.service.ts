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

  public async getSavedNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${routeApi}/${negotiationsRoute}`);
    return await this.savedNegotiationModel.find();
  }

  public async postNegotiation(tmpData: string, quantidade: number, valor: number, description: string): Promise<Negotiation> {
    console.log(`POST method for route ${routeApi}/${negotiationsRoute}`);
    const data: Date = Calendar.convertFromBrToUs(tmpData);
    const newNegotiation = new this.savedNegotiationModel({data, quantidade, valor, description});
    return await newNegotiation.save();
  }

  /*
  constructor(
    @InjectModel("Negotiation") private readonly negotiationModel: Model<Negotiation>
  ) {}

  public async postNegotiation(data: Date, quantidade: number, valor: number, description: string): Promise<Negotiation> {
    const newNegotiation = new this.negotiationModel({data, quantidade, valor, description});
    console.log(`POST method for route ${route}${negotiationsRoute}`);
    return await newNegotiation.save();
  }

  public async getNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${route}${negotiationsRoute}`);
    return await this.negotiationModel.find();
  }

  public async getNegotiation(negotiationId: string): Promise<Negotiation> {
    console.log(`GET method for route ${route}${negotiationsRoute}/${negotiationId}`);
    return await this.findNegotiation(negotiationId);
  }

  public async updateNegotiation(id: string, data: Date, quantidade: number, valor: number, description: string): Promise<void> {
    const updatedNegotiation = await this.findNegotiation(id);
    if(data) updatedNegotiation.data = data;
    if(quantidade) updatedNegotiation.quantidade = quantidade;
    if(valor) updatedNegotiation.valor = valor;
    if(description) updatedNegotiation.description = description;
    console.log(`PATCH method for route ${route}${negotiationsRoute}/${id}`);
    updatedNegotiation.save(); 
  }

  public async deleteNegotiation(negotiationId: string): Promise<void> {
    let result;
    try {
      result = await this.negotiationModel.deleteOne({_id: negotiationId});
    } catch(err) {
      throw new NotFoundException(`Invalid id: ${err}`);
    }
    if (result.n === 0)
      throw new NotFoundException(`Could not delete product with id ${negotiationId}`);
    console.log(`DELETE method for route ${route}${negotiationsRoute}/${negotiationId}`);
  }

  private async findNegotiation(id: string): Promise<Negotiation> {
    let negotiation;
    try {
      negotiation = await this.negotiationModel.findById(id)
    } catch(err) {
      throw new NotFoundException(`Invalid id: ${err}`);
    }
    if(!negotiation) 
      throw new NotFoundException(`Could not find negotiation with id ${id}`);
    return negotiation;
  }
  */
}
