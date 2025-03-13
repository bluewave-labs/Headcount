import { Stack, styled, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Popover from "@mui/material/Popover";
import dayjs from "dayjs";

//CSS for formatting calendar
const CalendarStyle = {
  ".css-1hbyad5-MuiTypography-root": { display: "none" },
  ".css-1wsi274-MuiPickersToolbar-content": {
    backgroundColor: "white",
    borderTop: 2,
    borderRight: 2,
    borderBottom: 2,
    borderLeft: 2,
    borderRadius: 2,
    padding: "3px",
    paddingTop: "7px",
    paddingRight: "3px",
    paddingBottom: "7px",
    paddingLeft: "7px",
    fontSize: 2,
    borderColor: "#EAECF0",
  },
  ".css-3jvy96-MuiTypography-root-MuiDatePickerToolbar-title": {
    fontWeight: 200,
    fontSize: "1rem",
  },
  ".css-1rtg91x-MuiDateCalendar-root": {
    borderBottom: 1,
    borderColor: "divider",
  },
  ".css-knqc4i-MuiDialogActions-root": {
    justifyContent: "center",
  },
  ".css-knqc4i-MuiDialogActions-root>:not(style)~:not(style)": {
    backgroundColor: "#7F56D9",
    color: "white",
    width: "50%",
    textTransform: "none",
    borderRadius: 2,
  },
  ".css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
    color: "black",
    width: "50%",
    textTransform: "none",
    label: "Apply",
    borderTop: 2,
    borderRight: 2,
    borderBottom: 2,
    borderLeft: 2,
    borderRadius: 2,
    borderColor: "#EAECF0",
  },
  ".css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#7F56D9",
  },
  ".css-innj4t-MuiPickersYear-yearButton.Mui-selected": {
    backgroundColor: "#7F56D9",
  },
  ".css-i4bv87-MuiSvgIcon-root": {
    color: "#7F56D9",
    marginLeft: 3.5,
    width: 10,
  },
  ".css-12mkn7b-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton":
    { display: "none" },
  ".css-1prhkyx-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton":
    {
      display: "none",
    },
  ".MuiPickersCalendarHeader-root": {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },
  ".MuiPickersCalendarHeader-root:first-of-type": {
    order: 0,
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  ".MuiPickersArrowSwitcher-root": {
    display: "inline-flex",
  },
  ".MuiPickersCalendarHeader-label": {
    textAlign: "center",
  },
  ".MuiPickersArrowSwitcher-spacer": {
    width: "220px",
  },
  ".css-31ca4x-MuiPickersFadeTransitionGroup-root": {
    display: "flex",
    position: "absolute",
    paddingLeft: "80px",
  },
  ".css-9reuh9-MuiPickersArrowSwitcher-root": {
    marginLeft: "-2px",
  },
  ".MuiPickersArrowSwitcher-button": {
    paddingRight: "7px",
  },
  border: "2px solid #EAECF0",
  borderRadius: "8px",
  width: 350,
};

function Calendar(props) {
  const { value, handleAccept, handleClose } = props;
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ okButtonLabel: "Apply" }}
    >
      <StaticDatePicker
        showDaysOutsideCurrentMonth={true}
        sx={CalendarStyle}
        orientation="portrait"
        openTo="day"
        value={value}
        onAccept={handleAccept}
        onClose={handleClose}
      />
    </LocalizationProvider>
  );
}

const FormattedButton = styled(Button)(() => ({
  backgroundColor: "#FFFFFF",
  width: "150px",
  height: "30px",
  color: "#000",
  border: "1px solid #D0D5DD",
  textTransform: "none",
  fontStyle: "normal",
  fontWeight: "inherit",
  fontSize: "13px",
  maxHeight: "30px",
  "&:hover": { backgroundColor: "#FFFFFF", border: "1px solid purple" },
}));

function HRMDatePicker(props) {
  const { name, initialValue, hasError, onChange } = props;
  const [value, setValue] = useState(
    initialValue ? dayjs(initialValue) : dayjs()
  );
  useEffect(() => {
    setValue(initialValue ? dayjs(initialValue) : dayjs());
  }, [initialValue]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      const event = {
        target: {
          name: name,
          value: newValue,
        },
      };
      onChange(event);
    }
  };

  //Popover functions begin here
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;
  //Popover functions end here

  return (
    <Stack>
      <FormattedButton
        variant="outlined"
        startIcon={<CalendarTodayOutlinedIcon />}
        onClick={handleClick}
        disableRipple
        style={hasError && { backgroundColor: "#FADADD", borderColor: "red" }}
      >
        {dayjs(value).format("MMM D, YYYY")}
      </FormattedButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ marginLeft: "-10px", marginTop: "2px" }}
      >
        <Calendar
          value={value}
          handleAccept={handleChange}
          handleClose={handleClose}
        />
      </Popover>
    </Stack>
  );
}

export default HRMDatePicker;
