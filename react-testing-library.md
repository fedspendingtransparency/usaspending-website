# React Testing Library (RTL) vs Enzyme

With the introduction of React 16.8+ Enzyme ceased to be the industry standard testing suite for React. This is because 
Enzyme exposes APIs that inspect the inner workings of components; for example, lifecycle methods, 
state, and props. With the introduction of react hooks in React 16.8+, functional components were elevated to the same 
functionality as class components with `useState` and `useEffect`. Enzyme does not expose functional component state, 
or props and lifecycle methods themselves have been replaced by the `useEffect` method. This means that as functional
components take the lead in the React Ecosystem for their increased performance and reusability, Enzyme has taken
a proportional back seat.

At a more foundational level, the Enzyme testing paradigm which relies on accessing component state, props, and 
lifecycle methods has been criticized as testing [implementation details](https://kentcdodds.com/blog/
testing-implementation-details). [The react documentation](https://reactjs.org/docs/hooks-faq.html#how-to-test-components-that-use-hooks) 
specifies tests should not rely on "the internals of react". Together with the dated nature of the Enzyme testing API relative to modern, 
functional react and the criticism that the paradigm behind the API itself is flawed, the front end should be tested 
using RTL and Jest. Moving away from Enzyme toward RTL will make our tests more reliable (a test will fail because the code is broken, not because the implementation has changed) and easier to write. The RTL API exposes [queries](https://testing-library.com/docs/
dom-testing-library/api-queries) which rely on aria-roles to inspect our rendered HTML. This reinforces best practices related to 
accessibility and simplifies our tests such that we can think of our code in its rendered form (HTML) rather than in its pre-compiled form as 
a React Component.

# Application Testing Coverage: What should I test?

We will continue to rely on Jest to test our helper functions, reducers and models. These are vanilla JavaScript and do not require
any special configuration beyond what is provided by Jest. All of the logic in these files should be tested with 100% coverage. 

## Container and Component Testing

Both for performance reasons and testability, we should define our business logic outside of our component definitions. For 
logic that resides inside of a react component, we should test by simulating user interaction in RTL. This requires changing our paradigm 
away from inspecting the innards of our components (state, lifecycle methods, props) and toward testing the rendered HTML. This is what a 
user would see and therefore in many ways is a more simple testing strategy.

Here is [a helpful contrast](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme#test-1-render-the-component-and-check-if-the-h1-value-is-correct) on the React Testing Library documentation site of a component test written in Enzyme versus one written in RTL.

### Examples from our Code Base

- [Testing output of Component](tests/components/covid19/homepage/TotalAmount-test.jsx)
- [Testing fn defined outside of Component](tests/containers/covid19/RecipientTableContainer-test.jsx)
- [Mocking URL Params of React Router](tests/components/aboutTheData/AboutTheDataPage-test.jsx)
- [Ensuring no duplicate API Requests](tests/containers/aboutTheData/AgenciesContainer-test.jsx)
  