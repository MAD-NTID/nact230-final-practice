import { Output } from "./output.interface"

export interface Test 
{
    readonly name: string
    readonly setup?: string
    readonly run: string
    readonly timeout: number
    readonly inputs?: Array<string>
    readonly outputs?:Array<Output>
    readonly points?: number
    readonly extraCredit?: boolean
}