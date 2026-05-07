Your example actually hits several deep React concepts together:

* render cycle
* infinite re-render
* stale closures
* batching
* functional updates
* async scheduling

Let’s break it carefully.

---

# Your Code

```javascript id="8m6rha"
function OutputBasedComp() {
  const [count, setCount] = useState(0);

  setCount(c => c + 1);

  useEffect(() => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }, []);

  console.log(count);

  return <h1>{count}</h1>;
}
```

---

# 1. Why Can't We Directly Update State in Normal Render Body?

This line is the problem:

```javascript id="f7mdx4"
setCount(c => c + 1);
```

inside component body.

---

# What Happens Internally?

React component function executes during render.

Like:

```text id="d6fx3z"
Render component
↓
setCount()
↓
State changes
↓
Render again
↓
setCount()
↓
Render again
↓
Infinite loop
```

---

# Because Render Must Be Pure

React expects component function to behave like:

```javascript id="yjjlwm"
input(props, state) => UI
```

NO side effects during render.

---

# State Updates Are Side Effects

These should happen inside:

* event handlers
* useEffect
* callbacks
* async operations

NOT during rendering.

---

# So This Causes

```text id="jjlwm3"
Too many re-renders
```

React stops app to prevent crash.

---

# Correct Places

---

## Event Handler

```javascript id="qjlwm9"
<button onClick={() => setCount(c => c + 1)}>
```

---

## useEffect

```javascript id="hjlwm4"
useEffect(() => {
  setCount(c => c + 1);
}, []);
```

---

# 2. Difference Between

---

# A. Functional Update

```javascript id="1jlwmz"
setCount(c => c + 1);
```

---

# B. Normal Update

```javascript id="jlwm0a"
setCount(count + 1);
```

Huge difference.

---

# `setCount(count + 1)`

Uses current render's value of `count`.

Suppose:

```javascript id="jlwm9m"
count = 0
```

Then:

```javascript id="jlwmf6"
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

becomes:

```javascript id="jlwm6u"
setCount(1);
setCount(1);
setCount(1);
```

All same value.

Final state:

```text id="jlwmp1"
1
```

NOT 3.

---

# Because React Batches Updates

React groups multiple updates together.

All updates see SAME stale value from current render.

---

# Functional Update

```javascript id="jlwmv8"
setCount(c => c + 1);
```

Now React uses latest updated value internally.

---

# Flow

```text id="jlwmn0"
Initial: 0

1st update:
0 → 1

2nd update:
1 → 2

3rd update:
2 → 3
```

Final:

```text id="jlwmh1"
3
```

---

# Golden Rule

Use:

```javascript id="jlwmc9"
setState(prev => ...)
```

when:

* next state depends on previous state

---

# Example

Correct:

```javascript id="jlwmu7"
setCount(c => c + 1);
```

Wrong/stale-prone:

```javascript id="jlwmw5"
setCount(count + 1);
```

especially inside:

* loops
* async
* intervals
* multiple updates

---

# 3. Is `setState` Synchronous or Asynchronous?

Tricky interview question.

Correct answer:

```text id="jlwm3x"
State updates are scheduled and batched.
```

NOT simply sync or async.

---

# What Happens?

```javascript id="jlwmk0"
setCount(5);

console.log(count);
```

You still see OLD value.

Because React:

* schedules update
* rerenders later

---

# Example

```javascript id="jlwml2"
const [count, setCount] = useState(0);

function test() {
  setCount(1);

  console.log(count);
}
```

Console:

```text id="jlwmt4"
0
```

not 1.

---

# Why?

Because current render snapshot is immutable.

React prepares:

* next render separately

---

# React Batching

React batches multiple updates for performance.

Example:

```javascript id="jlwmm4"
setCount(1);
setName("John");
setAge(20);
```

Instead of:

* 3 renders

React usually does:

* 1 render

Huge optimization.

---

# React 18 Automatic Batching

Now batching even happens in:

* promises
* setTimeout
* async code

Earlier only event handlers were batched.

---

# Your useEffect Example

```javascript id="jlwmz5"
useEffect(() => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}, []);
```

Suppose initial:

```text id="jlwmm9"
count = 0
```

All three become:

```javascript id="jlwmt0"
setCount(1);
setCount(1);
setCount(1);
```

Final count:

```text id="jlwmy1"
1
```

NOT 3.

---

# If You Use Functional Updates

```javascript id="jlwmd3"
useEffect(() => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
}, []);
```

Now final:

```text id="jlwme5"
3
```

because each update gets latest value.

---

# 4. Your `typeof elem`

```javascript id="jlwmb7"
const elem = <h1>Hello</h1>;
```

JSX compiles roughly to:

```javascript id="jlwmg9"
React.createElement(...)
```

So:

```javascript id="jlwma2"
typeof elem
```

returns:

```text id="jlwmp8"
object
```

Because React element is plain JS object.

---

# 5. Another Issue in Your Return

```javascript id="jlwmc1"
return arr.map((x) => <h1>{x}={count}</h1>);
```

Missing:

```javascript id="jlwmu4"
key
```

React warning:

```text id="jlwmx7"
Each child should have unique key
```

Correct:

```javascript id="jlwmq3"
return arr.map((x) =>
  <h1 key={x}>{x}={count}</h1>
);
```

---

# Final Core Understanding

---

# React Render Cycle

```text id="jlwmh6"
State change
↓
React schedules update
↓
Component reruns
↓
New JSX generated
↓
Virtual DOM diff
↓
Real DOM update
```

---

# Biggest Mistake Beginners Make

Thinking:

```javascript id="jlwmg1"
setCount(5);
console.log(count);
```

should immediately print 5.

But React state updates are:

* queued
* batched
* applied in next render cycle

Not immediate mutation like normal variable assignment.
This is one of the most important conceptual misunderstandings in React.

You are NOT actually changing the `const` variable.

That’s the key.

---

# Your Code

```javascript id="jlwmk4"
const [user, setUser] = useState("Maya");

