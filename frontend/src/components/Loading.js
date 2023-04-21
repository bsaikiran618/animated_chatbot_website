import "../App.css";
import giphy from "../giphy (1).gif";
import { useNavigate } from "react-router-dom";

export const Loading = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('home');
    }, 1000);
    return (
        <div className="load-div">
            <img src={ giphy } alt="load" style={{width:"150px"}}/>
        </div>
    );
}