import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Stack, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
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

  ".css-knqc4i-MuiDialogActions-root": {
    display: "none",
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
  ".css-1jxoqs6-MuiPickersLayout-root-Apply": {
    visibility: "hiden",
    backgroundColor: "blue",
  },
  ".MuiPickersLayout-toolbar": {
    visibility: "hidden",
    display: "none",
    backgroundColor: "red",
  },
  ".css-22qels-MuiList-root": {
    maxHeight: "100%",
    width: "150px",
    borderRight: 1,
    borderColor: "divider",
  },
  ".css-8m5rrr-MuiButtonBase-root-MuiChip-root": {
    backgroundColor: "transparent",
    borderRadius: 0,
  },
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

const shortcutsItems = [
  {
    label: "Today",
    getValue: () => {
      return dayjs();
    },
  },
  {
    label: "Yesterday",
    getValue: () => {
      return dayjs().subtract(1, "day");
    },
  },
  {
    label: "This week",
    getValue: () => {
      const today = dayjs();
      return today.startOf("week");
    },
  },
  {
    label: "Last week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return prevWeek.startOf("week");
    },
  },
  {
    label: "This month",
    getValue: () => {
      const today = dayjs();
      return today.startOf("month");
    },
  },
  {
    label: "Last month",
    getValue: () => {
      const today = dayjs();
      const prevMonth = today.subtract(1, "month");
      return prevMonth.startOf("month");
    },
  },
  {
    label: "This year",
    getValue: () => {
      const today = dayjs();
      return today.startOf("year");
    },
  },
  {
    label: "Last year",
    getValue: () => {
      const today = dayjs();
      const prevYear = today.subtract(1, "year");
      return prevYear.startOf("year");
    },
  },
  {
    label: "All time",
    getValue: () => {
      return null;
    },
  },
];

export default function AppCalendar() {
    const today = dayjs();
    const [values, setValues] = useState({
        leftCalendar : today,
        rightCalendar : today.add(1, "month"),
    });
  const [highlightedDays, setHighlightedDays] = useState([5, 2, 16]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={"row"}
        sx={{
          border: "2px solid #EAECF0",
          borderRadius: 2,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <StaticDatePicker
            value={values.leftCalendar}
            onChange={(newValue) => {
            setValues({
                leftCalendar : newValue,
                rightCalendar : values.rightCalendar
            });
          }}
          fixedWeekNumber={6}
          showDaysOutsideCurrentMonth
          sx={customStyle}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
            },
            day: {
              highlightedDays,
            },
          }}
          slots={{
            day: ServerDay,
          }}
        />

        <Typography
          sx={{ borderLeft: 1, borderColor: "divider", height: "325px" }}
        >
          <StaticDatePicker
            value={values.rightCalendar}
            onChange={(newValue) => {
              setValues({
                leftCalendar : values.leftCalendar,
                rightCalendar : newValue
              });
            }}
            fixedWeekNumber={6}
            showDaysOutsideCurrentMonth 
             sx={customStyle}
             slotProps={{
                day: {
                  highlightedDays,
                },
              }}
              slots={{
                day: ServerDay,
              }}
          />
        </Typography>
      </Stack>
    </LocalizationProvider>
  );
}
