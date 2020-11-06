import { Address } from './address.model';

export interface LegalRepresentative {
    readonly firstname: string;
    readonly lastname: string;
    readonly birthday: string;
    readonly birthCity: string;
    readonly nationality: string;
    readonly address: Address;
    readonly beneficialOwner: boolean;
}
