import { Address } from './address.model';
import { LegalRepresentative } from './legal-representative.model';

export interface Seller {
  readonly companyName?: string;
  readonly companyStatus?: string;
  readonly country?: string;
  readonly siret?: number;
  readonly tvaNumber?: string;
  readonly email?: string;
  readonly phoneNumber?: number;
  readonly address?: Address;
  readonly websiteUrl?: string;
  readonly numberOfReferences?: number;
  readonly deliveryTime?: number;
  readonly shippingCompany?: string;
  readonly legalRepresentative?: LegalRepresentative;
}
