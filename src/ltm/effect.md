# 1. API Calling Multiple Times — Possible Reasons

This is one of the most common React debugging issues.

---

# Reason 1 → Missing Dependency Array in `useEffect`

---

# WRONG

```javascript id="jlwmt3"
useEffect(() => {
  fetchData();
});
```

Runs after EVERY render.

Flow:

```text id="jlwmo5"
Render
↓
useEffect runs
↓
API call
↓
setState
↓
Rerender
↓
useEffect again
↓
Infinite API calls
```

---

# FIX

```javascript id="jlwmd2"
useEffect(() => {
  fetchData();
}, []);
```

Runs only once after initial mount.

---

# Reason 2 → State Update Inside Effect Dependency Loop

---

# WRONG

```javascript id="jlwmb6"
useEffect(() => {
  fetchData();

  setCount(count + 1);

}, [count]);
```

Loop:

```text id="jlwmg7"
count changes
↓
effect runs
↓
setCount
↓
count changes again
↓
effect reruns
```

Infinite calls.

---

# FIX

Carefully manage dependencies.

---

# Reason 3 → React Strict Mode (Very Common)

In React 18 development mode:

```javascript id="jlwmm9"
<React.StrictMode>
```

React intentionally runs effects twice in DEV.

Purpose:

* detect side effects
* detect unsafe cleanup logic

So:

```javascript id="jlwml0"
useEffect(() => {
  fetchData();
}, []);
```

may call API twice in development.

BUT:

* production build calls once

---

# Many Developers Think

```text id="jlwmu3"
"React bug"
```

Actually StrictMode behavior.

---

# Reason 4 → Parent Re-rendering

Parent rerenders child repeatedly.

Example:

```javascript id="jlwmt4"
<Child />
```

If parent state changes frequently:

* child rerenders
* effect may rerun depending on dependencies

---

# Reason 5 → Function/Object Dependency Recreation

---

# WRONG

```javascript id="jlwmo6"
useEffect(() => {
  fetchData();
}, [options]);
```

where:

```javascript id="jlwmd3"
const options = {};
```

New object created every render.

Reference changes every time.

Effect reruns continuously.

---

# FIX

Use:

* `useMemo`
* `useCallback`

---

# Reason 6 → Multiple Component Mounts

Conditional rendering:

```javascript id="jlwmb7"
{show && <User />}
```

Toggling `show`:

* unmounts/remounts component
* effect runs again

---

# 2. Memory Leak in React — Reasons

Memory leak means:

> memory/resources kept alive unnecessarily after component should be cleaned.

---

# Common Reason 1 → Uncleared Timers

---

# WRONG

```javascript id="jlwmg8"
useEffect(() => {

  setInterval(() => {
    console.log("Running");
  }, 1000);

}, []);
```

When component unmounts:

* interval still running

Leak.

---

# FIX

```javascript id="jlwmm0"
useEffect(() => {

  const id = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => clearInterval(id);

}, []);
```

---

# Common Reason 2 → Unremoved Event Listeners

---

# WRONG

```javascript id="jlwml1"
useEffect(() => {

  window.addEventListener("resize", handler);

}, []);
```

Listener survives unmount.

---

# FIX

```javascript id="jlwmu4"
useEffect(() => {

  window.addEventListener("resize", handler);

  return () => {
    window.removeEventListener("resize", handler);
  };

}, []);
```

---

# Common Reason 3 → Pending API Calls

Component unmounted before response arrives.

Then:

```javascript id="jlwmt5"
setState(...)
```

called on destroyed component.

---

# FIX

Abort request.

Example:

```javascript id="jlwmo7"
useEffect(() => {

  const controller = new AbortController();

  fetch(url, {
    signal: controller.signal
  });

  return () => controller.abort();

}, []);
```

---

# Common Reason 4 → WebSocket / Subscription Cleanup Missing

Example:

* socket connections
* Firebase listeners
* RxJS subscriptions

Must unsubscribe on unmount.

---

# Important Clarification

This:

```javascript id="jlwmd4"
setState({...obj})
```

is NOT memory leak.

Because old objects:

* become unreachable
* garbage collected automatically

---

# Real Memory Leak

Leak means:

* something still referenced
* GC cannot free memory

---

# 3. `useEffect` vs `useLayoutEffect`

Very important React rendering lifecycle question.

---

# `useEffect`

Runs:

```text id="jlwmb8"
AFTER browser paint
```

Non-blocking.

---

# Flow

```text id="jlwmg9"
Render
↓
DOM updated
↓
Browser paints UI
↓
useEffect runs
```

