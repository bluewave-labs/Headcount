import { createContext, useState, useEffect } from "react";
import { produce } from "immer";
import logo from "../Images/bluewave_hrm_logo_large.png";
const api = require("../assets/FetchServices");
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // state contains user, employee and company logo
  const [state, setState] = useState({logo});

  useEffect(() => {
    async function fetchData() {
      // Get logo
      try {
        const res = await api.company.fetchLogo();
        if(res){
           const image = `data:image/png;base64,${atob(res)}`; 
           updateState("logo", image);
        }
         else{
          updateState("logo", logo);
        }
      } catch (err) {
        console.log("Error decoding company logo, using default hrm logo");
      }
    }
    fetchData();
  }, []);

  // key is the name of the object to be updated eg. user
  const updateState = (key, value) => {
    const data = produce(state, (newState) => {
      newState[key] = value;
    });
    setState(data);
  };

  //Change multiple values at the same time. This function takes an array of objects - {key, value}
  const updateStates = (values) => {
    const data = produce(state, (newState) => {
      for (let [key, value] of Object.entries(values)) {
        newState[key] = value;
      }
    });
    setState(data);
  };

  // Remove all items in the state object except items that do not dependend on a session such as logo.
  const clearState = () => {
    // You may include other items
    const data = {
      logo: state.logo
    };
    setState(data);
  }

  return (
    <StateContext.Provider value={{ state, updateState, updateStates, clearState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
