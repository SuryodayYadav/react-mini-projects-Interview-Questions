import { useEffect, useState } from "react"

const ApiCalling = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const url = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
        let ignore = false; 
        async function fetchusers() {
            try {
                const res = await fetch(url)
                if(!res.ok) throw new Error("Failed Request")
                const data = await res.json()
                if(!ignore) setUsers(data)
            } catch (error) {
                if(!ignore) setError(error.message)
            } finally{
                if(!ignore) setLoading(false)
            } 
        }
        fetchusers()
        return () => {
            ignore = true;
        }
    })
    if(loading) return <p>Loading....</p>
    if(error) return <p>Error: {error}</p>
    return users.map(u => <p key={u.id}>
        {u.name}
    </p>)
}
export default ApiCalling