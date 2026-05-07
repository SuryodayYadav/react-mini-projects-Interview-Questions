You don’t need `useCallback` and `useMemo` for everything—using them blindly often makes code *worse*. They’re **performance tools**, not default patterns.

Let’s break them down clearly with **real scenarios**.

---

# 🧠 Core Idea

| Hook          | What it memoizes         |
| ------------- | ------------------------ |
| `useMemo`     | **value (result)**       |
| `useCallback` | **function (reference)** |

---

# 🔹 1) `useMemo` — Memoize Computed Value

## ❌ Problem (expensive calculation runs every render)

```jsx id="u0m8h9"
function App({ numbers }) {
  const sum = numbers.reduce((a, b) => a + b, 0);

  return <div>Sum: {sum}</div>;
}
```

👉 Every render → recalculates sum

---

## ✅ Solution with `useMemo`

```jsx id="2pm1wj"
import { useMemo } from "react";

function App({ numbers }) {
  const sum = useMemo(() => {
    console.log("Calculating...");
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);

  return <div>Sum: {sum}</div>;
}
```

👉 Recalculates **only when `numbers` changes**

---

## 💡 Real Use Cases

* Heavy calculations
* Filtering large lists
* Derived data

---

# 🔹 2) `useCallback` — Memoize Function

## ❌ Problem (function recreated every render)

```jsx id="wtb3cd"
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Clicked");
  };

  return <Child onClick={handleClick} />;
}
```

👉 Every render → new function → child re-renders

---

## ✅ Solution with `useCallback`

```jsx id="lr1b50"
import { useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

👉 Function reference stays same → prevents unnecessary re-renders

---

# 🔥 Important: Why this matters

If child is wrapped in `React.memo`:

```jsx id="u9srrg"
const Child = React.memo(({ onClick }) => {
  console.log("Child render");
  return <button onClick={onClick}>Click</button>;
});
```

👉 Without `useCallback` → child re-renders
👉 With `useCallback` → child skips render

---

# 🧠 Key Difference (Interview Level)

### `useMemo`

```jsx id="xgydjm"
const value = useMemo(() => compute(), [deps]);
```

👉 Returns **computed result**

---

### `useCallback`

```jsx id="d6cvnm"
const fn = useCallback(() => {}, [deps]);
```

👉 Returns **function itself**

---

# ⚠️ Common Mistakes (Very Important)

## ❌ Using everywhere

```jsx id="1kg3o3"
const fn = useCallback(() => console.log("hi"), []);
```

👉 Useless unless:

* Passed to child
* Used in dependency array

---

## ❌ Over-optimization

Memoization has **cost too** (memory + comparison)

---

## ❌ Missing dependencies

```jsx id="z7avzh"
useCallback(() => {
  console.log(count); // ❌ stale value
}, []);
```

---

# 🔥 Real Combined Example

```jsx id="t7u5s7"
function App({ items }) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const handleClick = useCallback((item) => {
    console.log(item);
  }, []);

  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)} />
      {filteredItems.map(item => (
        <Item key={item} item={item} onClick={handleClick} />
      ))}
    </>
  );
}
```

---

# 🧠 Mental Model (Remember This)

* `useMemo` → “Don’t recompute value”
* `useCallback` → “Don’t recreate function”

---

# 🚀 When to use (practical rule)

Use **ONLY if**:

### `useMemo`

* Expensive computation
* Large lists
* Derived state

### `useCallback`

* Passing function to child
* Child is memoized (`React.memo`)
* Prevent unnecessary re-renders

---

# ⚡ Interview One-Liner

> "`useMemo` memoizes computed values, while `useCallback` memoizes function references. Both help avoid unnecessary recalculations and re-renders when dependencies don’t change."

---

# 🔥 If you want next level

I can:

* Show **when NOT to use them (most important)**
* Give **performance debugging scenarios (React Profiler)**
* Or explain **why overusing them can degrade performance**

Just tell me 👍