---

# Good For

* API calls
* subscriptions
* timers
* logging
* async tasks

Most common hook.

---

# Example

```javascript id="jlwmm1"
useEffect(() => {
  fetchData();
}, []);
```

---

# `useLayoutEffect`

Runs:

```text id="jlwml2"
AFTER DOM update
BUT BEFORE browser paint
```

Synchronous/blocking.

---

# Flow

```text id="jlwmu5"
Render
↓
DOM updated
↓
useLayoutEffect runs
↓
Browser paints
```

---

# Use Case

When you must:

* measure DOM
* change layout before visible paint
* avoid flickering

---

# Example

```javascript id="jlwmt6"
useLayoutEffect(() => {

  const height =
    ref.current.offsetHeight;

}, []);
```

---

# Important Difference

| `useEffect`        | `useLayoutEffect`    |
| ------------------ | -------------------- |
| Async-ish          | Synchronous          |
| After paint        | Before paint         |
| Non-blocking       | Blocks painting      |
| Preferred normally | Rare special cases   |
| Better performance | Can hurt performance |

---

# Why `useLayoutEffect` Can Be Dangerous

Because browser cannot paint until it finishes.

Heavy logic here causes:

* UI lag
* janky rendering

---

# Real Practical Rule

---

# Use `useEffect` by Default

95% of cases.

---

# Use `useLayoutEffect` Only For

* DOM measurements
* scroll positioning
* animations
* preventing flicker

---

# Example Where Flicker Happens

Suppose tooltip position depends on DOM measurement.

Using `useEffect`:

```text id="jlwmo8"
Wrong position flashes briefly
```

Using `useLayoutEffect`:

* measurement happens before paint
* user never sees wrong layout

---

# Final Interview Summary

| Topic                 | Key Point                         |
| --------------------- | --------------------------------- |
| Multiple API calls    | bad dependencies / rerender loops |
| StrictMode double API | dev-only behavior                 |
| Memory leak           | uncleared resources               |
| `useEffect`           | after paint                       |
| `useLayoutEffect`     | before paint                      |
| LayoutEffect usage    | DOM measurement/layout fixes      |

# 1. React Strict Mode — What Is It?

```javascript id="jlwmu6"
<React.StrictMode>
   <App />
</React.StrictMode>
```

Development-only wrapper.

Purpose:

> detect unsafe patterns, side effects, and future compatibility issues.

---

# Important

StrictMode affects:

* development build only
* NOT production

---

# Key Things StrictMode Does

---

# A. Double Invokes Components in DEV

React intentionally rerenders components twice.

Example:

```javascript id="jlwmt7"
function App() {
   console.log("render");
   return <h1>Hello</h1>;
}
```

Console in DEV:

```text id="jlwmo9"
render
render
```

Purpose:

* detect impure rendering
* detect side effects inside render

---

# B. Double Runs `useEffect`

Example:

```javascript id="jlwmd5"
useEffect(() => {
   console.log("effect");
}, []);
```

DEV output:

```text id="jlwmb9"
effect
cleanup
effect
```

Purpose:

* ensure cleanup logic works properly

---

# C. Detects Unsafe Lifecycle Methods

Old class lifecycle warnings:

* componentWillMount
* componentWillReceiveProps

---

# D. Detects Side Effects

Example:

```javascript id="jlwmg0"
setCount(c => c + 1);
```

inside render becomes obvious quickly.

---

# E. Encourages Future Concurrent React Compatibility

StrictMode prepares apps for:

* concurrent rendering
* interruptible rendering
* React future optimizations

---

# Very Important Interview Point

StrictMode simulates:

```text id="jlwmm2"
mount
↓
unmount
↓
mount again
```

to detect cleanup bugs.

---

# 2. Your `ignore = true` Logic

You wrote:

```javascript id="jlwml3"
useEffect(() => {

  let ignore = false;

  const fetchUsers = async () => {

    const res = await fetch(url);
    const users = await res.json();

    setUsers(users);
  };

  fetchUsers();

  return () => {
    ignore = true;
  };

}, []);
```

---

# Problem

You set:

```javascript id="jlwmu7"
ignore = true
```

BUT never CHECK it.

So currently:

* useless variable

---

# Correct Pattern

```javascript id="jlwmt8"
useEffect(() => {

  let ignore = false;

  const fetchUsers = async () => {

    const res = await fetch(url);
    const users = await res.json();

    if (!ignore) {
      setUsers(users);
    }
  };

  fetchUsers();

  return () => {
    ignore = true;
  };

}, []);
```

---

