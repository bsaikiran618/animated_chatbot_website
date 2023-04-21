import hello from "../hello.gif";
import { Button, MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import "../App.css";
import { useState } from "react";
import { MyTextField } from "./MyTextField";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { DocumentList } from "./DocumentList";
import {
  faArrowCircleRight,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Home = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: {
      error: false,
      errorMessage: "First Name is mandatory!",
    },
    middleName: {
      error: false,
      errorMessage: "Middle Name is mandatory!",
    },
    lastName: {
      error: false,
      errorMessage: "Last Name is mandatory!",
    },
    email: {
      error: false,
      errorMessage: "Email Address is mandatory!",
    },
    phone: {
      error: false,
      errorMessage: "Phone Number is mandatory!",
    },
    dob: {
      error: false,
      errorMessage: "Date of Birth is mandatory!",
    },
    gender: {
      error: false,
      errorMessage: "Gender is mandatory!",
    },
    city: {
      error: false,
      errorMessage: "City is mandatory!",
    },
    documents: {
      error: false,
      errorMessage: "Documents is mandatory!",
    },
  });

  function submitForm(e) {
    e.preventDefault();
    // Axios.get().then(response => {
    // });
    const formData = new FormData();

    console.log("File: ", files[0]);
    formData.append("document1", files[0]);
    const otherData = JSON.parse(JSON.stringify(data));
    otherData.document1FilePath = files[0].name;
    formData.append("otherData", JSON.stringify(otherData));

    Axios.post("http://localhost:8000/submitForm", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    //navigate('../chatbot');
  }

  function updateField(e) {
    if (!e.target.id) e.target.id = "gender";

    const newData = { ...data };
    if (e.target.id === "documents") newData[e.target.id] = e.target.files;
    else newData[e.target.id] = e.target.value;

    console.log(data);
    setData(newData);
  }

  function updateDocuments(e) {
    const updatedFiles = [...files, ...e.target.files];
    setFiles(updatedFiles);
    console.log("files now: ", updatedFiles);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={hello} className="App-logo" alt="logo" />
          <h1 className="welcome-txt"> Welcome!! </h1>
        </div>
        <h2 className="bot-txt"> Audio Visual Conversational Bot </h2>
        <h6 className="one-step-away-text">
          {" "}
          You are just one step away from conversating with the bot!!{" "}
        </h6>
        <div>
          <p className="fill-in-text">Fill in your details-</p>
          <form onSubmit={(e) => submitForm(e)}>
            <Row className="mb-3 form-row">
              <Col className="form-column">
                <MyTextField
                  label="First Name"
                  value={data.firstName || ""}
                  className="form-text-field"
                  onChange={(e) => updateField(e)}
                  id="firstName"
                  error={formErrors.firstName.error}
                  helperText={
                    formErrors.firstName.error &&
                    formErrors.firstName.errorMessage
                  }
                  required
                />
              </Col>
              <Col className="form-column">
                <MyTextField
                  label="Middle Name"
                  value={data.middleName || ""}
                  className="form-text-field"
                  onChange={(e) => updateField(e)}
                  id="middleName"
                  error={formErrors.middleName.error}
                  helperText={
                    formErrors.middleName.error &&
                    formErrors.middleName.errorMessage
                  }
                />
              </Col>
              <Col className="form-column">
                <MyTextField
                  label="Last Name"
                  value={data.lastName || ""}
                  className="form-text-field"
                  onChange={(e) => updateField(e)}
                  id="lastName"
                  error={formErrors.lastName.error}
                  helperText={
                    formErrors.lastName.error &&
                    formErrors.lastName.errorMessage
                  }
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 form-row">
              <Col className="form-column">
                <MyTextField
                  label="Email Address"
                  value={data.email || ""}
                  className="form-text-field"
                  onChange={(e) => updateField(e)}
                  id="email"
                  error={formErrors.email.error}
                  helperText={
                    formErrors.email.error && formErrors.email.errorMessage
                  }
                  required
                />
              </Col>
              <Col className="form-column">
                <MyTextField
                  label="Phone Number"
                  value={data.phone || ""}
                  className="form-text-field"
                  onChange={(e) => updateField(e)}
                  id="phone"
                  error={formErrors.phone.error}
                  helperText={
                    formErrors.phone.error && formErrors.phone.errorMessage
                  }
                />
              </Col>
              <Col className="form-column">
                <MyTextField
                  type="date"
                  label="Date Of Birth"
                  value={data.dob || ""}
                  onChange={(e) => updateField(e)}
                  className="form-text-field"
                  id="dob"
                  error={formErrors.dob.error}
                  helperText={
                    formErrors.dob.error && formErrors.dob.errorMessage
                  }
                  required
                />
              </Col>
            </Row>

            <Row className="mb-3 form-row">
              <Col className="form-column">
                <MyTextField
                  label="Gender"
                  value={data.gender || ""}
                  onChange={(e) => updateField(e)}
                  id="gender"
                  className="form-text-field"
                  error={formErrors.gender.error}
                  helperText={
                    formErrors.gender.error && formErrors.gender.errorMessage
                  }
                  select
                  fullWidth
                  required
                >
                  <MenuItem key={"male"} value="male">
                    Male
                  </MenuItem>
                  <MenuItem key={"female"} value="female">
                    Female
                  </MenuItem>
                  <MenuItem key={"other"} value="other">
                    Other
                  </MenuItem>
                </MyTextField>
              </Col>
              <Col className="form-column">
                <MyTextField
                  label="City"
                  value={data.city || ""}
                  className="form-text-field"
                  onChange={(e) => updateField(e)}
                  id="city"
                  error={formErrors.city.error}
                  helperText={
                    formErrors.city.error && formErrors.city.errorMessage
                  }
                  required
                />
              </Col>
              <Col className="form-column">
                <Button
                  variant="contained"
                  component="label"
                  className="upload-file-btn"
                  fullWidth
                >
                  <FontAwesomeIcon icon={faUpload} /> &nbsp; &nbsp; Upload
                  Documents
                  <input
                    type="file"
                    onChange={(e) => updateDocuments(e)}
                    id="documents"
                    multiple
                    hidden
                  />
                </Button>
              </Col>
            </Row>
            <Row>
              <DocumentList files={files} setFiles={setFiles} />
            </Row>
            <div className="submit-btn-div">
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={submitForm}
              >
                <FontAwesomeIcon icon={faArrowCircleRight} /> &nbsp; Submit
              </Button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};
