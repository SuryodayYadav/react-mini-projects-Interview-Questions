# React Interview Preparation — 100 Questions

(Scenario-Based + Output-Based + Coding-Focused)

Covers:

* React Core
* Hooks
* Rendering
* State Management
* Performance
* Lifecycle
* Forms
* Context API
* Routing
* API handling
* Optimization
* Architecture
* Edge cases
* Production issues

---

# 1. React Fundamentals (1–15)

---

## 1. What is Virtual DOM?

Scenario:
Why React updates are faster than direct DOM manipulation?

---

## 2. Difference:

DOM vs Virtual DOM.

---

## 3. Output?

```jsx id="cavbti"
const element = <h1>Hello</h1>;

console.log(typeof element);
```

---

## 4. What happens internally when state changes?

---

## 5. Difference:

Functional vs Class Components.

---

## 6. Why functional components preferred now?

---

## 7. Output?

```jsx id="9ckr0w"
function App() {
  return (
    <>
      <h1>Hello</h1>
      <h2>World</h2>
    </>
  );
}
```

Purpose of `<> </>`?

---

## 8. Difference:

Props vs State.

---

## 9. Scenario:

Child updating parent state.

How?

---

## 10. What are controlled components?

---

## 11. Difference:

Controlled vs uncontrolled components.

---

## 12. Output?

```jsx id="5s8l20"
const arr = [1,2,3];

arr.map(x => <h1>{x}</h1>);
```

What warning appears?

---

## 13. Why key prop important?

---

## 14. Scenario:

Using array index as key.

Problem?

---

## 15. Difference:

React vs Angular.

---

# 2. useState + Rendering (16–30)

---

## 16. Output?

```jsx id="e6vh53"
const [count, setCount] = useState(0);

setCount(count + 1);
setCount(count + 1);

console.log(count);
```

Final value?

---

## 17. Why state updates are asynchronous?

---

## 18. Correct way to update based on previous state?

```jsx id="jlwmce"
setCount(prev => prev + 1);
```

Why?

---

## 19. Scenario:

State not updating immediately.

Reason? -> scheduled and batched

---

## 20. Output?

```jsx id="moqoyy"
const [user, setUser] = useState({
  name: "A"
});

setUser({
  age: 25
});
```

What happens?

---

## 21. Difference:

State mutation vs immutable updates.

---

## 22. Scenario:

UI not re-rendering after object update.

Reason?

---

## 23. Output?

```jsx id="m13x5f"
const [arr, setArr] = useState([1,2]);

arr.push(3);

setArr(arr);
```

Will component re-render?

---

## 24. Why React compares references?

---

## 25. Scenario:

Need multiple independent states.

Better:
multiple useState OR single object?

---

## 26. Coding:

Add item to list immutably.{...obj, phone}

---

## 27. Coding:

Remove item from array state.

---

## 28. Coding:

Update nested object state.

---

## 29. Scenario:

Large form state handling.

Best approach?

---

## 30. What causes re-render in React?

---

# 3. useEffect (31–45)

---

## 31. Output?

```jsx id="7y4b7n"
useEffect(() => {
  console.log("Hello");
});
```

When runs?

---

## 32. Output?

```jsx id="a5fmkf"
useEffect(() => {
  console.log("Hello");
}, []);
```

---

## 33. Output?

```jsx id="rzxzj5"
useEffect(() => {
  console.log("Hello");
}, [count]);
```

---

## 34. Difference:

No dependency vs empty dependency.

---

## 35. Scenario:

Infinite re-render in useEffect.

Reason?

---

## 36. Output?

