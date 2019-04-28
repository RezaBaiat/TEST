##What is Dependency injection?

Dependency injection is a software design pattern that allows someone to remove hard-coded dependencies and makes it possible to change them. Dependencies can be injected to the object via the constructor or via defined method or a setter property.

There are basically three types of dependency injection:
- Constructor injection: the dependencies are provided through a class constructor.
- Setter injection: the client exposes a setter method that the injector uses to inject the dependency.
- Interface injection: the dependency provides an injector method that will inject the dependency into any client passed to it. Clients must implement an interface that exposes a setter method that accepts the dependency.

## Why Dependency Injection?

- Decreases coupling between an object and its dependency
- Doesn’t require any change in code behavior, it can be applied to an existing code
- Helps isolate the client from the impact of design changes and defects
- Allows the system to be reconfigured without changing the existing code
- Allows concurrent or independent development
- Allows to make code more maintainable and testable, because dependencies’ impact can be removed by replacing dependencies with mocks or stubs

## Why use external Package instead of Dependency Injection Middlewares in JavaScript
- Code functionality is and more readable since you will have access to the source files
- Code completion works best , while the IDE knows nothing about types when using Middlewares . this is a big deal since every time you want to know about the injected object and its variables and methods , you should checkout main source of the object!
- Possible to debug (vs impossible to debug), since debuggers also have access to the source files
- Forces abstractions, singletons and static methods , which cause a lot cleaner code, lower boilerplate and more task specific functions
- Not as complex as using middlewares
- It lowers boilerplate even more by removing the need to implement in every component


## Disadvantages of using external Package
- can not be used in reflections when u inject from server & server rendering