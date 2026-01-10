import { useEffect, useState } from "react"

const AdvancedProgressBar = ({step = 10, timer = 200}) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if(value > 100) return;
        const id = setInterval(() => {
            setValue(prev =>  Math.min(prev + step, 100))
            //setValue(prev =>  Math.min(prev + Math.random() * 10, 90)) in case if you ae mapiing this to API call
        }, timer)
        return () => clearInterval(id);
    }, [value, step, timer]) // isLoading
    
//     useEffect(() => {
//   if (!isLoading) {
//     setValue(100);
//     return;
//   }
        return(
            <div>
                <progress value={value} max={100}>
                    <span>{value}%</span>
                </progress>
            </div>
        )
}

export default AdvancedProgressBar