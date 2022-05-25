/**
 * The % operator doesn't work with negative numbers
 *
 * Correct implementation of mathematical modulo operator
 * https://stackoverflow.com/questions/4467539/
 */
export function mod(n, m) {
  return ((n % m) + m) % m;
}
