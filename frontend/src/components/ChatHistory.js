import { PreviousChat } from './PreviousChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessageBot, faRobot } from "@fortawesome/free-solid-svg-icons";

export const ChatHistory = ({chats}) => {
    return (
        <div className="chat-history-div" id="chat-history-div">
            <ul style={{listStyle:'none'}}>
                {
                    chats && chats.map(
                        chat =>
                            <PreviousChat
                                key = {chat.key}
                                chat = {chat}
                            />
                    )
                }
            </ul>
            <div style={!chats?.length ? { display: 'flex' } : { display: 'none' }} className="initial-message">
                <div>
                    <FontAwesomeIcon icon={faRobot} className='chatbot-icon'/> &nbsp; &nbsp;
                    <h3 style={{display:'inline'}}> Hola, amigo! </h3>
                </div><br/>
                <h5>Record your first message and hit send to get a video reply from the Bot!</h5>
            </div>
        </div>
    );
}