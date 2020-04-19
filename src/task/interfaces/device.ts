
export interface Device {
        _id: string,

        owner: string,

        name: string,
        type: string,

        actions: string[],
        reads: string[],
        categories: string[],

        state: string,

        isOnline: string
}