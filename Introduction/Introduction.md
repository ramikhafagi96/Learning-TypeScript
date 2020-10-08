# Introduction
In this introduction i will document the basics of TypeScript that I have learnt.
## Table Of Contents
- [Compiling TS](#compiling-ts)
- [Configuring TS](#configuring-ts)
- [Variables](#variables)
- [Variable Declarations](#variable-declarations)
- [Arrays & Tuples](#arrays-and-tuples)
- [Objects](#objects)
- [Union & Intersection](#union-and-intersection)
- [Type Systems & Object Shapes](#type-systems-&-object-shapes)
- [Functions](#functions)
- [Function Signature Overloading](#function-signature-overloading)
- [Lexical Scope](#lexical-scope)
## Compiling TS
``` bash
# this generates an ES3-JS file
tsc src/index.ts
# this generates an ES2015-JS
tsc src/index.ts --target ES2015
# this generates an ES2017-JS
tsc src/index.ts --target ES2017
# this generates an ES2017-JS with proper exports to run with node
tsc src.index.ts --target ES2017 --module commonjs
# this generates an ES2017-JS with proper exports to run with node and sync index.ts with index.js file
tsc src.index.ts --target ES2017 --module commonjs --watch
```
When you compile a ts file the output js is synced with the ts, when you make changes to ts the output js changes accordingly without recompile.

## Configuring TS
Create a tsconfig.json file in the project directory.
Note: What you need to specify in a <strong>tsconfig</strong> file is:
  1. Files to compile
  2. Compiler options

Example for a <strong>tsconfig.json</strong> file
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES2017",
        "outDir": "lib",
        "declaration": true,
        "sourceMap": true
    },
    "include": ["src"]
}
```

## Variables
- when you declare a <strong>const</strong> it's type becomes the value of it.
```typescript
// here y has a type of y: "hello world"
const y = "hello world";
```
Note: a <strong>const</strong> can't be reassigned <strong>BUT</strong> if the <strong>cosnt</strong> is an object, the object is <strong>mutable</strong>. So, as long as the assigned value is not a primitve type such as: string, number, boolean etc.., the assigned value is <strong>mutable</strong>
```typescript
// here foo is of type string not of type "hello"
const myObj = {
  foo: "hello"
};
// this is allowed
myObj.foo = "bye";
// however reassignment this is not allowed
myObj = {
  good: "bye"
};
```
- if you declared a variable with a certain type, you can only reassign it with the same type
```typescript
// here x has a type of number
let x = 5;
// if you reassign it with a string that throws an error
x = "5";
```

## Variable Declarations
- if you declare a variable without a type and without initialization this variable will have a type of <strong>any</strong>
```typescript
// this will not cause an error
let z;
z = 4;
z = "5";
```
- if you need to have declare a variable with a type to avoid <strong>any</strong>
```typescript
let zz: number;
z =4;
// throws an error
z = "5";
```

## Arrays & Tuples
- you need to be specific with arrays so you need to initialize an array with a type
```typescript
let a: number[] = [];
a.push(33);
// this will throw an error
a.push("hello");
```
- if you need the array to have more than one type you can use <strong>(type1 | type2)</strong>
```typescript
// this example works fine
let a: (number | string)[] = [];
a.push(33);
a.push("hello");
```
- tuples can have a fixed length with specified types
```typescript
let tup: [number, string, string, number] = [
  12,
  "hello",
  "world",
  14
];
```

## Objects
- when assigning an object you should always add all the required fields
```typescript
let coolObj: { firstName: string; lastName: string; email: string; message: string };
coolObj = {
  firstName: "rami",
  lastName: "khafagi",
  email: "rami.developer96@gmail.com",
  message: "feel free to contact me 😜"
};
// this will throw an error
coolObj = {
  firstName: "rami"
};
```
- However if you have a field that may or may not exist use optional
```typescript
// this example works fine
let myObj: { firstName: string; lastName?: string} 
myObj = {
  firstName: "rami"
}
```
- If you want to reuse a type you can create an <strong>interface</strong> containing this type
```typescript
interface Contact {
  firstName: string; 
  lastName: string; 
  email: string; 
  message: string;
}

let myContact: Contact = {
  firstName: "rami",
  lastName: "khafagi",
  email: "rami.developer96@gmail.com",
  message: "feel free to contact me 😜"
};
```
## Union & Intersection
- <strong>Union Types:</strong> we can have a type that can be one of several things
```typescript
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

let contactInfo: HasEmail | HasPhoneNumber =
  Math.random() > 0.5
    ? {
        // we can assign it to a HasPhoneNumber
        name: "Mike",
        phone: 3215551212
      }
    : {
        // or a HasEmail
        name: "Mike",
        email: "mike@example.com"
      };

contactInfo.name; /* NOTE: we can only access the .name property  
(the stuff HasPhoneNumber and HasEmail have in common) */
```

- <strong>Intersection Types:</strong> we can have a type that is made of more than one type
```typescript
let otherContactInfo: HasEmail & HasPhoneNumber = {
  // we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
  name: "Mike",
  email: "mike@example.com",
  phone: 3215551212
};

otherContactInfo.name; // NOTE: we can access anything on _either_ type
otherContactInfo.email;
otherContactInfo.phone;
```

## Type Systems & Object Shapes
- TypeScript uses a <strong>Structural Type System</strong> which only cares about the <strong>shape</strong> of an object. We don't need to define classes for every type we need.

## Functions
- function arguments and return can have <strong>type annotations</strong>
```typescript
interface HasEmail {
  name: string;
  email: string;
}

function sendEmail(to: HasEmail) { recipient: string; body: string} {
  return {
    recipient: to.email,
    body: "DON'T OPEN THIS EMAIL IT WILL EXPLODEEE!"
  }
}
```

- Not using type annotations and depending on the <strong>type inference</strong> by TS can cause unexpected effects
```typescript
// Happy Scenario
/* return type is 
{
    first: string;
    middle: string | undefined;
    last: string;
}
*/
function getNameParts(contact: { name: string }) {
  const parts = contact.name.split(/\s/g); // split @ whitespace
  if (parts.length < 2) {
    throw new Error(`Can't calculate name parts from name "${contact.name}"`);
  }
  return {
    first: parts[0],
    middle:
      parts.length === 2
        ? undefined
        : // everything except first and last
          parts.slice(1, parts.length - 2).join(" "),
    last: parts[parts.length - 1]
  };
}
```
However if we do this and return a different type at the beginning see what happens:
```typescript
/* the return type now is
{
    name: string;
    first?: undefined;
    middle?: undefined;
    last?: undefined;
} | {
    first: string;
    middle: string | undefined;
    last: string;
    name?: undefined;
}
*/
function getNameParts(contact: { name: string }) {
  const parts = contact.name.split(/\s/g); // split @ whitespace
  // THIS IS THE ADDITION!!!!!
  if (parts.length === 1) {
      return { name: parts[0] };
  }
  // --------------------------
  if (parts.length < 2) {
    throw new Error(`Can't calculate name parts from name "${contact.name}"`);
  }
  return {
    first: parts[0],
    middle:
      parts.length === 2
        ? undefined
        : // everything except first and last
          parts.slice(1, parts.length - 2).join(" "),
    last: parts[parts.length - 1]
  };
}
```
Here the <strong>type inference</strong> caused unpredictable return type which may break some code using this function.

## Function Signature Overloading
- we can provide multiple function signatures, let's say we have a function implementation like this:
```typescript
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

// function implementation
function contactPeople(
  method: "email" | "phone",
  ...people: (HasEmail | HasPhoneNumber)[]
): void {
  if (method === "email") {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
  }
}

// ✅ email works
contactPeople("email", { name: "foo", email: "" });

// ✅ phone works
contactPeople("phone", { name: "foo", phone: 12345678 });

// 🚨 should throw a type error but it doesn't
contactPeople("email", { name: "foo", phone: 12345678 });
```
To solve this problem we need to have multiple function signatures which provides a pattern for using this function
```typescript
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

// function signature overloading
function contactPeople(method: "email", ...people: HasEmail[]): void;
function contactPeople(method: "phone", ...people: HasPhoneNumber[]): void;

// function implementation
function contactPeople(
  method: "email" | "phone",
  ...people: (HasEmail | HasPhoneNumber)[]
): void {
  if (method === "email") {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
  }
}

// ✅ email works
contactPeople("email", { name: "foo", email: "" });

// ✅ phone works
contactPeople("phone", { name: "foo", phone: 12345678 });

// 🚨 throws an error: No overload matches this call.
contactPeople("email", { name: "foo", phone: 12345678 });
```

## Lexical Scope
- sometimes we may run into a problem with determining what is the value of <strong>this</strong> when you invoke a function, take this example:
```typescript
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

function sendMessage(
  this: HasEmail & HasPhoneNumber,
  preferredMethod: "phone" | "email"
) {
  if (preferredMethod === "email") {
    console.log("sendEmail");
    sendEmail(this);
  } else {
    console.log("sendTextMessage");
    sendTextMessage(this);
  }
}
const c = { name: "Mike", phone: 3215551212, email: "mike@example.com" };

function invokeSoon(cb: () => any, timeout: number) {
  setTimeout(() => cb.call(null), timeout);
}
// 🚨 this is not satisfied
invokeSoon(() => sendMessage("email"), 500);
```
the problem here that in the <strong>invokeSoon</strong> function we intentionally made the value of 'this' <strong>null</strong>. And it throws an error because this constraint <strong>'this: HasEmail & HasPhoneNumber'</strong> is not satisfied.

- to solve this problem we need to specify at compile time the value of this so at run-time when the program looks-up the value of this knows what it is. We can create a bound version of (i.e: creating a <strong>closure</strong> or a <strong>closing over</strong> the function so it has a correct lexical scope) the function
```typescript
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

function sendMessage(
  this: HasEmail & HasPhoneNumber,
  preferredMethod: "phone" | "email"
) {
  if (preferredMethod === "email") {
    console.log("sendEmail");
    sendEmail(this);
  } else {
    console.log("sendTextMessage");
    sendTextMessage(this);
  }
}

const c = { name: "Mike", phone: 3215551212, email: "mike@example.com" };

// ✅ creating a bound function is one solution
const bound = sendMessage.bind(c, "email");
invokeSoon(() => bound(), 500);

// ✅ call/apply works as well
invokeSoon(() => sendMessage.apply(c, ["phone"]), 500);
```
