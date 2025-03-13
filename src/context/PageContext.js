import React from "react";
import axios from "axios";

const PageContext = React.createContext();
const api = require("../assets/FetchServices");

const pageItems = [
  "login",
  "signup",
  "onboarding",
  "dashboard",
  "placeholder",
  "checkMail",
  "forgotPassword",
  "resetPassword",
  "newPassword",
  "networkError",
];

export const PageProvider = ({ children }) => {
  const [page, setPage] = React.useState({ placeholder : true });

  const navigateTo = (page) => {
    const pageData = {};
    for (let item of pageItems) {
      pageData[item] = false;
    }
    pageData[page] = true;
    setPage(pageData);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const check = await api.user.exists(); // check if db contains a user account.
        if (check) {
          const initialPage = check.message ? "login" : "onboarding";
          navigateTo(initialPage);
        } else {
          navigateTo("networkError");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <PageContext.Provider value={{ page, navigateTo }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
