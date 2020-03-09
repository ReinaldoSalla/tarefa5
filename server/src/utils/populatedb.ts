/*
This script creates 3 collections (thisWeek, lastWeek, beforeLastWeek) into the database "tarefa5".
Each collection has 3 documents that are going to be sent to the client by negotiations.service.ts
Command for running this file: npx ts-node populatedb.ts
*/


import * as mongoose from "mongoose";
import { negotiationSchema } from "../negotiations/negotiation.schema";
import Calendar, { Dates }  from "../utils/calendar";
import { dbUrl } from "../properties";

interface Negotiations {
    data: Date, 
    quantidade: number,
    valor: number
}

class DatabaseFiller {
    private dates: Dates;

    constructor() {
        this.configureConnection();
        this.dates = Calendar.getDates();
        this.createThisWeeksCollection("thisWeek");
        this.createLastWeeksCollection("lastWeek");
        this.createPreviousLastWeeksCollection("beforeLastWeek");
    }

    private configureConnection() {
	    const db = mongoose.connection;
	    mongoose.set('useFindAndModify', false); // Set to false to remove a DeprecationWarning message when using findByIdAndUpdate in service.ts
	    mongoose.connect(dbUrl, { 
	        useNewUrlParser: true,
	        useUnifiedTopology: true 
	    });
	    db.on("error", console.error.bind(console, "Connection error with MongoDB"));
	    console.log(`MongoDB connected. URL: ${dbUrl}`);
    }

    private saveCollection(negotiations: Negotiations[], NegotiationModel: mongoose.Model<mongoose.Document>) {
        for(let i = 0; i < negotiations.length; i++) {
            const negotiation = new NegotiationModel({
                data: negotiations[i].data,
                quantidade: negotiations[i].quantidade,
                valor: negotiations[i].valor
            });
            negotiation.save();
        }
    }

    private createThisWeeksCollection(collectionName: string): void {
        const negotiations: Negotiations[] = [
            { data: this.dates["currentDate"], quantidade: 1, valor: 150 },
            { data: this.dates["currentDate"], quantidade: 2, valor: 250 },
            { data: this.dates["currentDate"], quantidade: 3, valor: 350 },
        ]
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema)
        this.saveCollection(negotiations, NegotiationModel);
        console.log(`Created collection ${collectionName}`)
    }

    private createLastWeeksCollection(collectionName: string): void {
        const negotiations: Negotiations[] = [
            { data: this.dates["dateMinus7Days"], quantidade: 1, valor: 450 },
            { data: this.dates["dateMinus7Days"], quantidade: 2, valor: 550 },
            { data: this.dates["dateMinus7Days"], quantidade: 3, valor: 650 },
        ]
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema)
        this.saveCollection(negotiations, NegotiationModel);
        console.log(`Created collection ${collectionName}`)
    }

    private createPreviousLastWeeksCollection(collectionName: string): void {
        const negotiations: Negotiations[] = [
            { data: this.dates["dateMinus14Days"], quantidade: 1, valor: 750 },
            { data: this.dates["dateMinus14Days"], quantidade: 2, valor: 850 },
            { data: this.dates["dateMinus14Days"], quantidade: 3, valor: 950 },
        ]
        const NegotiationModel = mongoose.model(collectionName, negotiationSchema)
        this.saveCollection(negotiations, NegotiationModel);
        console.log(`Created collection ${collectionName}`)
    }
}

const dbFiller = new DatabaseFiller();
