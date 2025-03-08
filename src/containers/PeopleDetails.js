import { useContext, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  TableCell,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import AppTable from "../components/PeopleComponents/AppTable";
import AppTabs from "../components/PeopleComponents/AppTabs";
import ActionMenu from "../components/PeopleComponents/ActionMenu";
import { formatPhoneNumber } from "../assets/utils";
import StateContext from "../context/StateContext";
/**
 * Expected headCell format for the table. Each object represents a
 * column. Note, AppTable implementation depends on this format to make the
 * table generic. Modification to the format may result in unpredictable outcome.
 */
const tableView = require("../assets/table-view.json");
const api = require("../assets/FetchServices");
// Number of rows to display on the table at a time.
const rowsPerPage = 10;

function formatTableData({
  data,
  headCells,
  empId,
  permissionId = 3,
  addActionMenu = false, // To display action menu where possible. True means display action while false means otherwise
  handleEdit,
  handleSurvey,
  handleTermination,
}) {
  // Create set of actions
  const actions = (employee) => {
    const data = [];
    // Create and push handleEdit function menu
    data.push({
      label: "Edit employee",
      action: () => handleEdit(employee),
    });

    // Create and push handleSurvey function menu
    // data.push({ //  It can be displayed in newer version of the application
    //   label: "Send exit survey",
    //   action: () => handleSurvey(employee),
    // });
    // Create and push handleTermination function menu
    data.push({
      label: "End employment",
      action: () => handleTermination(employee),
    });

    //If user has admin permision, show all functions. Otherwise, show only edit function
    return permissionId === 1 ? data : [data[0]];
  };

  //Inner function to create formatted TableCells
  const createTableCell = (item, key) => {
    return <TableCell key={key}> {item ? item : " "}</TableCell>;
  };
  const createActionTableCell = (item) => {
    return (
      <TableCell
        key={-1}
        style={{
          position: "sticky",
          backgroundColor: "white",
          boxShadow: "5px 2px 5px grey",
          right: 0,
        }}
      >
        {item}
      </TableCell>
    );
  };

  // Inner function to disable action menu
  const disableActionMenu = (data, empId) => {
    if (permissionId === 1) {
      return false;
    }
    if (permissionId === 2) {
      return data.managerId !== empId;
    }
    return true;
  };

  // Inner function to check if action menu should be displayed.
  const showActionMenu = (key) => {
    return addActionMenu && key === "action" && permissionId < 3;
  };

  data.forEach(async (emp) => {
    emp.name = `${emp.firstName} ${emp.lastName}`;
    emp.role = emp.role && emp.role.roleTitle;
    emp.team = emp.team && emp.team.teamName;
    emp.department = emp.department && emp.department.departmentName;
    emp.manager =
      emp.Manager && `${emp.Manager.firstName} ${emp.Manager.lastName}`;
    emp.salary = Number(emp.salary).toLocaleString();
    emp.hireDate = emp.hireDate && dayjs(emp.hireDate).format("DD MMMM, YYYY");
    emp.dateOfBirth =
      emp.dateOfBirth && dayjs(emp.dateOfBirth).format("DD MMMM, YYYY");
    emp.phoneNumber = formatPhoneNumber(emp.phoneNumber);
  });

  const getHeadCellIds = (headCellObj) => headCellObj.map((obj) => obj["id"]);
  const keys = getHeadCellIds(headCells);
  data.forEach((row) => {
    const newData = [];

    keys.map((key, index) => {
      let cell;
      if (key === "name") {
        cell = createTableCell(
          <Stack direction="row" spacing={1}>
            <Avatar
              sx={{ width: 25, height: 25 }}
              alt={row.name}
              src={"data:image/png;base64," + atob(row.photo)}
            />
            <Box sx={{ paddingTop: 0.5 }}>{row.name}</Box>
          </Stack>,
          index
        );
      } else if (showActionMenu(key)) {
        cell = createActionTableCell(
          <ActionMenu
            actions={actions(row)}
            disableMenu={disableActionMenu(row, empId)}
          />
        );
      } else if (key !== "action") {
        cell = createTableCell(row[key], index);
      }
      newData.push(cell);
    });
    if (newData.length > 0) {
      row["cells"] = newData;
    }
  });
}
const tabItems = ({
  isAdmin,
  loading,
  showActionHeader,
  employees,
  headCells,
  hasTeam,
  team,
  terminated,
}) => {
  const tabs = [
    {
      label: "Directory",
      child: (
        <AppTable
          caption={"Company members"}
          headCells={headCells}
          data={employees}
          rowsPerPage={rowsPerPage}
          loading={loading}
          showActionHeader={showActionHeader}
        />
      ),
    },
  ];

  if (hasTeam) {
    const teamTab = {
      label: "My Team",
      child: (
        <AppTable
          caption={"People in my team"}
          headCells={headCells}
          data={team}
          rowsPerPage={rowsPerPage}
          loading={loading}
          showActionHeader={true}
        />
      ),
    };
    tabs.push(teamTab);
  }

  if (isAdmin) {
    const teamTab = {
      label: "Terminated Employees",
      child: (
        <AppTable
          caption={"Terminated employees"}
          headCells={headCells}
          data={terminated}
          rowsPerPage={rowsPerPage}
          loading={loading}
          showActionHeader={false}
        />
      ),
    };
    tabs.push(teamTab);
  }
  return tabs;
};

/**
 * This component was designed to demonstrate other components such as
 * AppTable, AppTablePagination, AppTab, and AppDatePickers.
 * @returns A React component.
 */
export default function People({
  handleAddNewEmployee,
  handleEdit,
  handleSurvey,
  handleTermination,
}) {
  const stateContext = useContext(StateContext);
  const [employees, setEmployees] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [terminated, setTerminated] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin =
    stateContext.state.user && stateContext.state.user.permission.id === 1;
  const headCells = isAdmin ? tableView.admin : tableView.others;
  //permission.id 1 is for admin, 2 for managers, 3 for employees
  const hasTeam =
    stateContext.state.user && stateContext.state.user.permission.id < 3;
  //Get the employee id of the system user if any. Note employee can be null.
  const empId = stateContext.state.employee
    ? stateContext.state.employee.empId
    : -1;
  // Get the permission id of the system user
  const permissionId = stateContext.state.user
    ? stateContext.state.user.permission.id
    : -1;

  const params = {
    data: null,
    headCells,
    empId,
    permissionId,
    addActionMenu: permissionId < 3,
    handleEdit,
    handleSurvey,
    handleTermination,
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        if (stateContext.state.pdEmployees) {
          //pd stands for people details
          setEmployees(stateContext.state.pdEmployees);
          setLoading(false);
        } else {
          const res = await api.employee.fetchAll();
          setLoading(false);
          params.data = res;
          formatTableData(params);
          setEmployees(params.data);
          stateContext.updateState("pdEmployees", params.data);
        }

        if (stateContext.state.employee) {
          if (stateContext.state.pdMyTeam) {
            setMyTeam(stateContext.state.pdMyTeam);
          } else {
            const managerId = stateContext.state.employee.empId;
            const team = await api.employee.fetchMyTeam(managerId);
            params.data = team;
            params.addActionMenu = true;
            formatTableData(params);
            setMyTeam(params.data);
            stateContext.updateState("pdMyTeam", params.data);
          }
        }
        if (isAdmin) {
          if (stateContext.state.pdTerminated) {
            setTerminated(stateContext.state.pdTerminated);
          } else {
            const terms = await api.employee.fetchTerminated();
            params.data = terms;
            params.addActionMenu = false;
            formatTableData(params);
            setTerminated(params.data);
            stateContext.updateState("pdTerminated", params.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Stack sx={{ minWidth: window.innerWidth < 1550 ? 1100 : 1350 }}>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          height: "87px",
          mt: 5,
          mb: -5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          id="tableTitle"
          component="div"
          color={"inherent"}
          fontWeight={600}
        >
          People
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            disableElevation
            onClick={(evt) => handleAddNewEmployee()}
            sx={{
              width: "166px",
              height: "34px",
              border: "1px solid #7F56D9",
              backgroundColor: "#7F56D9",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#602ece",
                border: "1px solid #602ece",
              },
            }}
          >
            Add new employee
          </Button>
        )}
      </Box>

      <Stack
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          height: "100%",
          minHeight: "50vh",
          backgroundColor: "#FFFFFF",
          border: "1px solid #EBEBEB",
          borderRadius: "10px",
          pt: 7.5,
          pb: 4,
          pr: 4,
          pl: 5,
          mt: 0,
          mb: 5,
        }}
      >
        {
          <AppTabs
            items={tabItems({
              isAdmin,
              loading,
              showActionHeader: permissionId < 3,
              employees,
              hasTeam,
              team: myTeam,
              headCells,
              terminated,
            })}
          />
        }
      </Stack>
    </Stack>
  );
}
