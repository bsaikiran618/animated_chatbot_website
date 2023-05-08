import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpeechSynthesis } from "react-speech-kit";
import giphy from "../giphy (1).gif";
import talk from '../talk.webm';

export const PreviousChat = ({chat}) => {
    const onEnd = () => {
        console.log("hiii");
        document.getElementById(chat.key).pause();
    }
    const {speak, cancel} = useSpeechSynthesis({onEnd});
    const startSpeaking = (e, msg) => {
        console.log("boloooo");
        speak({ text:msg });
    }
    const stopSpeaking = () => {
        console.log("hello");
        cancel();
    }
    return (
        <li>
            <div id="previous-chat-div"> 
            {
                chat.userQuery && <div>
                    <div className="user-query-div">
                        <p className="user-query">{chat.userQuery}</p> 
                    </div>

                    <div className="big-bubble-right" style={{textAlign:'center'}}><FontAwesomeIcon icon={faUser}/></div>
                    <div className="small-bubble-right"></div>
                </div>
            }
                

                <div className="video-response-div">
                    { 
                        chat.response && <div>
                            <video src={ talk } 
                                id={chat.key}
                                className="talking-video" 
                                onPlay={(e)=>startSpeaking(e, chat.response)}  
                                onPause={()=>stopSpeaking()}
                                autoPlay controls loop/>

                            <div className="big-bubble-left" style={{textAlign:'center'}}><FontAwesomeIcon icon={faRobot}/></div>
                            <div className="small-bubble-left"></div>
                        </div>
                    }

                    {
                        !chat.response && <img src={ giphy } 
                            alt="load" 
                            className="response-loader"
                        />
                    }
                </div>
                <hr style={{color:'white', width:'98%', position: 'relative', zIndex: '1'}} />
            </div>
        </li>
    );
}