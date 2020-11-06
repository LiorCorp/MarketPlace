import { Address } from './address.model';
export interface Seller {
    readonly companyName: string;
    readonly companyStatus: string;
    readonly country: string;
    readonly siret: number;
    readonly tvaNumber?: string;
    readonly email: string;
    readonly phoneNumber: number;
    readonly address: Address;
    readonly website: string;
    readonly numberOfReferences: number;
    readonly deliveryTime: number;
}
