import React from "react";
import NoConnectionComponent from "../StaticComponents/NoConnectionComponent";
import { Button } from "@mui/material";
import HRMButton from "../Button/HRMButton";

export default function ServerErrorPage() {
  const [timer, setTimer] = React.useState(59);
  const counter = React.useRef(59);

  const buttonName = () => {
    if (timer < 1) return `Reloading, please wait...`;
    return `Automatically reload in ${timer > 9 ? timer : "0" + timer} ${
      timer > 1 ? "seconds" : "second"
    }`;
  };

   const handleClick = () => {
    window.location.reload();
  };

  return (
    <NoConnectionComponent>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "38px",
            textAlign: "left",
            margin: "5px 0px",
          }}
        >
          Something went wrong
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "23px",
          }}
        >
          Sorry, we couldn't start the hrm application. The server is down or
          under maintenance.
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "23px",
            margin: "5px 0px",
          }}
        >
        </p>
        <HRMButton
          mode={"primary"}
          onClick={handleClick}
          style={{ width: "214px", height: "34px", margin: "30px 0px" }}
        >
          Reload
        </HRMButton>
      </div>
    </NoConnectionComponent>
  );
}
