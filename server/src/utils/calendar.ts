import { BadRequestException } from "@nestjs/common"

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

    public static validateBrDate(date: string): void {
        let slashCounter: number = 0;
        date.split('').forEach(char => {
            if(char === "/") slashCounter++; 
        });
        const [dayText, monthText, yearText] = date.split("/");
        const day = parseInt(dayText);
        const month = parseInt(monthText);
        const year = parseInt(yearText);
        let msg: string = "";
        let error: boolean = false;
        if(slashCounter !== 2) {
            msg += `Date ${date} is invalid, must be in dd/mm/yyyy format. `;
            error = true;
        }
        if(day <= 0 || day > 31) {
            msg += `Day '${day}' is invalid, must be between 1-31. `;
            error = true;
        }
        if(month <= 0 || month > 12) {
            msg += `Month '${month}' is invalid, must be between 1-12. `;
            error = true;
        }
        if(year <= 0 || year > 2020) {
            msg += `Year '${year}' is invalid, must be between 0-2020. `;
            error = true;
        }
        if(error) throw new BadRequestException(msg);
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
