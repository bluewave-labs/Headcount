import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const customStyle = {
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
// Function to add badges to the calendar
function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <FiberManualRecordIcon /> : undefined}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function AppStaticDatePicker() {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([5, 2, 15]);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ okButtonLabel: "Apply" }}
    >
      <StaticDatePicker
        showDaysOutsideCurrentMonth={true}
        sx={customStyle}
        orientation="portrait"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
