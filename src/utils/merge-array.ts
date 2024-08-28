/**
 * @description merges array `a` and `b` and removes duplicates.
 */
const mergeArray = <T>(a: T[], b: T[]): T[] => {
  const result = [...a];

  b.forEach(bItem => {
    if (result.includes(bItem)) return;

    result.push(bItem);
  });

  return result;
};

export default mergeArray;
