export class FetchAllProducts {
  static readonly type = '[Products] Fetch All';
}

export class FetchSellerById {
  static readonly type = '[Seller] Fetch Seller By Id';
  constructor(public sellerId: string) {}
}

export class FetchBrandById {
  static readonly type = '[Brand] Fetch Brand By Id';
  constructor(public brandId: string) {}
}

export class FetchProductImgById {
  static readonly type = '[Product] Fetch Product Image';
  constructor(public img: string) {}
}
