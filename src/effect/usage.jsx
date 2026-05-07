import { useEffect, useState } from "react";

function Usage(){
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(cnt => cnt + 1);
        setCount(count + 1);
        setCount(count + 1);
    }, [count])
    return(
        <div>
            <p>Count: {count}</p>
        </div>
    )
}

export default Usage;