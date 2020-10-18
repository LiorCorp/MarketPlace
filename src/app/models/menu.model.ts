export interface Menu {
    readonly name: string;
    readonly level: number;
    readonly children?: Menu[];
}
