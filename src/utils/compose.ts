export function compose(...functions: any) {
  return function (initialValue: any) {
    return functions.reduceRight(
      (value: any, fn: any) => fn(value),
      initialValue,
    );
  };
}
