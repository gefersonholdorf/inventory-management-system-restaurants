import { Request, Response } from "express"

export type HttMethod = 'get' | 'post'

export interface Route {
    getHandler() : (request : Request, response : Response) => Promise<void>
    getPath() : string
    getMethod() : HttMethod
}