import { useEffect, useState } from "react";
import { url } from "../constants/URL";

const ApiCall = () => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        let ignore = false;
       const fetchUsers = async () => {
        
        const res = await fetch(url)
        const users = res.json()
        setUsers(users)
    }
    fetchUsers()
    return () => {
        ignore = true; 
    }

    })
    return(
        <div>
            
        </div>
    )
}
export default ApiCall;