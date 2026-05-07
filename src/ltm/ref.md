# 1. How `useRef` Works Internally and Why It’s Useful

`useRef` gives you:

```text id="jlwmm8"
persistent mutable storage
without causing rerender
```

---

# Basic Example

```javascript id="jlwml9"
const ref = useRef(0);
```

React internally roughly creates:

```javascript id="jlwmu3"
{
   current: 0
}
```

and preserves SAME object between renders.

---

# Important

This object reference never changes.

Only:

```javascript id="jlwmt4"
ref.current
```

changes.

---

# Visualization

---

# First Render

```text id="jlwmo6"
ref ───► { current: 0 }
```

---

# After

```javascript id="jlwmd1"
ref.current = 5;
```

Now:

```text id="jlwmb5"
ref ───► { current: 5 }
```

Same object.
Only field changed.

---

# Why No Re-render?

React rerenders when:

* state changes
* props change

But `useRef` mutation:

```javascript id="jlwmg7"
ref.current = 5
```

does NOT notify React.

So:

* component stays same
* no render cycle triggered

---

# Why Useful?

---

# A. Access DOM Elements

```javascript id="jlwmm9"
const inputRef = useRef();

<input ref={inputRef} />
```

---

# B. Store Previous Value

```javascript id="jlwml0"
prev.current = count;
```

---

# C. Store Timer IDs

```javascript id="jlwmu4"
timerRef.current = setInterval(...);
```

---

# D. Avoid Re-rendering Expensive Mutable Data

Example:

* websocket instance
* cached values
* external libraries

---

# E. Stable Mutable Storage Across Renders

Unlike normal variable:

```javascript id="jlwmt5"
let x = 0;
```

which resets every render.

---

# 2. What Is Diffing Algorithm?

Core React Virtual DOM optimization.

---

# Problem

Suppose old UI:

```html id="jlwmo7"
<h1>Hello</h1>
```

New UI:

```html id="jlwmd2"
<h1>Hello World</h1>
```

React should NOT:

* destroy whole DOM
* recreate everything

That would be slow.

---

# Solution → Diffing

React compares:

```text id="jlwmb6"
old virtual DOM
vs
new virtual DOM
```

and finds minimal changes.

This process is:

* reconciliation
* diffing algorithm

---

# Example

---

# Old Tree

```html id="jlwmg8"
<div>
   <h1>Hello</h1>
</div>
```

---

# New Tree

```html id="jlwmm0"
<div>
   <h1>Hello World</h1>
</div>
```

React detects:

* only text changed

Updates only that node.

---

# Why Fast?

React uses heuristics:

* same element type → reuse node
* different type → replace subtree
* keys help identify list items

Complexity roughly optimized to:

```text id="jlwml1"
O(n)
```

instead of expensive generic tree diffing.

---

# Keys Very Important

Without keys:

```javascript id="jlwmu5"
arr.map(item => <li>{item}</li>)
```

React may incorrectly reorder/update items.

---

# Correct

```javascript id="jlwmt6"
arr.map(item =>
   <li key={item.id}>{item.name}</li>
)
```

---

# 3. `onChange` vs `onInput`

In normal HTML:

* different behavior

But in React:

* almost similar for text inputs

---

# `onChange`

React fires on every keystroke.

Example:

```javascript id="jlwmo8"
<input onChange={handle} />
```

Runs immediately while typing.

---

# `onInput`

Also fires while typing.

Less commonly used in React.

---

# Historical Difference

Native DOM:

* `change` fires on blur usually
* `input` fires instantly

React normalized `onChange` behavior to behave more like input event.

---

# Practical React Rule

Mostly use:

```javascript id="jlwmd3"
onChange
```

for form handling.

---

# 4. Controlled Input Without `onChange`

Example:

```javascript id="jlwmb7"
<input value={name} />
```

---

# Warning

React warning:

```text id="jlwmg9"
You provided a `value` prop to a form field without an `onChange` handler.
This will render a read-only field.
```

