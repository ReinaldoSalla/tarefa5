import * as mongoose from "mongoose";
import { negotiationSchema } from "../negotiation.schema";
import Calendar, { Dates }  from "../../general-utils/calendar";
import { Negotiation } from "../negotiation.interface";
import { Model } from "mongoose";

export default class DatabaseFiller {
    private dates: Dates;

    constructor() {
        this.dates = Calendar.getDates();
    }

    private async saveCollection(negotiations: Negotiations[], NegotiationModel: mongoose.Model<mongoose.Document>) {
        for(let i = 0; i < negotiations.length; i++) {
            const negotiation = new NegotiationModel({
                data: negotiations[i].data,
                quantidade: negotiations[i].quantidade,
                valor: negotiations[i].valor
            });
            await negotiation.save();
        }
    }

    public async createThisWeeksCollection(negotiationModel: Model<Negotiation>, collectionName: string): Promise<void> {
        const negotiations = [
            { data: this.dates["currentDate"], quantidade: 1, valor: 150 },
            { data: this.dates["currentDate"], quantidade: 2, valor: 250 },
            { data: this.dates["currentDate"], quantidade: 3, valor: 350 },
        ]
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema)
        this.saveCollection(negotiations, NegotiationModel);
        console.log(`Created collection ${collectionName}`)
    }

    public async createLastWeeksCollection(negotiationModel: Model<Negotiation>, collectionName: string): Promise<void> {
        const negotiations = [
            { data: this.dates["dateMinus7Days"], quantidade: 1, valor: 450 },
            { data: this.dates["dateMinus7Days"], quantidade: 2, valor: 550 },
            { data: this.dates["dateMinus7Days"], quantidade: 3, valor: 650 },
        ]
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema)
        this.saveCollection(negotiations, NegotiationModel);
        console.log(`Created collection ${collectionName}`)
    }

    public async createPreviousLastWeeksCollection(negotiationModel: Model<Negotiation>, collectionName: string): Promise<void> {
        const negotiations = [
            { data: this.dates["dateMinus14Days"], quantidade: 1, valor: 750 },
            { data: this.dates["dateMinus14Days"], quantidade: 2, valor: 850 },
            { data: this.dates["dateMinus14Days"], quantidade: 3, valor: 950 },
        ]
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema)
        this.saveCollection(negotiations, NegotiationModel);
        console.log(`Created collection ${collectionName}`)
    }
}