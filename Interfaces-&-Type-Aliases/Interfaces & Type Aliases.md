# Interfaces & Type Aliases
In this section we will get into more details about interfaces and heritage classes.
## Table Of Contents
- [Type Aliases & extends](#type-aliases-and-extends)
- [Dictionary Objects & Index Signatures](#dictionary-objects-&-index-signatures)
- [Combining Interfaces](#combining-interfaces)

## Type Aliases & extends
- <strong>Type Alias:</strong> giving a type a name.
```typescript
type StringOrNumber = string | number;
 // NEW in TS 3.7: self-referencing types
type NumVal = 1 | 2 | 3 | NumVal[];
let arr : NumVal = [1,2,3,[1,2,3,[1,2,3]],1,2,3,[[1,2,3],[1,2]]];
```
- <strong>interfaces</strong> can describe:
  - objects
  - functions
  - arrays

generally speaking things that have <strong>prototypes</strong>.
- <strong>type aliases</strong> can handle anything that <strong>interfaces</strong> can handle.
```typescript
interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

type ContactMessenger2 = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;
```

- <strong>interfaces</strong> can extend from other interfaces.
```typescript
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
  countryCode: string;
}
```

- we don't need type annotations for contact or message when we use <strong>type aliases</strong>
```typescript
const emailer: ContactMessenger1 = (_contact, _message) => {

};
```
## Dictionary Objects & Index Signatures
- if we declared an interface as an index signature for a dictionary object like this:
```typescript
/**
 * @example
 * {
 *    iPhone: { areaCode: 123, num: 4567890 },
 *    home:   { areaCode: 123, num: 8904567 },
 * }
 */

interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  [numberName: string]:
    {
        areaCode: number;
        num: number;
      };
      
const d: PhoneNumberDict = {};
// if you hover on this in your text-editor you will see valid type
d.abc
}
```
the problem here is that TypeScript will give a <strong>false guarantee</strong> that this index signature will return a valid value if it doesn't exist. So, to fix this issue you need to <strong>enforce</strong> a type check like so:
```typescript
interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  [numberName: string]:
    | undefined // enforce type check
    | {
        areaCode: number;
        num: number;
      };
}
```
- at most, a type may have one string and one number index signature.

## Combining Interfaces

- you can <strong>augment</strong> an existing interface, like importing it from a library and adding more stuff to it.
```typescript
interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

interface PhoneNumberDict {
  home: {
    /**
     * (7) interfaces are "open", meaning any declarations of the
     * -   same name are merged
     */
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
}

// you can add more fields to it that have the same index signature
const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 },
  mobile: { areaCode: 421, num: 12324 }
};
```
- <strong>type aliases</strong> are sorted out eagerly, let's take this example:
```typescript
const x = [1,2,3,1,2,[1,2,3]]
type NumVal = 1 | 2 | 3 | NumArr;
type NumArr extends Array<NumVal>{

};
```
here 'NumArr' is <strong>hoisted</strong> like a function so we can refer to it before it's used.