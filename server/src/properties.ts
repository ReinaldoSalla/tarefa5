import { join } from "path";

export const port: number = 3000;
export const hostname: string = "localhost";
export const route: string = `${hostname}/${port}`
export const routeApi: string = `${route}/api`
export const negotiationsRoute: string = "negotiations";
export const thisWeekRoute: string = "thisWeek";
export const lastWeekRoute: string = "lastWeek";
export const beforeLastWeekRoute: string = "beforeLastWeek"
export const dbName: string = "tarefa5";
export const dbUrl: string = `mongodb://${hostname}/${dbName}`;
export const clientDir: string = join(__dirname, "..", "..", "client");