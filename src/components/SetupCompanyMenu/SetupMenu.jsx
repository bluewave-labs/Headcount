import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import SelectItem from "./SelectItem";
import HRMButton from "../Button/HRMButton";
import { colors, fonts } from "../../assets/Styles";
import { useState } from "react";

//Function for formatting the departments given in the props
function divideIntoThree(options) {
  let i = 0;
  const newList = [];
  while (i < options.length) {
    newList.push(options.slice(i, i + 3));
    i += 3;
  }
  return newList;
}

/**
 * Setup menu component for onboarding purposes. Contains toggle buttons for displaying items to
 * be added.
 *
 * Props:
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 *
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {}
 * - item string: Name to be displayed
 * - options[]: an array of objects of the form [{ "name": "Customer Success", "selected": false }]
 * - url string; URL to be used for API requests
 * - key string: database column name
 */
export default function SetupMenu({
  advancePage,
  style,
  item,
  columnName,
  options,
  onSubmit,
}) {
  // Set the initial value of options to departmentOption
  const [selectedOptions, setSelectedOptions] = useState(options);

  let index = -1; // Required to assign unique index to each button

  // This function counts and returns the number of selected items
  const activeCounts = (options) => {
    let count = 0;
    for (let option of options) {
      if (option.selected) {
        count++;
      }
    }
    return count;
  };

  // This function returns an array of objects having key and selected item name pair. It returns an empty array if no button is selected.
  const activeStates = (key, options) => {
    const selected = [];
    for (let option of options) {
      if (option.selected) {
        const data = key ? { [key]: option.name } : { item: option.name };
        selected.push(data);
      }
    }
    return selected;
  };
  // This function handles selection. If an item is already selected, it will be unselected and vice versa
  const handleSelection = (selectedIndex) => {
    selectedOptions[selectedIndex].selected =
      !selectedOptions[selectedIndex].selected; // Negate the selected button
    setSelectedOptions([...selectedOptions]); // Update the state.
  };

  const handleAdd = async () => {
    const data = activeStates(columnName, selectedOptions);
   // console.log("key", columnName);
   // console.log(data);
    if (onSubmit) {
      const response = await onSubmit(data);
      //console.log(response);
    }
    if (advancePage) {
      advancePage();
    }
  };

  const formattedOptions = divideIntoThree(selectedOptions);

  return (
    <Box
      sx={{
        ...{
          boxSizing: "border-box",
          border: "1px solid #EBEBEB",
          borderRadius: 2,
          paddingTop: 6,
          paddingX: "150px",
          paddingBottom: 20,
          backgroundColor: "#FFFFFF",
          color: colors.darkGrey,
          width: "1403px",
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      {/*Text*/}
      <h3 style={{ margin: "1em auto", textAlign: "center" }}>
        {`Select the ${item ? item.toLowerCase() : "items"} to add`}
      </h3>
      <p style={{ margin: "1em auto 80px", textAlign: "center" }}>
        {`You can modify the name or add more  ${
          item ? item.toLowerCase() : "items"
        } later`}
      </p>
      {/*Buttons*/}
      {formattedOptions.map((list, rowIndex) => {
        return (
          <Stack
            key={rowIndex}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
            sx={{ marginY: "20px" }}
          >
            {list.map((item) => {
              index++;
              return (
                <SelectItem
                  state={item.selected}
                  setState={handleSelection}
                  index={index}
                  style={{ flex: 1 }}
                  key={index}
                >
                  {item.name}
                </SelectItem>
              );
            })}
          </Stack>
        );
      })}
      {/*Add departments button*/}
      <HRMButton
        mode="primary"
        enabled={activeCounts(selectedOptions) >= 3}
        onClick={handleAdd}
        style={{
          float: "right",
          marginTop: "80px",
        }}
      >
        {`Add  ${item ? item : "Items"}`}
      </HRMButton>
    </Box>
  );
}