```jsx id="g7r3y7"
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

---

## 37. Scenario:

API calling multiple times.

Possible reasons?

---

## 38. What is cleanup function?

---

## 39. Scenario:

Memory leak in React.

Reason?

---

## 40. Coding:

Clear interval in cleanup.

---

## 41. Difference:

useEffect vs useLayoutEffect.

---

## 42. Scenario:

Need DOM measurement before paint.

Which hook?

---

## 43. Output?

```jsx id="1ksvq9"
useEffect(() => {
  return () => {
    console.log("cleanup");
  };
}, []);
```

When cleanup executes?

---

## 44. Scenario:

Fetch API on component mount.

Best practice?

---

## 45. Scenario:

Abort fetch request on unmount.

How?

---

# 4. useMemo / useCallback / React.memo (46–60)

---

## 46. What problem does useMemo solve?

---

## 47. Difference:

useMemo vs useCallback.

---

## 48. Scenario:

Expensive calculation on every render.

Solution?

---

## 49. Output?

```jsx id="gzz6mm"
const value = useMemo(() => {
  return expensive();
}, []);
```

When recalculates?

---

## 50. What is memoization?

---

## 51. What problem does React.memo solve?

---

## 52. Scenario:

Child re-rendering unnecessarily.

Fix?

---

## 53. Output?

```jsx id="yzf4cw"
const fn = useCallback(() => {
  console.log("Hi");
}, []);
```

Purpose?

---

## 54. Scenario:

Function prop causing child re-renders.

Solution?

---

## 55. Difference:

React.memo vs PureComponent.

---

## 56. Scenario:

Overusing useMemo.

Problem?

---

## 57. Scenario:

Need persistent mutable value without re-render.

Which hook?

---

## 58. useRef use cases?

---

## 59. Coding:

Focus input using useRef.

---

## 60. Scenario:

Store previous value.

How?

---

# 5. Component Lifecycle + Rendering (61–70)

---

## 61. Functional component lifecycle equivalent.

---

## 62. Mounting vs Updating vs Unmounting.

---

## 63. What causes parent-child re-render chain?

---

## 64. Scenario:

Parent renders → child renders unnecessarily.

How optimize?

---

## 65. Difference:

Conditional rendering approaches.

---

## 66. Output?

```jsx id="f0bfl7"
{isLoggedIn && <Dashboard />}
```

---

## 67. Scenario:

Component losing state after toggle.

Reason?

---

## 68. What is reconciliation?

---

## 69. What is diffing algorithm?

---

## 70. Why React uses keys internally?

---

# 6. Forms + Events (71–80)

---

## 71. Difference:

onChange vs onInput.

---

## 72. Output?

```jsx id="a9k1rq"
<input value={name} />
```

Without onChange.

What warning?

---

## 73. Controlled form example.

---

## 74. Uncontrolled form example.

---

## 75. Scenario:

Large form with validation.

Best libraries?

---

## 76. Difference:

Formik vs React Hook Form.

---

## 77. Scenario:

Debouncing search input.

How?

---

## 78. What is synthetic event?

---

## 79. Event bubbling in React.

---

## 80. Difference:

preventDefault vs stopPropagation.

---

# 7. Context API + State Management (81–88)

---

## 81. What problem Context API solves?

---

## 82. Scenario:

Prop drilling issue.

Solution?

---

## 83. Difference:

Context API vs Redux.

---

## 84. Scenario:

Global authentication state.

Approach?

---

## 85. What causes all consumers to re-render?

---

## 86. Scenario:

Large app state management.

Redux/Zustand/Recoil?

---

## 87. Difference:

Redux Toolkit vs Redux.

---

## 88. Scenario:

Need caching server state.

Which library?

---

# 8. Routing + Lazy Loading (89–94)

---

## 89. Difference:

BrowserRouter vs HashRouter.

---

## 90. Scenario:

Page refresh causing 404.

Reason?

---

## 91. Coding:

Protected route.

---

## 92. What is lazy loading?

---

## 93. Coding:

React.lazy + Suspense.

---

## 94. Scenario:

Large bundle size.

Optimization techniques?

---

# 9. Production + Performance + Architecture (95–100)

---

## 95. Scenario:

Too many API calls.

Optimization?

---

## 96. Scenario:

Large list rendering slow.

Solution?

---

## 97. What is virtualization/windowing?

---

## 98. Scenario:

React app performance debugging.

Tools?

---

## 99. Scenario:

State updates causing lag.

How debug?

---

## 100. Scenario:

How would you structure a production React application?

Explain folders:

* components
* hooks
* services
* utils
* context
* pages

---

# HIGHLY ASKED OUTPUT QUESTIONS

---

## 1.

```jsx id="6axhmg"
console.log(1);

setState(...);

console.log(2);
```

Execution order?

---

## 2.

```jsx id="g7lyum"
useEffect(() => {
  console.log("A");

  return () => {
    console.log("B");
  };
}, []);
```

Output order?

---

## 3.

```jsx id="k8vv5q"
const [count, setCount] = useState(0);

<button onClick={() => {
  setCount(count + 1);
  setCount(count + 1);
}}>
```

Final value?

---

# HIGHLY ASKED SCENARIO QUESTIONS

---

## Rendering Issues

* unnecessary renders
* infinite loops
* stale closures
* state mutation
* prop drilling

---

## Performance Issues

* large list lag
* repeated API calls
* bundle optimization
* memoization misuse

---

## Real Production Problems

* token expiration
* retry mechanism
* loading states
* race conditions
* optimistic updates

---

# MOST IMPORTANT 25 TO REVISE

1. useState async behavior
2. useEffect lifecycle
3. dependency array
4. cleanup function
5. infinite loops
6. React.memo
7. useMemo
8. useCallback
9. useRef
10. controlled components
11. immutable updates
12. reconciliation
13. key prop
14. conditional rendering
15. Context API
16. prop drilling
17. lazy loading
18. Suspense
19. debouncing
20. virtualization
21. synthetic events
22. event bubbling
23. rendering optimization
24. API handling
25. production folder structure

---

# MOST COMMON REACT CODING QUESTIONS

---

## 1. Debounce Search Input

```jsx id="2m4lg2"
useEffect(() => {
  const timer = setTimeout(() => {
    fetchData(search);
  }, 500);

  return () => clearTimeout(timer);

}, [search]);
```

---

## 2. Toggle Theme Using Context

```jsx id="r9u8c7"
const ThemeContext = createContext();
```

---

## 3. Infinite Scroll

* scroll event
* intersection observer
* pagination

---

## 4. Search Filter

```jsx id="mfpng7"
list.filter(item =>
  item.name.includes(search)
)
```

---

## 5. Dynamic Form Handling

```jsx id="4kzq0y"
setForm({
  ...form,
  [name]: value
});
```

---

# GOLDEN CLIENT ROUND ANSWER STRUCTURE

If asked:
“How did you use React in your project?”

Structure answer:

1. Component architecture
2. State management
3. API integration
4. Routing
5. Authentication
6. Performance optimization
7. Lazy loading
8. Error handling
9. Reusable hooks
10. Production optimizations

This sounds senior-level immediately.
