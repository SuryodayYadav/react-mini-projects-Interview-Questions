import React, { useEffect } from "react"
import { useState } from "react"
import '../App.css'

function InfiniteScrolling() {
    const [count, setCount] = useState(10)
    const [colors, setColors] = useState([])
    useEffect(() => {
        const handleScroll = () => {
            if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
                setCount(prev => prev + 10)
                setColors((prevColor) => [
                    ...prevColor,
                    ...new Array(10).fill("").map(() => getRandomColor())
                ])
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [count])

    useEffect(() => {
        setColors(new Array(count).fill("").map(() => getRandomColor()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRandomColor = () => {
        return `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`
    }
    const elements = []
    for (let i = 0; i < count; i++) {
        elements.push(
            <div className="card" key={i}>
                <span className="number-text">{i + 1}</span>
            </div>
        )
    }
    return (
         <React.Fragment>
            {Array.from({ length: count }).map((_, i) => (
                <div className="card" key={i} style={{ backgroundColor: colors[i] || "burlywood" }}>
                    <span className="number-text">{i + 1}</span>
                </div>
            ))}
        </React.Fragment>
    )
}

export default InfiniteScrolling