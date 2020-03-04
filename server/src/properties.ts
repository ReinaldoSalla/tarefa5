export const port: number = 3000;
export const hostname: string = "localhost";
export const route: string = `${hostname}/${port}`
export const routeApi: string = `${route}/api`
export const negotiationsRoute: string = "/negotiations";
export const dbName: string = "nestjs-demo";
export const dbUrl: string = `mongodb://${hostname}/${dbName}`;