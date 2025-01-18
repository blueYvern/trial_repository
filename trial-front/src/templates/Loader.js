import load from "../assets/load.gif"
import "../App.css";

const Loader = () => {
    return (
        <div className="loading-container">
            <div className="loader">
                <img src={load} alt="loading..." />
            </div>
        </div>
    )
}

export default Loader;