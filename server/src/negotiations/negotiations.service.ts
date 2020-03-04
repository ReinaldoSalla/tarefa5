import {
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Negotiation } from "./negotiation.model";
import { routeApi as route } from "../properties";
import { negotiationsRoute } from "../properties";

@Injectable()
export class NegotiationsService {
  constructor(
    @InjectModel("Negotiation") private readonly negotiationModel: Model<Negotiation>
  ) {}

  public async postNegotiation(date: Date, amount: number, value: number, description: string): Promise<Negotiation> {
    const newNegotiation = new this.negotiationModel({date, amount, value, description});
    console.log(`POST method for route ${route}${negotiationsRoute}`);
    return await newNegotiation.save();
  }

  public async getNegotiations(): Promise<Negotiation[]> {
    console.log(`GET method for route ${route}${negotiationsRoute}`);
    return await this.negotiationModel.find();
  }

  public async getNegotiation(negotiationId: string): Promise<Negotiation> {
    console.log(`POST method for route ${route}${negotiationsRoute}/${negotiationId}`);
    return await this.findNegotiation(negotiationId);
  }

  public async updateNegotiation(id: string, date: Date, amount: number, value: number, description: string): Promise<void> {
    const updatedNegotiation = await this.findNegotiation(id);
    if(date) updatedNegotiation.date = date;
    if(amount) updatedNegotiation.amount = amount;
    if(value) updatedNegotiation.value = value;
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
}
