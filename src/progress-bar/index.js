import { useEffect, useState } from "react";

const ProressBar = () => {
    const [currValue, setCurrValue] = useState(0)

    useEffect(() => {
        const id =  setTimeout(() => {
            setCurrValue(prev => prev + 10)
        }, 200)
        return () => clearTimeout(id)
    }, [currValue])
    
    return <div>
        <input 
        type="range"
        name="range"
        value={currValue}
        aria-label="Loading Progess"
        />
    </div>;
}

export default ProressBar;