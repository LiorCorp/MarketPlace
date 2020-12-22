export class StringUtil {
  static capitalize(str: string): string {
    return str.replace(/(^|[\s-])\S/g, (match: any) => match.toUpperCase());
  }
}
