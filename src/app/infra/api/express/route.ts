import { Request, Response } from "express"

export type HttpMethod = 'get' | 'post' | 'patch' | 'delete'

export interface Route {
    getHandler() : (request : Request, response : Response) => Promise<void>
    getPath() : string
    getMethod() : HttpMethod
}