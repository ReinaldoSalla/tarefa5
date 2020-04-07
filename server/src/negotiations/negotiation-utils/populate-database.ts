import * as mongoose from "mongoose";
import { negotiationSchema } from "../negotiation.schema";
import Calendar, { Dates }  from "../../general-utils/calendar";
import { Model } from "mongoose";
import { Negotiation } from "../negotiation.interface";

interface NegotiationItems {
    data: Date,
    quantidade: number,
    valor: number
}

export default class DatabaseFiller {
    private dates: Dates = Calendar.getDates();

    private async saveCollection(negotiations: any, NegotiationModel: mongoose.Model<mongoose.Document>) {
        for (let i = 0; i < negotiations.length; i++) {
            const negotiation = new NegotiationModel({
                data: negotiations[i].data,
                quantidade: negotiations[i].quantidade,
                valor: negotiations[i].valor
            });
            await negotiation.save();
        }
    }

    public async createThisWeeksCollection(negotiationModel: Model<Negotiation>, collectionName: string): Promise<void> {
        const negotiations: Array<NegotiationItems> = [
            { data: this.dates["currentDate"], quantidade: 1, valor: 150 },
            { data: this.dates["currentDate"], quantidade: 2, valor: 250 },
            { data: this.dates["currentDate"], quantidade: 3, valor: 350 },
        ]
        await this.saveCollection(negotiations, negotiationModel);
        console.log(`Created collection ${collectionName}`);
    }

    public async createLastWeeksCollection(negotiationModel: Model<Negotiation>, collectionName: string): Promise<void> {
        const negotiations = [
            { data: this.dates["dateMinus7Days"], quantidade: 1, valor: 450 },
            { data: this.dates["dateMinus7Days"], quantidade: 2, valor: 550 },
            { data: this.dates["dateMinus7Days"], quantidade: 3, valor: 650 },
        ]
        await this.saveCollection(negotiations, negotiationModel);
        console.log(`Created collection ${collectionName}`)
    }

    public async createPreviousLastWeeksCollection(negotiationModel: Model<Negotiation>, collectionName: string): Promise<void> {
        const negotiations = [
            { data: this.dates["dateMinus14Days"], quantidade: 1, valor: 750 },
            { data: this.dates["dateMinus14Days"], quantidade: 2, valor: 850 },
            { data: this.dates["dateMinus14Days"], quantidade: 3, valor: 950 },
        ]
        await this.saveCollection(negotiations, negotiationModel);
        console.log(`Created collection ${collectionName}`)
    }
}