setUser("Naya");
```

You may think:

```text id="jlwmc7"
const variable changed from Maya → Naya
```

But that is NOT what happens.

---

# `const` Means

```javascript id="jlwmf1"
const x = 10;
```

means:

```text id="jlwmp9"
this variable binding cannot be reassigned
```

NOT:

* object immutable
* React immutable magic

---

# React State Works Differently

Each render creates NEW variables.

This is the real secret.

---

# Think Like This

Render 1:

```javascript id="jlwmu3"
const user = "Maya";
```

After:

```javascript id="jlwmy5"
setUser("Naya");
```

React schedules NEW render.

---

# Next Render Happens

Render 2:

```javascript id="jlwmt7"
const user = "Naya";
```

The old variable was NOT modified.

A completely NEW render happened with NEW variables.

---

# Extremely Important Mental Model

React components are functions.

Every render:

* component function executes again
* all variables recreated

---

# Visualization

---

## First Render

```javascript id="jlwm0d"
function Component() {

  const user = "Maya";

}
```

---

## After setUser("Naya")

React reruns component:

```javascript id="jlwma9"
function Component() {

  const user = "Naya";

}
```

NOT same variable updated.

Entire function reran.

---

# So State Lives WHERE?

NOT inside local variable.

State actually lives:

* inside React internals
* outside component function

---

# Simplified Internal React Idea

React roughly stores:

```javascript id="jlwmg2"
[
  "Maya"
]
```

When:

```javascript id="jlwmb4"
setUser("Naya")
```

React internally changes stored value:

```javascript id="jlwmd6"
[
  "Naya"
]
```

Then reruns component.

---

# `useState()` Just Gives Snapshot

```javascript id="jlwme8"
const [user, setUser] = useState(...)
```

means:

```text id="jlwmm1"
Give me current state snapshot for THIS render
```

---

# Important Consequence

This explains why:

```javascript id="jlwml4"
setUser("Naya");

console.log(user);
```

still prints:

```text id="jlwmu6"
Maya
```

Because current render snapshot is fixed/immutable.

New value appears only in NEXT render.

---

# Another Way to Think

---

# WRONG Mental Model

```text id="jlwmt9"
Variable itself changes
```

---

# CORRECT Mental Model

```text id="jlwmo2"
React stores state separately
↓
setState updates React storage
↓
React reruns component
↓
New render gets new snapshot
```

---

# Why React Does This?

Because immutable render snapshots:

* make rendering predictable
* enable batching
* improve optimization
* avoid race conditions

---

# Similar Example

Imagine:

```javascript id="jlwmp4"
function test(name) {
  console.log(name);
}

test("Maya");
test("Naya");
```

Each function call gets new local variable.

React renders behave similarly.

---

# Final Key Insight

This line:

```javascript id="jlwmu0"
const [user, setUser]
```

does NOT mean:

```text id="jlwme3"
mutable variable
```

It means:

```text id="jlwmy7"
current render's immutable snapshot
+
function to request future update
```

That distinction is the heart of React state management.
This is one of the MOST important React concepts.

Most “UI not updating” bugs come from this.

---

# 1. State Mutation vs Immutable Updates

---

# State Mutation (Wrong)

You directly modify existing object/array.

Example:

```javascript id="jlwmf8"
const [user, setUser] = useState({
  name: "Maya",
  age: 20
});

user.name = "Naya";

setUser(user);
```

This is mutation.

---

# Why?

Because same object reference is being modified.

Memory visualization:

```text id="jlwmp2"
user ──► { name: "Maya" }

