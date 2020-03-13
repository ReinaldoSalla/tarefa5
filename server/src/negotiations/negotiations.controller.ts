import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseFilters,
  BadRequestException
} from "@nestjs/common";
import { 
  negotiationsRoute,
  thisWeekRoute,
  lastWeekRoute,
  beforeLastWeekRoute
} from "../properties";
import  { ValidationPipe } from "@nestjs/common";
import { Negotiation } from "./negotiation.interface";
import { NegotiationsService } from "./negotiations.service";
import { NegotiationDto } from "./negotiation.dto";
import Calendar from "../utils/calendar";
import { Validator } from "class-validator";
import HttpExceptionFilter from "../http-exception.filter"
import { negotiationLogger } from "../logger";

@Controller(negotiationsRoute)
export class NegotiationsController {
  private validator;
  constructor(private readonly negotiationsService: NegotiationsService) {
    this.validator = new Validator();
  }

  @Get(thisWeekRoute)
  @UseFilters(new HttpExceptionFilter())
  async getCurrentNegotiations(): Promise<Negotiation[]> {
    return await this.negotiationsService.getCurrentNegotiations();
  }

  @Get(lastWeekRoute)
  @UseFilters(new HttpExceptionFilter())
  async getLastNegotiations(): Promise<Negotiation[]> {
    return await this.negotiationsService.getLastNegotiations()
  }

  @Get(beforeLastWeekRoute)
  @UseFilters(new HttpExceptionFilter())
  async getPreviousLastNegotiations(): Promise<Negotiation[]> {
    return await this.negotiationsService.getBeforeLastNegotiations();
  }

  @Get(":id")
  async getOneSavedNegotiation(@Param("id") id: string): Promise<Negotiation> {
    if(this.validator.isMongoId(id)) 
      return await this.negotiationsService.getOneSavedNegotiation(id)
    else {
      const msg: string = `GET method with invalid id: ${id}`
      negotiationLogger.error(msg); console.log(`GET method with invalid id: ${id}`)
      throw new BadRequestException(`Id '${id}' is invalid`);
    }
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllSavedNegotiations(): Promise<Negotiation[]> {
    return await this.negotiationsService.getAllSavedNegotiations();
  }

  @Post()
  async postNegotiation(
    @Body() negotiationDto: NegotiationDto,
    @Body("data") date: string,
    @Body("quantidade") amount: number,
    @Body("valor") value: number,
  ): Promise<Negotiation> {
    Calendar.validateBrDate(date);
    const convertedDate: Date = Calendar.convertFromBrToUs(date);
    return await this.negotiationsService.postNegotiation(convertedDate, amount, value);
  }

  @Patch(":id")
  async patchNegotiation(
    @Body() negotiationDto: NegotiationDto,
    @Param("id") id: string,
    @Body("data") date: string,
    @Body("quantidade") amount: number,
    @Body("valor") value: number,
  ): Promise<null> {
    if(this.validator.isMongoId(id)) {
      Calendar.validateBrDate(date);
      const convertedDate: Date = Calendar.convertFromBrToUs(date);
      await this.negotiationsService.patchNegotiation(id, convertedDate, amount, value);
      return null;
    } else {
      const msg: string = `PATCH method with invalid id: ${id}`;
      negotiationLogger.error(msg); console.log(msg);
      throw new BadRequestException(`Id '${id}' is invalid`);
    }
  }

  @Delete(":id")
  async deleteOneNegotiation(@Param("id") id: string): Promise<null> {
    if(this.validator.isMongoId(id)) {
      await this.negotiationsService.deleteOneNegotiation(id);
      return null;
    } else {
      const msg: string = `DELETE method with invalid id: ${id}`;
      negotiationLogger.error(msg); console.log(msg);
      throw new BadRequestException(`Id '${id}' is invalid`);
    }
  }

  @Delete()
  @UseFilters(new HttpExceptionFilter())
  async deleteAllNegotiations(): Promise<null> {
    await this.negotiationsService.deleteAllNegotiations();
    return null
  }
}