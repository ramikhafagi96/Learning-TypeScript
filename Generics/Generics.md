# Generics
In this section we will discuss generics which provides us with <strong>parametrized</strong> types.

## Table of Contents
- [Parametrized Types](#parametrized-types) 
- [Type Parameters](#type-parameters)
- [Constraints and Scope](#constraint-and-scope)
- [Implement map On Dictionary](#implement-map-on-dictionary)
## Parametrized Types
- <strong>generics</strong> allow us to parameterize types in the same way that functions parametrize values.
```typescript
interface WrappedValue<X> {
  value: X;
}
let val: WrappedValue<string[]> = { value: [] };
val.value; //string[]
```
another example for using generics:
```typescript
// 'any' means if no type parameter is provided the default is any
interface FilterFunction<T = any> {
  (val: T): boolean;
}

const stringFilter: FilterFunction<string> = val => typeof val === "string";
//stringFilter(0); // 🚨 ERROR
stringFilter("abc"); // ✅ OK
```

## Type Parameters
- you don't have to use the parametrized type <strong>T</strong> directly, TypeScript can infer the type if the function parameter type is generic over the type it becomes.
```typescript
function resolveOrTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // start the timeout, reject when it triggers
    const task = setTimeout(() => reject("time up!"), timeout);

    promise.then(val => {
      // cancel the timeout
      clearTimeout(task);

      // resolve with the value
      resolve(val);
    });
  });
}
resolveOrTimeout(fetch(""), 3000);
```
here the Promise type is generic over the type it resolves to.

## Constraint and Scope
- we can set constraints for our type parameters
```typescript
function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
  const out: { [k: string]: T } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}

const myDict = arrayToDict([
  { id: "a", value: "first", lisa: "Huang" },
  { id: "b", value: "second" }
]);
```
in this example we are saying i'm saying that T must be <strong>assignable</strong> to this type <strong>
{ id: string }</strong>, so we can have more properties but it must at least has this property id of type string.

- type parameters are associated with scopes
```typescript
function startTuple<T>(a: T) {
  return function finishTuple<U>(b: U) {
    return [a, b] as [T, U];
  };
}
const myTuple = startTuple(["first"])(42);
```

## Implement map On Dictionary

- using generics to implement the map function on a dictionary
```typescript
type Dict<T> = {
    [k: string] : T | undefined;
};

// Array.prototype.map but for Dict
function mapDict<T, S>(dict: Dict<T>, fn: (arg: T, idx: number) => S): Dict<S> {
    const out: Dict<S> = {};
    Object.keys(dict).forEach((dKey, idx) => {
        const thisItem = dict[dKey];
        if (typeof(thisItem) !== 'undefined') {
            out[dKey] = fn(thisItem, idx);
        }
    });
    return out;
}

mapDict({
    a: "a",
    b: "b"
}, (str) => ({ val: str }));
```

