import React from "react";

const style = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

function Placeholder({ content, children }) {
  return (
    <div style={style}>
      {content}
      {children}
    </div>
  );
}

export default Placeholder;
