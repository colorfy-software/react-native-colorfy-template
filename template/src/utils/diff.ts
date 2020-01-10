/**
 * Compare 2 objects and outputs the keys that differ in a third object
 * @param o1 First object to compare
 * @param o2 Second object to compare
 * @returns Object with the keys that differ
 */
const differenceInObject = (o1: object, o2: object): object => {
  return Object.keys(o2).reduce((diff: object, key: string): object => {
    if (o1[key] === o2[key]) return diff
    return {
      ...diff,
      [key]: o2[key],
    }
  }, {})
}

export default differenceInObject
