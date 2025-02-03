import { Api } from "../api";
import express, {Express, json} from "express"
import { Route } from "./route";

export class ApiExpress implements Api {

    private app : Express

    private constructor(private readonly routes : Route[]) {
        this.app = express(),
        this.app.use(json()),
        this.addRoutes(routes)
    }

    public static build(routes : Route[]) {
        return new ApiExpress(routes)
    }

    private addRoutes(routes : Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()

            this.app[method](path, handler)
        })
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Aplicação rodando na porta ${port}`)
        })
    }

}