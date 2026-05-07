import React from "react";

const Child = React.memo(({onClick}) => {
    console.log("rendered");
    return <button onClick={onClick}>Click</button>
    
})
export default Child
// everytime onClick gets a new reference this Child Component rerenders, to stop this use useCallback