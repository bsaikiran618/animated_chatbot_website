import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import giphy from "../giphy (1).gif";
import talk from '../talk.webm';

export const PreviousChat = ({chat}) => {
    return (
        <li>
            <div id="previous-chat-div"> 
                <div className="user-query-div">
                    <p className="user-query">{chat.userQuery}</p> 
                </div>

                <div className="big-bubble-right" style={{textAlign:'center'}}><FontAwesomeIcon icon={faUser}/></div>
                <div className="small-bubble-right"></div>

                <div className="video-response-div">
                    <div style={chat.videoResponse ? { display: 'block' } : { display: 'none' }}>
                        <video src={ talk } className="talking-video" controls autoPlay muted
                        />

                        <div className="big-bubble-left" style={{textAlign:'center'}}><FontAwesomeIcon icon={faRobot}/></div>
                        <div className="small-bubble-left"></div>
                    </div>

                    <img src={ giphy } alt="load" className="response-loader"
                    style={!chat.videoResponse ? { display: 'block' } : { display: 'none' }} />
                </div>
                <hr style={{color:'white', width:'98%', position: 'relative', zIndex: '1'}} />
            </div>
        </li>
    );
}