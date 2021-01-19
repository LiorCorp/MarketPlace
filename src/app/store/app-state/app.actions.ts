export class FetchAllProducts {
  static readonly type = '[Products] Fetch All';
}

export class FetchSellerById {
  static readonly type = '[Sellers] Fetch Seller By Id';
  constructor(public idSeller: string) {}
}
