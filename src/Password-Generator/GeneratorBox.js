import { useForm } from "react-hook-form"

function GeneratorBox() {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="generatebox">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="passwordkeeper">
                    <label className="password-label">Generated Password</label>
                    <input {...register("password")} className="password-input" />
                </div>
                <div>
                    <label className="password-label">Character length</label>
                    <input {...register('charlength')} type="range" min={12} max={32} className="password-input" />
                </div>
                <div className="toggle-container">
                    <label className="toggle-label">Include Upper Case</label>
                    <label className="switch">
                        <input {...register('includeUpper')} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-container">
                    <label className="toggle-label">Include Lower Case</label>
                    <label className="switch">
                        <input {...register('includeLower')} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="toggle-container">
                    <label className="toggle-label">Include Number</label>
                    <label className="switch">
                        <input {...register('includeNumber')} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>

               <div className="toggle-container">
                    <label className="toggle-label">Include Special Character</label>
                    <label className="switch">
                        <input {...register('includeSymbol')} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                

                <button type="submit" className="submit-btn">Generate Password</button>
            </form>
        </div>
    )
}
export default GeneratorBox