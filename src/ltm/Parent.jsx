import { useCallback, useState } from "react";
import Child from "./Child"

const Parent = () => {
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        console.log("button clicked");
        
    })
    return(
        <Child handleClick={handleClick}/>
    )
}