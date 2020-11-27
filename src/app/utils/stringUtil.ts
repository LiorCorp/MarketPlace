export class StringUtil {
  static capitalize(str): string {
    return str.replace(/(^|[\s-])\S/g, (match) => match.toUpperCase());
  }
}
