import React from "react";
import EmployeeContext from "../components/myinfo/EmployeeContext";
import MyInfoMain from "../components/myinfo/MyInfoMain";
import MyInfoPersonal from "../components/myinfo/MyInfoPersonal";
import { EmployeeProvider } from "../components/myinfo/EmployeeContext";
import ReportsMain from "../components/reports/ReportsMain";
import EmployeeForm from "../components/PeopleComponents/EmployeeForm";
import StateContext from "../context/StateContext";
import axios from "axios";
import { getAuthUser } from "../assets/utils";
import EmployeeSnackbar from "../components/PeopleComponents/Snackbar";
function MyInfoHome(props) {
  const { state, updateStates } = React.useContext(StateContext);
  const [showForm, setShowForm] = React.useState(false);
  const [alert, setAlert] = React.useState({ show: false });

  const handleSave = async (email) => {
    setShowForm(false);
    setAlert({
      show: true,
      message: `Record successfully updated.`,
    });
    const { user, employee } = await getAuthUser(email);
    updateStates({user, employee});
  };
  return (
    <>
      {!showForm && (
        <>
          <EmployeeSnackbar isOpen={alert.show} message={alert.message} />
          <MyInfoMain onClickEdit={() => setShowForm(true)} />
        </>
      )}
      {showForm && (
        <EmployeeForm
          employee={{ ...state.employee }}
          restricted={true}
          onDiscard={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default MyInfoHome;
