import { join } from "path";

export const port: number = 3000;
export const hostname: string = "localhost";

export const dbName: string = "tarefa5";
export const dbUrl: string = `mongodb://${hostname}/${dbName}`;
//export const dbUrl: string = "mongodb+srv://db_user:eohr2nwYYwW5FV7W@cluster0-427nn.gcp.mongodb.net/test?retryWrites=true&w=majority"; //mongo atlas
//export const dbUrl: string = `mongodb://mongo:27017/${dbName}`; //docker


export const clientDir: string = join(__dirname, "..", "..", "client");

export const route: string = `${hostname}/${port}`;
export const routeApi: string = `${route}/api`;
export const negotiationsRoute: string = "negotiations";
export const thisWeekRoute: string = "thisWeek";
export const lastWeekRoute: string = "lastWeek";
export const beforeLastWeekRoute: string = "beforeLastWeek";

export const negotiationsLogsDir: string = join(__dirname, "..", "src", "negotiations", "negotiations.logs");