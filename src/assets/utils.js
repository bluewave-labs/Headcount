const api = require("./FetchServices")

/**
 * Formats a number phone into a format (123) 456 -7890.
 * @param {string} num string number to be formatted.
 * @returns formatted string.
 */
const formatPhoneNumber = (num) => {
  try {
    const newFormat = [];
    if (num.length === 10) {
      newFormat.push("(");
      for (let i = 0; i < num.length; i++) {
        if (i === 3) {
          newFormat.push(") ");
        } else if (i === 6) {
          newFormat.push("-");
        }
        newFormat.push(num[i]);
      }
      return newFormat.join("");
    } else if (num.length === 12 && num.startsWith("+1")) {
      newFormat.push("+1 (");
      for (let i = 2; i < num.length; i++) {
        if (i === 5) {
          newFormat.push(") ");
        } else if (i === 8) {
          newFormat.push("-");
        }
        newFormat.push(num[i]);
      }
      return newFormat.join("");
    } else {
      return num;
    }
  } catch (err) {
    return num;
  }
};

/**
 * Utility function to fetch user and employee data from the backend.
 * @param {string} email user's email address
 * @returns object containing user and employee data
 */
const getAuthUser = async (email) => {
  if (!email) {
    throw "email cannot be null";
  }
  const auth = {};
  // Get user.
  const user = await api.user.fetchOneByEmail(email);
   auth.user = user;
  if (user) {
   const employee = await api.employee.fetchOneByEmail(user.email);
    auth.employee = employee;
  }
  return auth;
};

const login = async ({stateContext, email, password}) => {
    await api.authentication.login({email, password});
    const { user, employee } = await getAuthUser(email);
    stateContext.updateStates({user, employee});
};

const logout = async ({pageContext, navigate}) => {
  await api.authentication.logout();
  console.log("Logged out");
  pageContext.navigateTo("login");
  navigate("/", {replace: true});
};

module.exports = { formatPhoneNumber, getAuthUser, login, logout };
