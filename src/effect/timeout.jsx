import { useEffect, useLayoutEffect, useState } from "react";

function TimeOut() {
  const obj = { a: 1 };
  const [user, setUser] = useState({ name: "Peter" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Time Out Interval");
    }, 2000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    console.log("runing obj");
  }, [obj]);
  useEffect(() => {
    setUser({ name: "John" });
  }, []);
  useEffect(() => {
    document.body.style.background = "white";
  }, []);
  useLayoutEffect(() => {
    document.body.style.background = "white";
  }, []);
  return (
    <div>
      Time Out Functionality Check: Name checking {user.name}
      <button
        onClick={() => {
          setCount(count + 1);
          setCount(count + 1);
        }}
      >Button</button>
      <p>{count}</p>
    </div>
  );
}

export default TimeOut;
