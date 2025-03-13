import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
const styles = {
  ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
    flexDirection: "row-reverse",
    height: 24,
    width: 160,
  },
  ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
    color: "inherit",
    fontSize: "1rem",
  },
    ".css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#7F56D9",
  },
  ".css-9reuh9-MuiPickersArrowSwitcher-root": {
    display: "inline-flex",
  },
  ".MuiPickersCalendarHeader-label": {
    textAlign: "center",
  },
  ".css-9reuh9-MuiPickersArrowSwitcher-root": {
    width: "220px",
    border:"2px solid red"
  },
  ".css-1gyhqmk-MuiFormControl-root-MuiTextField-root":{
    backgroundColor:"red",
    border: "2px solid blue"
  },
  ".css-1rhb6d2-MuiFormControl-root-MuiTextField-root .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root ": {
    flexDirection: "row-reverse",
    height: "2433px",
    width: "160px",
}
};
//.css-1aqny2q-MuiPickersCalendarHeader-root
//.css-9reuh9-MuiPickersArrowSwitcher-root
//.css-9reuh9-MuiPickersArrowSwitcher-root
/**
 * This function creates a responsive React Datepicker component.
 * @returns React Datepicker component
 */
export default function AppResponsiveDatePicker() {
  const [value, setValue] = useState(dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DatePicker
          sx={styles}
          placeholder
          format={"MMM D, YYYY"}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Box>
    </LocalizationProvider>
  );
}
