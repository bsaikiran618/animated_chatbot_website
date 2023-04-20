import { TextField } from "@mui/material";
import styled from "styled-components";

export const MyTextField = styled(TextField)`
& .MuiInputBase-input {
  color: white;
}

& .MuiOutlinedInput-notchedOutline {
  border-color: #1976d2;
}

& .MuiOutlinedInput-notchedOutline:hover {
  border-color: white;
}

& label.MuiInputLabel-shrink {
  color: #1976d2 !important;
}

& label.MuiFormLabel-root {
  color: white;
}

& .MuiOutlinedInput-root {
  &. Mui-focused fieldset {
    border-color: white;
  }
}

& span.MuiInputLabel-asterisk {
    color: red;
}
`;