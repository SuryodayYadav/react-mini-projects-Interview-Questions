import React, { useEffect } from "react"
import { useState } from "react"
import '../App.css'

function InfiniteScrolling(){
    const [count, setCount] = useState(10)
    useEffect(() => {
        const handleScroll = () => {
            if(Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight){
                setCount(prev => prev + 10)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [count])
    const elements = []
    for(let i=0; i<count; i++){
        elements.push(
            <div className="card" key={i}>
               <span className="number-text">{i+1}</span> 
            </div>
        )
    }
    return(
        <React.Fragment>
            {elements}
        </React.Fragment>
    )
}

export default InfiniteScrolling