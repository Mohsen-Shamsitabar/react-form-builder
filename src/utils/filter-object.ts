const filterObject = <T extends object, K extends keyof T>(
  obj: T,
  filteredKeys: K[],
): Pick<T, K> => {
  return Object.keys(obj).reduce(
    (result, key) => {
      if (!filteredKeys.includes(key as K)) return result;

      result[key as K] = obj[key as K];

      return result;
    },
    {} as Pick<T, K>,
  );
};

export default filterObject;
