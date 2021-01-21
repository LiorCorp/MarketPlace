export class FetchProducts {
  static readonly type = '[Products] Fetch Products';
}

export class FetchCurrentProduct {
  static readonly type = '[Product] Fetch Current Product';
  constructor(public productId: string) {}
}

export class FetchProductImg {
  static readonly type = '[Product] Fetch Product Image';
  constructor(public img: string) {}
}

export class FetchSellerById {
  static readonly type = '[Seller] Fetch Seller By Id';
  constructor(public sellerId: string) {}
}

export class FetchBrandById {
  static readonly type = '[Brand] Fetch Brand By Id';
  constructor(public brandId: string) {}
}
