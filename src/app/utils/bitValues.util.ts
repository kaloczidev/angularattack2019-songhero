export class BitValuesUtil {
  static get(value: number): Array<number> {
    const result = new Array(8);
    for (let i = 0; i < 8; ++i) {
      result[i] = value & (1 << i) ? 1 : 0;
    }
    return result;
  }

  static set(values: Array<number>): number {
    let result = 0;
    for (let i = 0; i < 8; ++i) {
      if (values[i]) {
        result |= 1 << i;
      }
    }
    return result;
  }
}
