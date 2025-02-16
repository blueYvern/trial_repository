import load from "../assets/load.gif"
import "./templates.css";

const Loader = () => {
    return (
        <div className="loading-container">
            <div>
                <img src={load} alt="loading..." />
            </div>
        </div>
    )
}

export default Loader;