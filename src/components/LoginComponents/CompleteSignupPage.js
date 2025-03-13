import React from "react";
import SingupPage from "./SingupPage";
import { useParams } from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";
const api = require("../../assets/FetchServices");

export default function CompleteSignup() {
  const { token } = useParams();
  const [user, setUser] = React.useState();
  const [error, setEerror] = React.useState(false); // For tracking error to display appropriate page.

  React.useEffect(() => {
    async function fetch() {
      try {
        const user = await api.user.fetchOneByToken(token);
        // User will be null if token is not valid
        setUser(user);
      } catch (err) {
        console.log(err);
        setEerror(true);
      }
    }
    fetch();
  }, []);

  if(error || !user){ // Display error page if there is an error or no user
    return (<ErrorPage />
    )
}
  return (
      <SingupPage user={user} token={token}/>
  );
}