---

# Why?

Because:

```javascript id="jlwmm1"
value={name}
```

makes input:

* controlled component

React controls value completely.

Without `onChange`:

* user cannot modify input

Input becomes effectively read-only.

---

# Fix

Either:

```javascript id="jlwml2"
onChange={...}
```

OR:

```javascript id="jlwmu6"
readOnly
```

---

# 5. Redux Toolkit vs Redux

---

# Traditional Redux Problems

Very verbose.

Example:

```javascript id="jlwmt7"
const INCREMENT = "INCREMENT";

function reducer(state, action) {
}
```

Need:

* actions
* constants
* reducers
* switch cases
* immutable updates manually

Huge boilerplate.

---

# Redux Toolkit (RTK)

Official modern Redux solution.

Simplifies everything.

---

# Example

```javascript id="jlwmo9"
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: state => state + 1
  }
});
```

Much cleaner.

---

# RTK Advantages

---

# A. Less Boilerplate

Huge simplification.

---

# B. Built-in Immer

Allows:

```javascript id="jlwmd4"
state.count++
```

Looks mutable,
but internally immutable updates generated.

---

# C. Built-in DevTools Setup

---

# D. Better Async Support

Using:

* createAsyncThunk
* RTK Query

---

# E. Official Recommendation

Redux team itself recommends:

```text id="jlwmb8"
Use Redux Toolkit
```

---

# Comparison

| Redux                    | Redux Toolkit    |
| ------------------------ | ---------------- |
| verbose                  | simplified       |
| manual immutable updates | Immer            |
| lots of boilerplate      | concise          |
| harder async             | built-in helpers |

---

# 6. What Is Synthetic Event?

React wrapper around native browser events.

---

# Example

```javascript id="jlwmg0"
<button onClick={handleClick}>
```

Receives:

```javascript id="jlwmm2"
SyntheticEvent
```

NOT raw DOM event directly.

---

# Why React Uses It?

To provide:

* cross-browser consistency
* unified API
* event delegation optimization

---

# Example

```javascript id="jlwml3"
function handle(e) {

   console.log(e.target.value);
}
```

`e` is synthetic event.

---

# Internally

React:

* attaches fewer real listeners
* delegates events efficiently

Better performance.

---

# 7. Global Authentication State — Approach?

Depends on app size.

---

# Small/Medium Apps

Usually:

```text id="jlwmu7"
Context API + useReducer
```

Enough.

---

# Example

```javascript id="jlwmt8"
<AuthContext.Provider>
```

Stores:

* user
* token
* login/logout

---

# Large Apps

Often:

* Redux Toolkit
* Zustand

used.

---

# Important

Auth state often includes:

* JWT token
* refresh token
* user roles
* permissions

---

# Real Production Note

Token usually stored in:

* httpOnly cookies (safer)
  OR
* memory state

Avoid unsafe localStorage for sensitive auth when possible.

---

# 8. Need Caching Server State — Which Library?

Best modern answer:

```text id="jlwmo0"
TanStack Query (React Query)
```

or:

```text id="jlwmd5"
RTK Query
```

---

# Why?

Server state is different from UI state.

Features needed:

* caching
* retries
* deduplication
* background refresh
* stale management
* pagination
* optimistic updates

---

# React Query Example

Using [TanStack Query](https://tanstack.com/query/latest?utm_source=chatgpt.com)

```javascript id="jlwmb9"
const { data } = useQuery({
   queryKey: ["users"],
   queryFn: fetchUsers
});
```

---

# Benefits

✅ Automatic caching
✅ Refetching
✅ Background sync
✅ Loading/error states
✅ Request deduplication
✅ Stale-while-revalidate strategy

---

# Important Modern Architecture Shift

Old apps used Redux for:

* everything

Modern apps separate:

| State Type         | Tool                    |
| ------------------ | ----------------------- |
| UI/client state    | Redux/Zustand/Context   |
| Server/cache state | React Query / RTK Query |

Much cleaner architecture.
