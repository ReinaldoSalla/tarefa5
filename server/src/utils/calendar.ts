export interface Dates {
    currentDate: Date,
    dateMinus7Days: Date,
    dateMinus14Days: Date
}

export default class Calendar {
    public static convertToBrStandard(date: Date): string {
        return (`
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        ).replace((/  |\r\n|\n|\r/gm),"");
    }

    public static convertFromBrToUs(date: string): Date {
        // Client = day/month/year
        // Server = year/month/day
        const elements = date.split("/");
        const [day, month, year] = elements
        let convertedMonth = parseInt(month);
        return new Date(parseInt(year), convertedMonth-1, parseInt(day));
    }

    public static getDates(): Dates {
        let t1 = new Date();
        let t2 = new Date();
        let t3 = new Date();
        return {
            currentDate: t1,
            dateMinus7Days: new Date(t2.setDate(t1.getDate() - 7)),
            dateMinus14Days: new Date(t3.setDate(t1.getDate() - 14)) 
        }
    }
}