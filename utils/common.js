/**
 * A function to format a string with placeholders replaced by provided values.
 *
 * @function stringFormat
 * @param {string} str - The input string containing placeholders in the format {index}.
 * @param {...*} values - The values to replace the placeholders in the input string.
 * @returns {string} The formatted string with placeholders replaced by provided values.
 *
 * @example
 * const name = 'John Doe';
 * const greeting = stringFormat('Hello, {0}!', name);
 * console.log(greeting); // Output: Hello, John Doe!
 */
export const stringFormat = (str, ...values) =>
  str.replace(/{(\d+)}/g, (_, index) => values[index].toString() || "");