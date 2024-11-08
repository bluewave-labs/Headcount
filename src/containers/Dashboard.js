import { Box, Stack } from "@mui/material";
import Header from "../components/StaticComponents/Header";
import SideMenu from "../components/StaticComponents/SideMenu";
import PeopleHome from "./PeopleHome";
import MyInfoHome from "./MyInfoHome";
import ReportsMain from "../components/reports/ReportsMain";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../context/StateContext";
import { produce } from "immer";
import Placeholder from "../components/PeopleComponents/Placeholder";
import UpdatesPage from "../components/UpdatesPage/UpdatesPage";
import TimeOffPage from "../components/TimeOffPage/TimeOffPage";
const api = require("../assets/FetchServices");

const dashboardMenu = {
  home: false,
  myinfo: false,
  people: false,
  timeoff: false,
  reporting: false,
  settings: false,
};

export default function Dashboard() {
  const stateContext = useContext(StateContext);
  const [current, setCurrent] = useState({});
  const navigate = useNavigate();
  const displayMenu = (menuItem) => {
    const newCurrent = produce(dashboardMenu, (newDashboardMenu) => {
      newDashboardMenu[menuItem] = true;
    });
    setCurrent(newCurrent);
  };
  useEffect(() => {
   // console.log(stateContext);
    async function fetchData() {
      try {
       // console.log(stateContext.state.user, "state1");
        if (!stateContext.state.user) {
          const currentUser = await api.user.refresh();
         // console.log("state2", { currentUser });
          if (currentUser) {
            // Get associated employee record
            const currentEmployee = await api.employee.fetchOneByEmail(
              currentUser.email
            );

            const data = {
              user: currentUser,
              employee: currentEmployee,
            };
            //Set logo =
            try {
              const res = await api.company.fetchLogo();
              const logo = `data:image/png;base64,${atob(res)}`;
              if (logo) {
                data["logo"] = logo;
              }
            } catch (error) {
              console.log("Error, failed to reload logo");
            }
            stateContext.updateStates(data);
            //navigate("/dashboard", { replace: true });
          } else {
            throw "No active session, please log in.";
          }
        }
        const isAdmin =
          stateContext.state.user &&
          stateContext.state.user.permission.id === 1;
        const initialMenu = isAdmin ? "home" : "people";
        displayMenu(initialMenu);
      } catch (err) {
        console.log(err);
        navigate("/", { replace: true }); // Redirect to login page
      }
    }
    fetchData();
  }, []);
  if (!stateContext.state.user) {
    // return <Placeholder content={"Loading, please wait..."} />;
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <Stack spacing={"32px"} direction={"row"}>
        <SideMenu
          onSelect={(menuItem) => {
            displayMenu(menuItem);
          }}
        />
        <Box sx={{
          width: "100%",
          paddingLeft: "280px",
          paddingRight: "120px",
          paddingTop: "137px",
          backgroundColor: "#FCFCFD"
        }}>
          {current.home && <UpdatesPage />}
          {current.myinfo && <MyInfoHome />}
          {current.people && <PeopleHome />}
          {current.timeoff && <TimeOffPage />}
          {current.reporting && <ReportsMain />}
          {current.settings && (
            <Placeholder>
              <h1>Settings page</h1>
            </Placeholder>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
