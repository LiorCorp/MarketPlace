export interface Address {
    readonly name: string;
    readonly streetNumber: number;
    readonly streetName: string;
    readonly additionalAddress?: string;
    readonly zipCode: number;
    readonly city: string;
    readonly country: string;
}
