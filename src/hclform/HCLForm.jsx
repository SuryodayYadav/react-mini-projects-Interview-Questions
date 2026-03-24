import { useState } from "react"


function HCLForm(){
    const [count, setCount] = useState(0)
    const [user, setUser] = useState("user")
    const handleClick = () => {
        setCount(count + 1)
    }
    return(
        <form>
            <input 
            type="text"
            name="count"
            placeholder="Hello"
            onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={handleClick}>Count</button>
            <div>
                <p>Hello {user}: {count}</p>
            </div>
        </form>
    )
}
export default HCLForm;