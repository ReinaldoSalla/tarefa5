export interface Dates {
    currentDate: Date,
    dateMinus7Days: Date,
    dateMinus14Days: Date
}

export default class Calendar {
    static convertToBrStandard(date: Date): string {
        return (`
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        ).replace((/  |\r\n|\n|\r/gm),"");
    }

    static getDates(): Dates {
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