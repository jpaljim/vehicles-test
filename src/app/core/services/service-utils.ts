export class ServiceUtils {

  /**
   * Returns the formatted string with the given values inserted by order in the original string
   * 
   * @param str the string to format
   * @param value a list of values to insert in the string
   * @returns the formatted string
   */
  static format(str: string, ...value: string[]) {
    for (let i = 0; i < value.length; ++i) {
      str = str.replace(`{${i}}`, value[i]);
    }

    return str;
  }

}