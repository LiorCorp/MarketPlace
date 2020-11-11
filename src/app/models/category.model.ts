export interface Category {
  readonly uid: string;
  readonly name: string;
  readonly level: number;
  readonly children?: Category[];
}
