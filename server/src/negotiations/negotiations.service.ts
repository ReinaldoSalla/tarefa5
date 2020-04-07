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
import { negotiationLogger } from "../logger";
import { NegotiationDto } from "./negotiation.dto";
import DatabaseFiller from "./negotiation-utils/populate-database";

@Injectable()
export class NegotiationsService {
  private dbFiller = new DatabaseFiller();

  constructor(
    @InjectModel("ThisWeek") public readonly currentNegotiationModel: Model<Negotiation>,
    @InjectModel("LastWeek") public readonly lastNegotiationModel: Model<Negotiation>,
    @InjectModel("BeforeLastWeek") public readonly beforeLastNegotiationModel: Model<Negotiation>,
    @InjectModel("Saved") public readonly savedNegotiationModel: Model<Negotiation>
  ) {}

  private async testCreateCollection(negotiationModel: Model<Negotiation>): Promise<boolean> {
    let flagCreateDocument = false;
    await negotiationModel.countDocuments({}, (err: Error, numDocuments: number) => {
      if (!err && !numDocuments) flagCreateDocument = true
    });
    return flagCreateDocument;
  }
  
  public async getCurrentNegotiations(): Promise<Array<Negotiation>> {
    const flag: boolean = await this.testCreateCollection(this.currentNegotiationModel);
    if (flag) await this.dbFiller.createThisWeeksCollection(this.currentNegotiationModel, "thisWeek");
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${thisWeekRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.currentNegotiationModel.find();
  }

  public async getLastNegotiations(): Promise<Array<Negotiation>> {
    const flag: boolean = await this.testCreateCollection(this.lastNegotiationModel);
    if (flag) await this.dbFiller.createLastWeeksCollection(this.lastNegotiationModel, "lastWeek");
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${lastWeekRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.lastNegotiationModel.find();
  }

  public async getBeforeLastNegotiations(): Promise<Array<Negotiation>> {
    const flag: boolean = await this.testCreateCollection(this.beforeLastNegotiationModel);
    if (flag) await this.dbFiller.createLastWeeksCollection(this.beforeLastNegotiationModel, "beforeLastWeek");
    const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${beforeLastWeekRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    return await this.beforeLastNegotiationModel.find();
  }

  public async getOneSavedNegotiation(id: string): Promise<Negotiation> {
    const negotiation = await this.savedNegotiationModel.findById(id)
    if(negotiation) {
      const msg: string = `GET method for route ${routeApi}/${negotiationsRoute}/${id}`;
      negotiationLogger.info(msg); console.log(msg);
      return negotiation
    }
    else {
      const msg: string = `GET method for nonexistent id: ${id}`;
      negotiationLogger.error(msg); console.log(msg);
      throw new NotFoundException(`Negotiation with id '${id}' does not exist in the database`);
    }
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

  public async patchNegotiation(id: string, data: Date, quantidade: number, valor: number): Promise<void> {
    const negotiation = await this.savedNegotiationModel.findById(id)
    if(negotiation) {
      if(data) negotiation.data = data;
      if(quantidade) negotiation.quantidade = quantidade;
      if(valor) negotiation.valor = valor;
      const msg: string = `PATCH method for route ${routeApi}/${negotiationsRoute}/${id}`;
      console.log(msg); negotiationLogger.info(msg); 
      negotiation.save();
    } else {
      const msg: string = `PATCH method for nonexistent id: ${id}`;
      negotiationLogger.error(msg); console.log(msg);
      throw new NotFoundException(`Negotiation with id '${id}' does not exist in the database`);
    }
  }

  public async deleteOneNegotiation(id): Promise<void> {
    const negotiation = await this.savedNegotiationModel.deleteOne({_id: id});
    if(negotiation.n !== 0) {
      const msg: string = `DELETE method for route ${routeApi}/${negotiationsRoute}/${id}`;
      console.log(msg); negotiationLogger.info(msg); 
    } else {
      const msg: string = `DELETE method for nonexistent id: ${id}`;
      negotiationLogger.error(msg); console.log(msg);
      throw new NotFoundException(`Negotiation with id '${id}' does not exist in the database`);
    }
  }

  public async deleteAllNegotiations(): Promise<void> {
    const msg: string = `DELETE method for route ${routeApi}/${negotiationsRoute}`;
    console.log(msg); negotiationLogger.info(msg); 
    await this.savedNegotiationModel.deleteMany({});
  }
}