import { Device } from "./device"

export interface Group {
        _id: string,

        owner: string,

        name: string,
        description: string,

        devices: Device[],
        categories: string[]
}