modify same object

user ──► { name: "Naya" }
```

Object identity/reference remains SAME.

---

# Immutable Update (Correct)

Create NEW object.

```javascript id="jlwmy9"
setUser({
  ...user,
  name: "Naya"
});
```

Now:

```text id="jlwma1"
OLD object → unchanged

NEW object → created
```

New reference created.

---

# 2. Why UI Sometimes Does NOT Re-render?

Because React mainly checks:

```text id="jlwme4"
reference equality
```

NOT deep object comparison.

---

# React Does Something Like

```javascript id="jlwmo6"
if (oldState === newState) {
   skip rerender
}
```

---

# Mutation Problem

Example:

```javascript id="jlwmt8"
const obj = { name: "Maya" };

obj.name = "Naya";

console.log(obj === obj);
```

Still:

```text id="jlwmu1"
true
```

Reference did not change.

So React thinks:

```text id="jlwmd5"
"Nothing changed"
```

and may skip updates.

---

# Real Example

---

# WRONG

```javascript id="jlwmb8"
const [user, setUser] = useState({
  name: "Maya"
});

function update() {
  user.name = "Naya";

  setUser(user);
}
```

Problem:

* same object reference
* React optimization may skip rerender

---

# CORRECT

```javascript id="jlwmg0"
function update() {

  setUser({
    ...user,
    name: "Naya"
  });

}
```

Now:

* new object created
* reference changes
* React rerenders

---

# 3. Why React Uses Reference Comparison?

Because deep comparison is expensive.

Imagine huge nested objects:

```javascript id="jlwmm2"
{
  users: [...10000 items...]
}
```

Deep compare every render:

* very slow

Reference comparison:

```javascript id="jlwml5"
oldRef === newRef
```

Very fast.

---

# 4. Arrays Also Same Problem

---

# WRONG

```javascript id="jlwmu7"
const [arr, setArr] = useState([1,2,3]);

arr.push(4);

setArr(arr);
```

Mutated same array.

---

# CORRECT

```javascript id="jlwmt0"
setArr([...arr, 4]);
```

Creates new array reference.

---

# 5. Important React Philosophy

React prefers:

```text id="jlwmo3"
immutable state updates
```

because it enables:

* fast reconciliation
* predictable rendering
* memoization
* optimization
* time-travel debugging

---

# 6. Nested Object Problem

Common interview question.

---

# WRONG

```javascript id="jlwmp5"
user.address.city = "Delhi";

setUser(user);
```

Still mutation.

---

# CORRECT

```javascript id="jlwmu9"
setUser({
  ...user,
  address: {
    ...user.address,
    city: "Delhi"
  }
});
```

Every changed level needs new reference.

---

# 7. Important Clarification

Sometimes mutation STILL appears to rerender.

Example:

```javascript id="jlwma2"
user.name = "Naya";

setUser({...user});
```

Works because:

* spread creates new top-level object

But direct mutation before that is still dangerous:

* debugging issues
* stale references
* unexpected side effects

---

# 8. Relation to React.memo / PureComponent

These rely heavily on reference equality.

Mutation breaks optimization.

Example:

```javascript id="jlwme5"
<Child user={user} />
```

If same reference passed:

* child may skip rerender

even if internal fields changed.

---

# Interview-Level Summary

| Mutation                 | Immutable Update   |
| ------------------------ | ------------------ |
| Modifies existing object | Creates new object |
| Same reference           | New reference      |
| React may skip rerender  | React rerenders    |
| Dangerous                | Recommended        |
| Hard debugging           | Predictable        |

---

# Golden Rule

Never directly mutate React state.

Avoid:

```javascript id="jlwmo7"
obj.x = 1
arr.push()
arr.splice()
```

Prefer:

```javascript id="jlwmd9"
{...obj}
[...arr]
map()
filter()
concat()
```

---

# Core Reason UI Doesn't Re-render

Most common answer:

```text id="jlwmb1"
Because state object reference did not change.
React uses shallow/reference comparison.
```

Excellent question.
You’re now thinking beyond “React rules” and asking:

> “Why does React intentionally create new objects every update? Isn’t that memory expensive?”

That’s exactly the right systems-level question.

And the answer is:

> React trades small short-term memory allocations for massive rendering simplicity and performance optimizations.

Let’s break this properly.

---

# 1. Multiple `useState` vs Single Object State

---

# Option A — Multiple Independent States

```javascript id="jlwmq5"
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [city, setCity] = useState("");
```

---

# Option B — Single Object State

```javascript id="jlwmm6"
const [user, setUser] = useState({
  name: "",
  age: 0,
  city: ""
});
```

---

# Which Is Better?

Depends on relationship between states.

---

# Use Multiple `useState` When States Are Independent

Example:

```javascript id="jlwma4"
const [darkMode, setDarkMode] = useState(false);
const [count, setCount] = useState(0);
```

No logical relation.

Separate states cleaner.

---

# Use Single Object When Values Belong Together

Example:

```javascript id="jlwmy0"
{
  name,
  email,
  address
}
```

All represent one entity:

* user form
* product
* profile

Grouping makes sense.

---

# Real Production Rule

---

# Independent UI Flags

Prefer:

```javascript id="jlwmb2"
multiple useState
```

---

# Structured Domain Data

Prefer:

```javascript id="jlwmu5"
single object
```

---

# 2. Your Main Question

You asked:

> “Every update creates new object reference. Isn’t that memory loss?”

Very important:
This is NOT memory leak.

---

# Example

```javascript id="jlwmt1"
setUser({
  ...user,
  name: "Naya"
});
```

New object created.

Old object becomes:

```text id="jlwme6"
unreferenced
```

---

# JavaScript Garbage Collector Handles It

Once old object has no references:

```text id="jlwmo8"
GC removes it automatically
```

Memory gets reclaimed.

---

# Visualization

---

## Before Update

```text id="jlwmd0"
user ───► Object A
```

---

## After Update

```javascript id="jlwmb3"
setUser({
  ...user,
  name: "Naya"
});
```

Now:

```text id="jlwmg5"
user ───► Object B

