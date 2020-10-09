# Classes
In this section we will get to know how classes works in TypeScript.

## Table Of Contents
- [Implementing Interfaces](#implementing-interfaces)
- [Access Modifiers Initialization](#access-modifiers-initialization)
- [Definite Assignment and Lazy Initialization](#definite-assignemnt-and-lazy-initialization)
- [Abstract Classes](#abstract-classes)

## Implementing Interfaces
- in TypeScript classes can implement an <strong>interface</strong>.
```typescript
interface HasEmail {
  name: string;
  email: string;
}

class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}
```
- TypeScript has a shortcut which makes defining a class and initializing class properties in a less <strong>verbose</strong> way which is called <strong>Parameter Properties</strong>.
```typescript
class ParamPropContact implements HasEmail {
  constructor(public name: string, public email: string = "no email") {
    // nothing needed
  }
}
```
## Access Modifiers Initialization
- we have three types of access modifiers:
  - <strong>public</strong>
  - <strong>protected</strong>
  - <strong>private</strong>

- when you conform to an interface, the properties in that interface should be public(visible) from the outside.
```typescript
// the email property is not visible to the outside.
class ParamPropContact implements HasEmail {
  constructor(public name: string, protected email: string = "no email") {
    // nothing needed
  }
}
```

## Definite Assignment and Lazy Initialization

- sometime we may have properties that at the first stage of the application lifecycle it may not have a value.
- it may be initialized by an <strong>async</strong> API call, or you're sure that at some point in the futrue it will definetly have a value.
- the first way to handle this is to add the possibility that this propery may be <strong>undefined</strong>.
```typescript
class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  private password: string | undefined;
  constructor(public name: string, public email: string, public phone: number) {
  
  }
  if (phone > 0 ) {
    this.password = Math.round(Math.random() * 1e14).toString(32);
  }
}
```
- another way is to use the <strong>new</strong>, but this should be based on the fact that <strong>phone</strong> will be greater than 0.
- if we have an <strong>async</strong> setup for this property, another way is to use a <strong>definite assignment</strong> like so:
```typescript
class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  private password!: string;
  constructor(public name: string, public email: string, public phone: number) {
  
  }
  async init() {
    this.password = await APICall();
  }
``` 
here you're saying "Trust me TS, I'm taking the responsibility for making sure that this field gets initialized properly, let me handle it 😉".

- if the property is lazily created we can do like this:
```typescript
class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  private passwordVal: string | undefined;
  constructor(public name: string, public email: string, public phone: number) {
    
  }
  
  get password(): string {
    if(!this.passwordVal) {
      this.password = Math.round(Math.random() * 1e14).toString(32);
    }
    return this.passwordVal
  }
```

## Abstract Classes
- TypeScript provides abstract classes like so:
```typescript
abstract class AbstractContact implements HasEmail, HasPhoneNumber {
  public abstract phone: number; // must be implemented by non-abstract subclasses

  constructor(
    public name: string,
    public email: string // must be public to satisfy HasEmail
  ) {}

  abstract sendEmail(): void; // must be implemented by non-abstract subclasses
}

class ConcreteContact extends AbstractContact {
  constructor(
    public phone: number, // must happen before non property-parameter arguments
    name: string,
    email: string
  ) {
    super(name, email);
  }
  sendEmail() {
    // mandatory!
    console.log("sending an email");
  }
}
```
