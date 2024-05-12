import React, { useRef, useState } from "react"
import '../App.css'
function OtpInput(){
    const [otp, setOtp] = useState(["", "", "", ""])
    const inputRefs = useRef([])
    const handleChange = (index, value) => {
        const newOtp = [...otp]
        newOtp[index] = value
        if(value && index < otp.length - 1){
            inputRefs.current[index+1].focus()
        }
        setOtp(newOtp)
    }
    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && index > 0 && !otp[index]){
            const newOtp = [...otp]
            newOtp[index-1] = ""
            inputRefs.current[index-1].focus()
            setOtp(newOtp)
        }
    }   
    return(
        <div className="container">
            <h2>Otp Verification</h2>
            <p>Enter the 6-digit Otp you have recieved</p>
            <div className="otp-input">
                {otp.map((digit, index) => {
                    return(
                        <input 
                        key={index}
                        className="otp-index"
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        onChange={(e) => handleChange(index, e.target.value)}
                        autoFocus={index === 0}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    )
                })}
            </div>
        </div>
    )

}

export default OtpInput