Object A → unreachable
```

Garbage collector later deletes Object A.

---

# So Is This Expensive?

Technically:

* yes, new allocations happen

BUT:

* modern JS engines are heavily optimized for short-lived objects

Engines like:

* V8 (Chrome/Node.js)

are EXTREMELY good at:

* allocating small objects
* cleaning temporary memory

This is cheap.

---

# Why React Still Prefers Immutability?

Because it unlocks HUGE optimizations.

---

# 3. Reference Equality Is SUPER Fast

React can do:

```javascript id="jlwmm7"
oldUser === newUser
```

O(1) comparison.

Instead of:

```text id="jlwml8"
deep compare every field
```

which is expensive.

---

# 4. Immutable Updates Enable Efficient Rendering

Features depending on immutability:

* React.memo
* PureComponent
* useMemo
* useCallback
* Redux optimizations
* Virtual DOM diffing

All rely on reference comparison.

---

# 5. Mutation Actually Causes WORSE Problems

If React allowed mutation-heavy approach:

```javascript id="jlwmu0"
user.name = "Naya";
```

React would need:

* deep tracking
* dirty flags
* observers everywhere

Much more complex and slower.

---

# 6. React Chose Functional Immutable Architecture

Tradeoff:

| Small Memory Allocation | Massive Simplicity |
| ----------------------- | ------------------ |
| temporary objects       | fast comparisons   |
| GC cleanup              | predictable UI     |
| immutable snapshots     | easier debugging   |

This tradeoff is usually worth it.

---

# 7. Important Clarification

This:

```javascript id="jlwmt2"
setUser({...user})
```

does NOT mean:

* whole app memory duplicated

Only shallow copy happens.

---

# Example

```javascript id="jlwmo4"
const user = {
  name: "Maya",
  address: {
    city: "Delhi"
  }
};
```

Spread:

```javascript id="jlwmd1"
{
  ...user
}
```

creates:

* new top-level object only

Nested objects still shared.

---

# Visualization

```text id="jlwmb5"
NEW user object
   ↓
same address object reference
```

This is called:

* shallow copy

Not deep cloning entire structure.

---

# 8. When Object State Becomes Problematic

Large deeply nested state:

```javascript id="jlwmg6"
{
  user: {
    address: {
      city: ...
    }
  }
}
```

Updates become messy:

```javascript id="jlwmm8"
setState({
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "Mumbai"
    }
  }
});
```

Then:

* split state
  OR
* useReducer
  OR
* Zustand/Redux

becomes better.

---

# 9. React Is Optimized for Frequent Small Allocations

Modern JS runtimes use:

* generational garbage collection

Meaning:

* short-lived objects cleaned very efficiently

React architecture depends on this heavily.

So:

```text id="jlwml9"
new object creation is usually cheaper
than deep mutation tracking
```

---

# Final Practical Recommendation

---

# Use Multiple `useState`

When:

* unrelated values
* simpler updates
* independent rerenders

---

# Use Single Object

When:

* logically grouped data
* forms/entities
* APIs/domain models

---

# Most Important Understanding

React does NOT mutate UI state directly.

It works using:

```text id="jlwmu2"
immutable snapshots
↓
new references
↓
fast comparison
↓
efficient rerendering
```

And old objects are cleaned automatically by JavaScript garbage collection, so normally this does NOT create memory leaks.
