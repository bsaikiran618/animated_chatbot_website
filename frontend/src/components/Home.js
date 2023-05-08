import hello from "../hello.gif";
import { Button, MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import "../App.css";
import { useState } from "react";
import { MyTextField } from "./MyTextField";
import Axios from "axios";
import { DocumentList } from "./DocumentList";
import {
  faArrowCircleRight,
  faSmile,
  faSpinner,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const Home = () => {
  const [isSubmitting, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const initialData = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    city: "",
  };
  const [data, setData] = useState(initialData);

  const initialFormErrors = {
    firstName: {
      error: false,
      errorMessage: "",
    },
    middleName: {
      error: false,
      errorMessage: "",
    },
    lastName: {
      error: false,
      errorMessage: "",
    },
    email: {
      error: false,
      errorMessage: "",
    },
    phone: {
      error: false,
      errorMessage: "",
    },
    dob: {
      error: false,
      errorMessage: "",
    },
    gender: {
      error: false,
      errorMessage: "",
    },
    city: {
      error: false,
      errorMessage: "",
    },
    documents: {
      error: false,
      errorMessage: "",
    },
  };

  const [formErrors, setFormErrors] = useState({ ...initialFormErrors });

  function submitForm(e) {
    e.preventDefault();

    if (validateFormData()) {
      setIsSubmitted(true);
      const formData = new FormData();
      formData.append("document1", files[0]);
      formData.append("otherData", JSON.stringify(data));

      Axios.post("http://localhost:8000/submitForm", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          afterSubmitActions();
          setIsSubmitted(false);
        })
        .catch((err) => {
          setIsSubmitted(false);
        });
    } else {
      setFormErrors({ ...formErrors });
    }
  }

  function afterSubmitActions() {
    setOpen(true);
    setIsSubmitted(false);
    setData(initialData);
    setFiles([]);
  }

  function updateField(e) {
    if (!e.target.id) e.target.id = "gender";

    const newData = { ...data };
    if (e.target.id === "documents") newData[e.target.id] = e.target.files;
    else newData[e.target.id] = e.target.value;

    setData(newData);
    updateErrors();
  }

  function updateDocuments(e) {
    const updatedFiles = [...files, ...e.target.files];
    setFiles(updatedFiles);
  }

  function validateFormData() {
    if (!data.firstName) {
      formErrors.firstName.error = true;
      formErrors.firstName.errorMessage = "Please Provide First Name!";
      return false;
    } else if (!data.lastName) {
      formErrors.lastName.error = true;
      formErrors.lastName.errorMessage = "Please Provide Last Name!";
      return false;
    } else if (!data.email) {
      formErrors.email.error = true;
      formErrors.email.errorMessage = "Please Provide Email Address!";
      return false;
    } else if (!data.phone) {
      formErrors.phone.error = true;
      formErrors.phone.errorMessage = "Please Provide Phone Number!";
      return false;
    } else if (!data.gender) {
      formErrors.gender.error = true;
      formErrors.gender.errorMessage = "Please Select a Gender!";
      return false;
    } else if (!data.dob) {
      formErrors.dob.error = true;
      formErrors.dob.errorMessage = "Please Select Birthday date!";
      return false;
    } else if (!data.city) {
      formErrors.city.error = true;
      formErrors.city.errorMessage = "Please Provide City Name!";
      return false;
    } else if (!/^[a-zA-Z]+$/.test(data.firstName)) {
      formErrors.firstName.error = true;
      formErrors.firstName.errorMessage = "First Name must have only letters!";
      return false;
    } else if (data.middleName && !/^[a-zA-Z]+$/.test(data.middleName)) {
      formErrors.middleName.error = true;
      formErrors.middleName.errorMessage = "Middle Name must have only letters!";
      return false;
    } else if (!/^[a-zA-Z]+$/.test(data.lastName)) {
      formErrors.lastName.error = true;
      formErrors.lastName.errorMessage = "Last Name must have only letters!";
      return false;
    } else if (!/^[a-z0-9A-Z_.]+@[a-z]+\.[a-z]{2,3}$/.test(data.email)) {
      formErrors.email.error = true;
      formErrors.email.errorMessage = "Invalid Email Address! xx@xx.xx";
      return false;
    } else if (!/^[0-9]{10}$/.test(data.phone)) {
      formErrors.phone.error = true;
      formErrors.phone.errorMessage = "Phone Number must have exact 10 digits!";
      return false;
    } else if (!/^[a-zA-Z]+$/.test(data.city)) {
      formErrors.city.error = true;
      formErrors.city.errorMessage = "City Name must have only letters!";
      return false;
    }

    return true;
  }

  function updateErrors() {
    setFormErrors({ ...initialFormErrors });
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
          <p className="fill-in-text">Fill-in your details-</p>
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
                  required
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
                disabled={isSubmitting}
                style={{ height: "45px" }}
              >
                <FontAwesomeIcon
                  icon={faSpinner}
                  style={
                    isSubmitting ? { display: "inline" } : { display: "none" }
                  }
                  className="submit-btn-spinner"
                />
                <div
                  style={
                    !isSubmitting ? { display: "inline" } : { display: "none" }
                  }
                >
                  <FontAwesomeIcon icon={faArrowCircleRight} />
                  &nbsp; Submit
                </div>
              </Button>
            </div>
          </form>
        </div>
      </header>

      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
      >
        <DialogTitle id="dialog-title" style={{ color: "green" }}>
          Success! <FontAwesomeIcon icon={faSmile} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="dialog-description"
            style={{ color: "#282c34", margin: "10px" }}
          >
            Successfully Submitted! Please check your e-mail inbox for a link to
            the Audio Visual Conversational Bot.
            <br /> Thank You!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            color="success"
            onClick={() => setOpen(false)}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
