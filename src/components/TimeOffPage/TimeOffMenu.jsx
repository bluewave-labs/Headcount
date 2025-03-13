import Box from "@mui/system/Box";
//import Tab from "@mui/material/Tab";
//import TabContext from "@mui/lab/TabContext";
//import TabList from "@mui/lab/TabList";
//import TabPanel from "@mui/lab/TabPanel";
//import { styled } from "@mui/system";
import { useContext } from "react";
import BoardTabContent from "./BoardTabContent";
import HistoryTabContent from "./HistoryTabContent";
import TeamTabContent from "./TeamTabContent";
import { colors, fonts } from "../../Styles";
import StateContext from "../../context/StateContext";
import CustomTabs from "../tabs/CustomTabs";

/**
 * Menu component for the time off page. Contains the Board, History and Team tabs for controlling
 * the display of content. The Board tab shows the remaining available time off for the user and
 * any upcoming periods of time off. The History tab shows the complete history of the user's time
 * off. The Team tab shows the periods of time off for each member of the user's team.
 *
 * Props:
 * - update<Boolean>: Flag for triggering the useEffect hook in the BoardTabContent component.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffMenu({ update, style }) {
  //const [tab, setTab] = useState("Board"); //State determining which flag is selected

  const stateContext = useContext(StateContext);
  const isAdmin =
    stateContext.state.user && stateContext.state.user.permission.id === 1;
  const isManager =
    stateContext.state.user && stateContext.state.user.permission.id === 2;

  const tabs = isAdmin || isManager ? [
    { label: "Board", child: <BoardTabContent update={update} /> },
    { label: "History", child: <HistoryTabContent /> },
    { label: "My Team", child: <TeamTabContent /> }
  ] : [
    { label: "Board", child: <BoardTabContent update={update} /> },
    { label: "History", child: <HistoryTabContent /> }
  ];
  
  return (
      <Box sx={{...{
          boxSizing: "border-box",
          minWidth: "980px",
          padding: "48px",
          border: "1px solid #EBEBEB",
          borderRadius: "5px",
          backgroundColor: "#FFFFFF",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily
      }, ...style}}>
        <CustomTabs items={tabs}/>
      </Box>
  );
};

//Control panel settings for storybook
TimeOffMenu.propTypes = {};

//Default values for this component
TimeOffMenu.defaultProps = {
  style: {},
};
