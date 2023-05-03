import "../App.css";
import giphy from "../giphy (1).gif";
import { useNavigate, useParams } from "react-router-dom";

export const Loading = () => {
    const navigate = useNavigate();
    const { userID } = useParams();
    setTimeout(() => {
        if (window.location.href.includes("chatbotload"))
            navigate('../chatbot/' + userID);
        else
            navigate('home');
    }, 1000);
    return (
        <div className="load-div">
            <img src={ giphy } alt="load" style={{width:"150px"}}/>
        </div>
    );
}