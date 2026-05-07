import { useEffect, useState } from "react";

function OutputBasedComp() {
  const elem = <h1>Hello</h1>;
  console.log(typeof elem, "elemcheckinh");
  const arr = [1, 2, 3];
  const [count, setCount] = useState(0);
  const[user, setUser] = useState({
    name: "A"
  })
 // setCount(c => c + 1)
useEffect(() => {
  setCount(c => c + 1); // 1
  setCount(count + 1); // 1
  setCount(c =>  c + 1);
  setUser({
    age: 25
  })
   // 2
}, [])
useEffect(() => {
  return () => {
    console.log("cleanup");
  };
}, []);
useEffect(() => {
  console.log("A");

  return () => {
    console.log("B");
  };
}, []);

  console.log(count);// 2
  console.log(user);// 2
 

  return arr.map((x) => <h1>{x}={count}</h1>);
}
export default OutputBasedComp;