# What Problem Does This Solve?

Suppose:

1. API call started
2. component unmounted
3. response arrives later
4. `setUsers()` executes

Now React warns:

```text id="jlwmo0"
Can't perform a React state update on an unmounted component
```

---

# `ignore` Prevents State Update

After unmount:

```javascript id="jlwmd6"
ignore = true
```

So:

```javascript id="jlwmb0"
if (!ignore)
```

fails.

No state update.

---

# BUT Important

This does NOT abort network request.

It only:

* ignores response handling

Request still running in background.

---

# 3. Real Fetch Abort on Unmount

Proper way:

```javascript id="jlwmg1"
useEffect(() => {

  const controller = new AbortController();

  const fetchUsers = async () => {

    try {

      const res = await fetch(url, {
        signal: controller.signal
      });

      const users = await res.json();

      setUsers(users);

    } catch(err) {

      if (err.name !== "AbortError") {
        console.error(err);
      }
    }
  };

  fetchUsers();

  return () => {
    controller.abort();
  };

}, []);
```

---

# Difference

| ignore flag           | AbortController        |
| --------------------- | ---------------------- |
| ignores response      | cancels actual request |
| request still running | network stopped        |
| partial fix           | proper fix             |

---

# 4. What Problem Does `React.memo` Solve?

`React.memo` solves:

```text id="jlwmm3"
unnecessary component rerenders
```

---

# Example Without Memo

```javascript id="jlwml4"
function Child() {
   console.log("Child render");
   return <h1>Child</h1>;
}
```

Parent rerenders:

```javascript id="jlwmu8"
setCount(count + 1);
```

Child ALSO rerenders.

Even if props unchanged.

---

# Why?

Because parent rerender causes:

* child function executes again

---

# Fix With `React.memo`

```javascript id="jlwmt9"
const Child = React.memo(function Child() {
   console.log("Child render");
   return <h1>Child</h1>;
});
```

Now React compares props.

If props unchanged:

* skip rerender

---

# Important

React.memo uses:

```text id="jlwmo1"
shallow prop comparison
```

(reference equality)

---

# 5. Is React.memo Lazy Loading?

NO.

Completely different concepts.

---

# React.memo

Prevents:

* unnecessary rerenders

Optimization for rendering.

---

# React.lazy

Used for:

* code splitting
* loading component only when needed

---

# Example

```javascript id="jlwmd7"
const UserPage =
   React.lazy(() => import("./UserPage"));
```

Component JS downloaded only when required.

---

# React.memo vs React.lazy

| React.memo                  | React.lazy          |
| --------------------------- | ------------------- |
| Prevent rerenders           | Lazy load code      |
| Runtime render optimization | Bundle optimization |
| Props comparison            | Dynamic import      |

---

# 6. Child Re-rendering Unnecessarily — Fix?

You said:

> pass `useCallback`

Partially correct.

But important nuance:
`useCallback` ALONE does NOT stop rerenders.

Usually combination needed:

```text id="jlwmb1"
React.memo
+
useCallback
```

---

# Problem Example

---

# Parent

```javascript id="jlwmg2"
function Parent() {

  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return <Child onClick={handleClick} />;
}
```

---

# Child

```javascript id="jlwmm4"
const Child = React.memo(({ onClick }) => {
  console.log("child render");
});
```

---

# Still Rerenders!

Why?

Because:

```javascript id="jlwml5"
const handleClick = () => {}
```

creates NEW function every render.

New reference.

React.memo sees:

```text id="jlwmu9"
oldFn !== newFn
```

So rerender happens.

---

# Fix Using `useCallback`

```javascript id="jlwmt0"
const handleClick = useCallback(() => {
   console.log("clicked");
}, []);
```

Now same function reference reused.

React.memo can skip rerender.

---

# Final Flow

```text id="jlwmo2"
Parent rerender
↓
same callback reference
↓
same props
↓
React.memo skips child rerender
```

---

# Important Interview Trap

Do NOT blindly use:

* React.memo
* useCallback

They also have cost:

* memory
* dependency tracking
* comparisons

Use only when:

* rerenders are expensive
* performance issue exists

---

# Final Interview Summary

| Concept                 | Purpose                        |
| ----------------------- | ------------------------------ |
| StrictMode              | detect unsafe side effects     |
| ignore flag             | prevent setState after unmount |
| AbortController         | cancel actual request          |
| React.memo              | prevent unnecessary rerender   |
| React.lazy              | lazy component loading         |
| useCallback             | preserve function reference    |
| Best optimization combo | React.memo + useCallback       |
