import "../App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@mui/material";
import waves from "../wavess.gif";
import {
  faStopCircle,
  faRefresh,
  faPaperPlane,
  faMicrophoneAlt,
  faHome,
  faRobot,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { ChatHistory } from "./ChatHistory";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const Chatbot = () => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    document.title = "Chatbot";
    let chat = [
      {
        key: new Date().getTime(),
        userQuery: "",
        response: "",
      },
    ];
    setChats([...chat]);
    Axios.post(
      "http://localhost:8000/newMessage",
      {
        userID: userID,
        content:"Please greet me with a hello",
        messageHistory: []
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.data.errorMessage) {
          console.log(response.data.errorMessage);
          if(response.data.errorMessage === "User not found!")
            setErrorMessage("User not found!")
          else  
            setErrorMessage("Your current session has been expired! Please sign-up again to start a new session.");
          setOpen(true);
        }
        chat[0].response = response.data.gptResponse;
        setTimeout(() => {
          setChats([...chat]);
        }, 1000);
      })
      .catch((err) => {});
  }, [userID]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const sendMessage = () => {
    let chat = [
      {
        key: new Date().getTime(),
        userQuery: document.getElementById("textarea-id").value,
        response: "",
      },
    ];
    setChats([...chats, ...chat]);

    setTimeout(() => {
      const y =
        document.getElementById("chatbot-main-div").getBoundingClientRect()
          .bottom + window.scrollY;
          console.log(y);
      if (y > 770) {
        window.scroll({
          top: y,
          behavior: "smooth",
        });
      }
    }, 200);

    let messageHistory = [];
    messageHistory.push({role : "user", content : "please greet me with a hello"});
    messageHistory.push({role : "assistant", content : "Hello. how may I assist you today?"});
    for (let item of chats) {
      messageHistory.push({role : "user", content : item.userQuery});
      messageHistory.push({role : "assistant", content : item.response});
    }

    console.log(messageHistory);

    Axios.post(
      "http://localhost:8000/newMessage",
      {
        userID: userID,
        content: document.getElementById('textarea-id').value,
        messageHistory
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.data.errorMessage) {
          console.log(response.data.errorMessage);
          if(response.data.errorMessage === "User not found!")
            setErrorMessage("User not found!")
          else  
            setErrorMessage("Your current session has been expired! Please sign-up again to start a new session.");
          setOpen(true);
        }
        chat[0].response = response.data.gptResponse;
        setChats([...chats, ...chat]);
        setTimeout(() => {
          const y =
            document.getElementById("chatbot-main-div").getBoundingClientRect()
              .bottom + window.scrollY;
          if (y > 770) {
            window.scroll({
              top: y,
              behavior: "smooth",
            });
          }
        }, 100);
      })
      .catch((err) => {});

    resetTranscript();
  };

  const backToHome = () => {
    navigate("../");
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="chatbot-main-div" id="chatbot-main-div">
      <div className="chatbot-header-wrap">
        <div>
          <FontAwesomeIcon
            icon={faHome}
            className="header-icon"
            onClick={backToHome}
            style={{ cursor: "pointer" }}
            title="home"
          />
        </div>
        <div>
          <h5>Audio Visual Conversational Bot</h5>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faRobot}
            className="header-icon"
            title="Hello, I am Audio Visual Conversational Bot!"
          />
        </div>
      </div>
      <ChatHistory chats={chats} />
      <div className="chatbot-footer">
        <img
          src={waves}
          className="listeningImg"
          alt=""
          style={listening ? { display: "block" } : { display: "none" }}
        />
        <div className="chatbot-footer-wrap">
          <div className="chatbot-footer-item">
            <Button
              className="controlBtn"
              variant="contained"
              color="success"
              title="Start"
              onClick={SpeechRecognition.startListening}
            >
              <FontAwesomeIcon icon={faMicrophoneAlt} />
            </Button>
          </div>
          <div className="chatbot-footer-item">
            <Button
              className="controlBtn"
              variant="contained"
              color="error"
              title="Stop"
              onClick={SpeechRecognition.stopListening}
            >
              <FontAwesomeIcon icon={faStopCircle} />
            </Button>
          </div>
          <div className="chatbot-footer-item">
            <Button
              className="controlBtn"
              variant="contained"
              color="secondary"
              title="Reset"
              onClick={resetTranscript}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </Button>
          </div>
          <div className="chatbot-footer-item" style={{ width: "100%" }}>
            <textarea
              type="text"
              style={{ width: "100%", borderRadius: "5px" }}
              value={transcript}
              id="textarea-id"
              readOnly
            />
          </div>
          <div className="chatbot-footer-item">
            <Button
              style={{
                width: "max-content",
                marginTop: "6px",
                borderRadius: "25%/50%",
              }}
              variant="contained"
              color="info"
              onClick={sendMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; Send
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
      >
        <DialogTitle id="dialog-title" style={{ color: "red" }}>
          Oops! <FontAwesomeIcon icon={faSadTear} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="dialog-description"
            style={{ color: "#282c34", margin: "10px" }}
          >
            { errorMessage }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
