import Stack from "@mui/system/Stack";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fonts } from "../../assets/Styles";
import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Popover from "@mui/material/Popover";
import StateContext from "../../context/StateContext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PageContext from "../../context/PageContext";
const api = require("../../assets/FetchServices");

/**
 * Header component for displaying the current user's information.
 *
 * Props:
 * - user<Object>: Object containing the user's information including avatar, name and role.
 *      Syntax: {avatar: <image source>, name: <string>, role: <string>}
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 *
 * - actions<Object>: Array of objects in which each object contains a label and action.
 *     Syntax: [...{label: <string>, action: <function>]
 */
export default function UserDropdown({ style }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const stateContext = useContext(StateContext);
  const pageContext = useContext(PageContext);
  const navigate = useNavigate(); // used to return to landing page

  const user = {
    avatar:
      stateContext.state.employee && stateContext.state.employee.photo
        ? "data:image/png;base64," +
          atob(stateContext.state.employee.photo.toString("base64"))
        : null,
    name: stateContext.state.user
      ? `${stateContext.state.user.firstName} ${stateContext.state.user.lastName}`
      : "Unknown",
    role:
      stateContext.state.user && stateContext.state.user.permission
        ? stateContext.state.user.permission.type
        : "Guest",
  };

  const logout = async () => {
    try {
      await api.authentication.logout();
      console.log("Logged out");
    } catch (error) {
      console.log(error)
    }
    finally{
      pageContext.navigateTo("login");
      navigate("/", {replace: true});
      stateContext.clearState();
    }
  };

  const actions = [
    {
      label: "Profile",
      action: () => {
        console.log("Navigate to profile page");
      },
    },
    {
      label: "Password",
      action: () =>{ console.log("Password")}
    },
    {
      label: "Team",
      action: () =>{ console.log("Team")}
    },
    {
      label: "Log out",
      action: logout,
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        ...{
          alignItems: "center",
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      <Avatar alt={user.name} src={user.avatar} />
      <Stack
        spacing={1}
        sx={{
          textAlign: "center",
        }}
      >
        <b>{user.name}</b>
        <p>{user.role}</p>
      </Stack>
      <Typography onClick={actions && actions.length > 0 && handleClick}>
        {open && <KeyboardArrowUpIcon />}
        {!open && <KeyboardArrowDownIcon />}
      </Typography>
      {/*Popover will be only be visible if exists at least an action*/}
      {actions && actions.length > 0 && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ mt: 2 }}
        >
          <List sx={{ width: "200px" }}>
            {actions.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      paddingTop: "0.5px",
                      paddingBottom: "0.5px",
                      paddingLeft: "0",
                    }}
                    onClick={() => {
                      handleClose();
                      item.action();
                    }}
                  >
                    <ListItemIcon sx={{ justifyContent: "center" }}>
                      {index === 0 && <PersonOutlineIcon />}
                      {index === 1 && <HttpsOutlinedIcon />}
                      {index === 2 && <PeopleAltOutlinedIcon />}
                      {index === 3 && <LogoutOutlinedIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ fontFamily: fonts.fontFamily }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Popover>
      )}
    </Stack>
  );
}

//Control panel settings for storybook
UserDropdown.propTypes = {};

//Default values for this component
UserDropdown.defaultProps = {};
