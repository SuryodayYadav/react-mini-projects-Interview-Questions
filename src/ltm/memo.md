# 1. Purpose of `useCallback`

```javascript id="jlwmg3"
const fn = useCallback(() => {
  console.log("Hi");
}, []);
```

Purpose:

> memoize function reference between renders.

---

# Without `useCallback`

```javascript id="jlwmm5"
const fn = () => {
   console.log("Hi");
};
```

Every render creates:

* NEW function object
* NEW reference

---

# Important

Even if function body same:

```javascript id="jlwml6"
() => console.log("Hi")
```

JavaScript creates new function object every render.

So:

```javascript id="jlwmu0"
oldFn === newFn
```

becomes:

```text id="jlwmt1"
false
```

---

# `useCallback` Fixes This

```javascript id="jlwmo3"
const fn = useCallback(() => {
  console.log("Hi");
}, []);
```

Now React stores same function reference.

---

# Visualization

---

# Without `useCallback`

Render 1:

```text id="jlwmd8"
fn -> Function A
```

Render 2:

```text id="jlwmb2"
fn -> Function B
```

Different reference.

---

# With `useCallback`

Render 1:

```text id="jlwmg4"
fn -> Function A
```

Render 2:

```text id="jlwmm6"
fn -> Function A
```

Same reference reused.

---

# Why Is This Useful?

Mainly for:

* preventing child rerenders
* dependency stability
* optimization

---

# 2. Function Prop Causing Child Re-renders

Very common interview scenario.

---

# Problem

---

## Parent

```javascript id="jlwml7"
function Parent() {

  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <Child onClick={handleClick} />
  );
}
```

---

## Child

```javascript id="jlwmu1"
const Child = React.memo(({ onClick }) => {

  console.log("Child render");

  return <button onClick={onClick}>Click</button>;
});
```

---

# Problem

Whenever Parent rerenders:

* new `handleClick` created
* prop reference changes
* Child rerenders

Even though logic same.

---

# Solution

Use `useCallback`.

```javascript id="jlwmt2"
const handleClick = useCallback(() => {
   console.log("clicked");
}, []);
```

Now:

* same function reference
* React.memo can skip rerender

---

# Important Interview Insight

`useCallback` alone does NOT prevent rerender.

Usually requires:

```text id="jlwmo4"
React.memo + useCallback
```

together.

---

# 3. `React.memo` vs `PureComponent`

Very common comparison.

---

# `React.memo`

Used for:

* functional components

---

Example:

```javascript id="jlwmd9"
const Child = React.memo(function Child(props) {
   return <h1>Hello</h1>;
});
```

---

# `PureComponent`

Used for:

* class components

---

Example:

```javascript id="jlwmb3"
class Child extends React.PureComponent {

   render() {
      return <h1>Hello</h1>;
   }
}
```

---

# Both Do Similar Thing

They perform:

```text id="jlwmg5"
shallow prop/state comparison
```

If unchanged:

* skip rerender

---

# Difference

| React.memo            | PureComponent     |
| --------------------- | ----------------- |
| Functional components | Class components  |
| HOC wrapper           | Class inheritance |
| Modern React          | Older class React |

---

# Important

Both use:

* shallow comparison
* reference equality

Mutation breaks optimization.

---

# 4. Need Persistent Mutable Value Without Re-render — Which Hook?

Answer:

```text id="jlwmm7"
useRef
```

---

# Example

```javascript id="jlwml8"
const countRef = useRef(0);
```

---

# Important Properties

`useRef`:

* persists across renders
* mutable
* changing it does NOT rerender component

---

# Example

```javascript id="jlwmu2"
countRef.current++;
```

UI does NOT rerender.

---

# Why Useful?

For:

* DOM refs
* previous values
* timers
* mutable caches
* avoiding rerenders

---

# Difference From `useState`

| useState              | useRef          |
| --------------------- | --------------- |
| rerenders UI          | no rerender     |
| reactive              | mutable storage |
| triggers render cycle | does not        |

---

# 5. Store Previous Value — How?

Classic `useRef` use case.

---

# Example

```javascript id="jlwmt3"
function App() {

  const [count, setCount] = useState(0);

  const prevCount = useRef();

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <h1>Current: {count}</h1>
      <h2>Previous: {prevCount.current}</h2>

      <button onClick={() =>
        setCount(c => c + 1)
      }>
        Increment
      </button>
    </>
  );
}
```

---

# How It Works

---

# Render 1

```text id="jlwmo5"
count = 0
prev = undefined
```

Effect runs after render:

```javascript id="jlwmd0"
prevCount.current = 0
```

---

# Render 2

```text id="jlwmb4"
count = 1
prev = 0
```

Effect updates again afterward.

---

# Why `useRef` Perfect Here?

Because:

* value persists
* updating ref does not rerender
* previous snapshot maintained

---

# Important Internal Difference

`useRef` object itself stays same:

```javascript id="jlwmg6"
const ref = {
   current: value
}
```

React preserves same object between renders.

Only `.current` changes.

---

# Final Interview Summary

| Concept                | Purpose                           |
| ---------------------- | --------------------------------- |
| useCallback            | memoize function reference        |
| Function prop rerender | useCallback + React.memo          |
| React.memo             | functional component optimization |
| PureComponent          | class component optimization      |
| useRef                 | persistent mutable value          |
| useRef update          | no rerender                       |
| previous value storage | useRef + useEffect                |
