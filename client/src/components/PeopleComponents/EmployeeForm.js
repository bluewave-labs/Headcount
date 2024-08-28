import { useState, useEffect, userRef } from "react";
import { Box, Divider, Stack, Typography, Button } from "@mui/material";
import "./EmployeeForm.css";
import countryData from "../../assets/countries+states+cities.json";
import axios from "axios";
import SelectPhoto from "../SelectPhoto";
import HRMDatePicker from "../HRMDatePicker";
import dayjs from "dayjs";
import PopupModal from "./PopupModal";
const selectOptions = require("../../assets/employee-form-select-options.json");
const validator = require("validator");

//Helper function to extract nationality from the country data
const getNationality = () => {
  const data = [""];
  countryData.map((item) => {
    data.push(item.nationality);
  });
  return data;
};

const getCountryName = () => {
  const data = [""];
  countryData.map((item) => {
    data.push(item.name);
  });
  return data;
};

const getStates = (countryName) => {
  const data = [""];
  for (let country of countryData) {
    if (country.name === countryName) {
      const states = country.states;
      states.forEach((state) => {
        data.push(state.name);
      });
      break;
    }
  }
  return data;
};

const getCities = (countryName, stateName) => {
  const data = [""];
  for (let country of countryData) {
    if (country.name === countryName) {
      const states = country.states;
      for (let state of states) {
        if (state.name === stateName) {
          const cities = state.cities;
          cities.forEach((city) => {
            data.push(city.name);
          });
          break;
        }
      }

      break;
    }
  }
  data.push("Others");
  return data;
};

function sort(itemA, itemB, key) {
  if (itemA[key] < itemB[key]) {
    return -1;
  }
  if (itemB[key] > itemA[key]) {
    return 1;
  }
  return 0;
}

// Function to extract values of a key from an array of objects
const getValues = (arr, key) => {
  const data = [""];
  for (let value of arr) {
    data.push(value[key]);
  }
  return data;
};

const getManagerNames = (managers) => {
  const name = [""];
  if (managers) {
    for (let manager of managers) {
      name.push(`${manager.firstName} ${manager.lastName}`);
    }
  }
  return name;
};

const rootStyle = {
  width: "100%",
  minWidth: "800px",
  display: "flex",
  justifyContent: "space-between",
};

const errorStyle = {
  fontSize: "10px",
  color: "red",
  paddingLeft: "5px",
};

function createHeader(employee, handleDiscard) {
  return (
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
        {employee ? "Edit my info" : "Add a new employee"}
      </Typography>

      <Button
        variant="contained"
        disableElevation
        onClick={() => handleDiscard(true)}
        sx={{
          width: "166px",
          height: "34px",
          border: "1px solid #D0D5DD",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          fontSize: 13,
          fontWeight: 400,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#F5F5F5",
            border: "1px solid #D0D5DD",
          },
        }}
      >
        Discard and go back
      </Button>
    </Box>
  );
}

function createFooter(employee, handleSubmit) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        justifyContent: "end",
        pt: 2,
      }}
    >
      <Button
        variant="contained"
        disableElevation
        onClick={handleSubmit}
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
        {employee ? "Save changes" : "Add new employee"}
      </Button>
    </Box>
  );
}

function createSubHead(title) {
  return (
    <Stack sx={{ paddingTop: "30px", fontWeight: "400" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
        {title}
      </Typography>
      <Divider />
    </Stack>
  );
}

function ImagePicker(props) {
  const { employee, handleChange } = props;
  const image = employee && `data:image/png;base64,${atob(employee.photo)}`;
  return (
    <Box sx={rootStyle}>
      <label>Photo</label>
      <SelectPhoto
        imageData={image}
        onChange={(fileData) => {
          let startIndex = fileData.indexOf(",") + 1;
          fileData = fileData.substring(startIndex);
          const data = {
            target: {
              name: "photo",
              value: fileData,
            },
          };
          handleChange(data);
        }}
      />
    </Box>
  );
}

function CustomisedDatePicker(props) {
  const { label, name, value, handleChange, validator } = props;

  return (
    <Box sx={rootStyle}>
      <label>{label}</label>
      <Typography sx={{ width: "520px" }}>
        <HRMDatePicker
          name={name}
          initialValue={value}
          hasError={validator[name]}
          onChange={handleChange}
        />
        {validator[name] && <Box sx={errorStyle}>{validator[name]} </Box>}
      </Typography>
    </Box>
  );
}

function CustomisedSelectTag(props) {
  const {
    label,
    name,
    value,
    options,
    width,
    handleChange,
    validator,
    restricted,
  } = props;
  return (
    <Box sx={rootStyle}>
      <label>{label}</label>
      <Typography sx={{ width: "520px" }}>
        <select
          className={
            validator[name] ? "select-element field-error" : "select-element"
          }
          name={name}
          value={value}
          onChange={handleChange}
          style={{ width: width ? width : 530 + "px" }}
          disabled={restricted}
        >
          {options &&
            options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
        </select>
        {validator[name] && <Box sx={errorStyle}>{validator[name]} </Box>}
      </Typography>
    </Box>
  );
}
function CustomisedInput(props) {
  const {
    label,
    name,
    value,
    handleChange,
    placeholder,
    validator,
    restricted,
  } = props;
  return (
    <Box sx={rootStyle}>
      <Typography>{label}</Typography>
      <Typography>
        <input
          className={validator[name] ? `text-field field-error` : `text-field`}
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          require
          disabled={restricted}
        />
        {validator[name] && <Box sx={errorStyle}>{validator[name]} </Box>}
      </Typography>
    </Box>
  );
}
function CustomisedSocialMediaInput(props) {
  const { label, title, name, value, handleChange, validator } = props;
  return (
    <Box sx={rootStyle}>
      <Typography>{label}</Typography>
      <Typography>
        <input
          readOnly
          tabIndex="-1"
          value={title}
          className="text-field-social-media-title"
        />
        <input
          className={
            validator[name]
              ? "text-field-social-media field-error"
              : "text-field-social-media"
          }
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          require
        />
        {validator[name] && <Box sx={errorStyle}>{validator[name]} </Box>}
      </Typography>
    </Box>
  );
}

function EmployeeForm(props) {
  const { employee, restricted, onDiscard } = props;

  const [inputs, setInputs] = useState(employee || {});

  const [validator, setValidator] = useState({});
  // array of department objects received from the backend
  const [departments, setDepartments] = useState([]);

  // array of manager objects received from the backend
  const [managers, setManagers] = useState([]);

  // array of position/role objects received from the back end.
  const [positions, setPositions] = useState([]);

  // To take note of any change to the form. If value is true, there will be
  // a pop asking if user wants to save the changes when discard button is pressed.
  const [change, setChange] = useState(false);

  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        let res = await axios.get("http://localhost:5000/api/departments");
        res = res.data;
        res.sort((a, b) => sort(a, b, "departmentName"));
        setDepartments(res);

        res = await axios.get("http://localhost:5000/api/roles");
        res = res.data;
        res.sort((a, b) => sort(a, b, "roleTitle"));
        setPositions(res);

        res = await axios.get("http://localhost:5000/api/managers");
        res = res.data;
        setManagers(res);
        setInputs(employee ? employee : {});
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    if (employee) {
      loadEmployee(employee);
    }
  }, [employee]);

  const loadEmployee = (emp) => {
    // Create additional columns needed for the form.
    emp["_city"] = null;
    const cities = getCities(emp.country, emp.stateProvince);
    if (!cities.includes(emp.city)) {
      emp["_city"] = emp.city;
      emp.city = "Others";
    }
    emp["_department"] = emp.department.departmentName;
    emp["_role"] = emp.role.roleTitle;
    emp["reportTo"] =
      emp.Manager && `${emp.Manager.firstName} ${emp.Manager.lastName}`;

    const socialProfiles = emp.socialProfiles;
    if (socialProfiles) {
      for (let profile of socialProfiles) {
        const lastIndex = profile.profileUrl.lastIndexOf("/");
        if (lastIndex < 0) continue;
        const userName = profile.profileUrl.substring(lastIndex + 1);
        if (profile.mediumName.toLowerCase() === "facebook") {
          emp["_facebook"] = userName;
        } else if (profile.mediumName.toLowerCase() === "twitter") {
          emp["_twitter"] = userName;
        } else if (profile.mediumName.toLocaleLowerCase() === "linkedin") {
          emp["_linkedin"] = userName;
        }
      }
    }
  };

  // This function filters the inputs to ensure they align with the backend data model
  const filterInputs = () => {
    //Use first name as preferred name if the latter is not provided
    if (!inputs.preferredName) {
      inputs.preferredName = inputs.firstName;
    }
    inputs.dateOfBirth = new Date(inputs.dateOfBirth);
    inputs.hireDate = new Date(inputs.hireDate);
    inputs.effectiveDate = new Date(inputs.effectiveDate);
    if (inputs.city === "Others") {
      inputs.city = inputs._city;
    }

    const newProfiles = [];
    if (!isEmpty(inputs._facebook)) {
      const facebook = {
        mediumName: "Facebook",
        profileUrl: `https://facebook.com/${inputs._facebook}`,
      };
      newProfiles.push(facebook);
    }

    if (!isEmpty(inputs._twitter)) {
      const twitter = {
        mediumName: "Twitter",
        profileUrl: `https://twitter.com/${inputs._twitter}`,
      };
      newProfiles.push(twitter);
    }
    if (!isEmpty(inputs._linkedin)) {
      const linkedin = {
        mediumName: "Linkedin",
        profileUrl: `https://linkedin.com/in/${inputs._linkedin}`,
      };
      newProfiles.push(linkedin);
    }

    const oldProfiles = inputs.socialProfiles; // This will be null for new employ or empty if existing employee does not have a social profile.
    if (oldProfiles) {
      for (let oldProfile of oldProfiles) {
        for (let index = 0; index < newProfiles.length; index++) {
          const newProfile = newProfiles[index];
          if (newProfile.mediumName === oldProfile.mediumName) {
            newProfile.id = oldProfile.id;
            newProfile.empId = oldProfile.empId;
          }
        }
      }
    }
    inputs["socialProfiles"] = newProfiles;

    delete inputs.createdAt;
    delete inputs.Manager;
    delete inputs._city;
    delete inputs._department;
    delete inputs.department;
    delete inputs._facebook;
    delete inputs._linkedin;
    delete inputs._twitter;
    delete inputs.reportTo;
    delete inputs.team;
    delete inputs.updatedAt;
    delete inputs._role;

    return newProfiles;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (name === "reportTo") {
      const index = event.target.selectedIndex;
      if (typeof index !== "undefined") {
        const managerId = index > 0 ? managers[index - 1].empId : null;
        setInputs((values) => ({ ...values, ["managerId"]: managerId }));
      }
    } else if (name === "_department") {
      const index = event.target.selectedIndex;
      if (typeof index !== "undefined") {
        const departmentId = index > 0 ? departments[index - 1].id : null;
        setInputs((values) => ({ ...values, ["departmentId"]: departmentId }));
      }
    } else if (name === "_role") {
      const index = event.target.selectedIndex;
      if (typeof index !== "undefined") {
        const roleId = index > 0 ? positions[index - 1].roleId : null;
        setInputs((values) => ({ ...values, ["roleId"]: roleId }));
      }
    } else if (name === "city" && value !== "Others") {
      setInputs((values) => ({ ...values, ["_city"]: null }));
    }
    setChange(true);
  };

  const handleSubmit = async () => {
    const result = await validateForm(inputs);
    setValidator(result);
    if (!result.valid) {
      const count = Object.keys(result).length - 1;
      const msg = `Form validation failed. ${count} ${
        count === 1 ? "error" : "errors"
      } found.`;
      console.log(msg);
      return;
    }
    console.log("Form validation passed.");
    const socialProfiles = filterInputs();

    try {
      if (employee) {
        await axios({
          method: "put",
          url: "http://localhost:5000/api/employees",
          data: inputs,
        });

        // Update social profiles
        for (let profile of socialProfiles) {
          if (profile.id) {
            // Existing profile, update it
            await axios({
              method: "put",
              url: "http://localhost:5000/api/socialprofiles",
              data: profile,
            });
            console.log(`Social profile - ${profile.mediumName} updated.`);
          } else {
            // New profile, create it.
            await axios({
              method: "post",
              url: "http://localhost:5000/api/socialprofiles",
              data: profile,
            });
            console.log(`Social profile - ${profile.mediumName} created.`);
          }
        }
        console.log("Record successfully updated.");
      } else {
        await axios({
          method: "post",
          url: "http://localhost:5000/api/employees",
          data: inputs,
        });
        console.log("Employee successfully added.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDiscard = (value) => {
    console.log(change, prompt, value,onDiscard)
    //value is true when discard button is clicked and false when confirm discard button is pressed.
    if(onDiscard && value && !change){
      onDiscard();
      return;
    }
    if (onDiscard && !value) {
      onDiscard();
    }
    setPrompt(value);
  };
  const handleCancel = () => {
    setPrompt(false);
  };

  return (
    <Stack>
      {(change && prompt) && (
        <PopupModal
          onAccept={() => console.log("Changes saved")}
          onDiscard={() => handleDiscard(false)}
          onCancel={handleCancel}
        />
      )}
      {createHeader(employee, handleDiscard)}
      <Stack
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          minHeight: "1345px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #EBEBEB",
          borderRadius: "10px",
          pt: 0,
          pb: 4,
          pr: 4,
          pl: 5,
          mt: 0,
        }}
      >
        <form sx={{ border: "2px red solid" }}>
          <Stack spacing={2.5}>
            {createSubHead("Personal")}

            <CustomisedInput
              label={"First name"}
              name={"firstName"}
              value={inputs.firstName || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedInput
              label={"Last name"}
              name={"lastName"}
              value={inputs.lastName || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedInput
              label={"Preferred name"}
              name={"preferredName"}
              value={inputs.preferredName || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedSelectTag
              label={"Gender"}
              name={"gender"}
              value={inputs.gender || ""}
              options={selectOptions.gender}
              width={161}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedSelectTag
              label={"Nationality"}
              name={"nationality"}
              value={inputs.nationality || ""}
              options={getNationality()}
              width={520}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedSelectTag
              label={"Marital status"}
              name={"maritalStatus"}
              value={inputs.maritalStatus || ""}
              options={selectOptions.maritalStatus}
              width={520}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedDatePicker
              label={"Birth date"}
              name={"dateOfBirth"}
              value={inputs.dateOfBirth || dayjs().format("MMM D, YYYY")}
              handleChange={handleChange}
              validator={validator}
            />
            <ImagePicker employee={employee} handleChange={handleChange} />
            <CustomisedInput
              label={"Mobile"}
              name={"phoneNumber"}
              value={inputs.phoneNumber || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedInput
              label={"Work email"}
              name={"email"}
              value={inputs.email || ""}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedInput
              label={"Address line 1"}
              name={"streetAddress"}
              value={inputs.streetAddress || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedInput
              label={"Address line 2"}
              name={"unitSuite"}
              value={inputs.unitSuite || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedSelectTag
              label={"Country"}
              name={"country"}
              value={inputs.country || ""}
              options={getCountryName()}
              width={520}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedSelectTag
              label={"State (if applicable)"}
              name={"stateProvince"}
              value={inputs.stateProvince || ""}
              options={getStates(inputs.country)}
              width={520}
              handleChange={handleChange}
              validator={validator}
            />

            <Stack spacing={1}>
              <CustomisedSelectTag
                label={"City"}
                name={"city"}
                value={inputs.city || ""}
                options={getCities(inputs.country, inputs.stateProvince)}
                width={520}
                handleChange={handleChange}
                validator={validator}
              />

              {inputs.city === "Others" && (
                <CustomisedInput
                  label={""}
                  name={"_city"}
                  value={inputs._city || ""}
                  handleChange={handleChange}
                  placeholder={"Please specify city"}
                  validator={validator}
                />
              )}
            </Stack>

            <CustomisedInput
              label={"Postal/zip code"}
              name={"postalZipCode"}
              value={inputs.postalZipCode || ""}
              handleChange={handleChange}
              validator={validator}
            />
            <Stack spacing={1}>
              <CustomisedSocialMediaInput
                label={"Social profiles"}
                title={"twitter.com/"}
                name={"_twitter"}
                value={inputs._twitter || ""}
                handleChange={handleChange}
                validator={validator}
              />

              <CustomisedSocialMediaInput
                label={""}
                title={"facebook.com/"}
                name={"_facebook"}
                value={inputs._facebook || ""}
                handleChange={handleChange}
                validator={validator}
              />

              <CustomisedSocialMediaInput
                label={""}
                title={"linkedin.com/in/"}
                name={"_linkedin"}
                value={inputs._linkedin || ""}
                handleChange={handleChange}
                validator={validator}
              />
            </Stack>

            <CustomisedInput
              label={"Emergency contact name"}
              name={"emergencyContactName"}
              value={inputs.emergencyContactName || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedInput
              label={"Emergency contact relationship"}
              name={"emergencyContactRelationship"}
              value={inputs.emergencyContactRelationship || ""}
              handleChange={handleChange}
              validator={validator}
            />

            <CustomisedInput
              label={"Emergency contact phone"}
              name={"emergencyContactPhoneNumber"}
              value={inputs.emergencyContactPhoneNumber || ""}
              handleChange={handleChange}
              validator={validator}
            />

            {createSubHead("Job")}

            <CustomisedDatePicker
              label={"Hire date"}
              name={"hireDate"}
              value={inputs.hireDate || dayjs().format("MMM D, YYYY")}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedSelectTag
              label={"Reporting to"}
              name={"reportTo"}
              value={inputs.reportTo || ""}
              options={getManagerNames(managers)}
              width={520}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedSelectTag
              label={"Department"}
              name={"_department"}
              value={inputs._department || ""}
              options={getValues(departments, "departmentName")}
              width={520}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedSelectTag
              label={"Position"}
              name={"_role"}
              value={inputs._role || ""}
              options={getValues(positions, "roleTitle")}
              width={520}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedInput
              label={"Office"}
              name={"officeLocation"}
              value={inputs.officeLocation || ""}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedSelectTag
              label={"Employment type"}
              name={"employmentType"}
              value={inputs.employmentType || ""}
              options={selectOptions.employmentType}
              width={520}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedSelectTag
              label={"Compensation type"}
              name={"compensationType"}
              value={inputs.compensationType || ""}
              options={selectOptions.compensationType}
              width={520}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedInput
              label={"Salary"}
              name={"salary"}
              value={inputs.salary || ""}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedDatePicker
              label={"Effective date"}
              name={"effectiveDate"}
              value={inputs.effectiveDate || dayjs().format("MMM D, YYYY")}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />

            <CustomisedInput
              label={"Hours per week"}
              name={"weeklyHours"}
              value={inputs.weeklyHours || ""}
              handleChange={handleChange}
              validator={validator}
              restricted={restricted}
            />
            {createFooter(employee, handleSubmit)}
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}

export default EmployeeForm;

//***Form validation functions begin here***
const isEmpty = (text) =>
  text === null ||
  typeof text === "undefined" ||
  text.toString().trim().length === 0;

const validateName = (fieldName, name) => {
  if (isEmpty(name)) {
    return { valid: false, message: `Please, enter ${fieldName}.` };
  }
  name = name.trim();
  const regex = /^[a-zA-Z\-\']+$/;
  if (!regex.test(name)) {
    return {
      valid: false,
      message: `Invalid character. Only alphabets, approstrophe and hyphen are allowed.`,
    };
  }
  let hyphenCount = 0;
  let approstropheCount = 0;
  for (let char of name) {
    if (char === "-") {
      hyphenCount++;
      if (hyphenCount > 1) {
        return {
          valid: false,
          message: "Multiple hypens are not allowed.",
        };
      }
    }
    if (char === "'") {
      approstropheCount++;
      if (approstropheCount > 1) {
        return {
          valid: false,
          message: "Multiple approstrophes are not allowed.",
        };
      }
    }
  }

  if (name.charAt(0) === "-" || name.charAt(name.length - 1) === "-") {
    return {
      valid: false,
      message: `${fieldName} cannot begin or end with -`,
    };
  }

  if (name.length === 1) {
    return {
      valid: false,
      message: `${fieldName} must contain more than one character.`,
    };
  }

  if (name.charCodeAt(0) < 65 || name.charCodeAt(0) > 90) {
    return {
      valid: false,
      message: `${fieldName} must begin with an uppercase.`,
    };
  }

  return {
    valid: true,
    message: "Valid input",
  };
};

const validatePhoneNumber = (num) => {
  if (isEmpty(num)) {
    return {
      valid: false,
      message: "Please enter a phone number",
    };
  }
  num = num.trim();
  const startIndex = num.startsWith("+") ? 1 : 0;
  for (let i = startIndex; i < num.length; i++) {
    if (num.charCodeAt(i) < 48 || num.charCodeAt(i) > 57) {
      return {
        valid: false,
        message: "Invalid phone number. Please enter a valid phone number",
      };
    }
  }
  if (num.substring(startIndex).length < 10) {
    return {
      valid: false,
      message: "Phone number must have at least 10 digits",
    };
  }
  return {
    valid: true,
    message: "valid",
  };
};

const validateNumberInput = (fieldName, value) => {
  if (isEmpty(value)) {
    return {
      valid: false,
      message: `${fieldName} can not be empty`,
    };
  }

  if (isNaN(value)) {
    return {
      valid: false,
      message: `Invalid input. Please enter a valid number`,
    };
  }
  if (Number(value) < 0) {
    return {
      valid: false,
      message: `${fieldName} cannot be less than 0`,
    };
  }
  return {
    valid: true,
    message: value,
  };
};

const validatePostalCode = (postalCode) => {
  if (isEmpty(postalCode)) {
    return {
      valid: false,
      message: "Please enter postal code",
    };
  }
  //The regex matches postal code of the format A1A 2B2 and A1A2B2 (case insensitive)
  const regex = /^[a-zA-Z]\d[a-zA-Z]\s?\d[a-zA-Z]\d/g;
  if (!regex.test(postalCode.trim())) {
    return {
      valid: false,
      message: "In valid postal code. Please enter a valid postal code",
    };
  }
  return {
    valid: true,
    message: "valid",
  };
};

const validateSocialProfile = async (empId, mediumName, profileUrl) => {
  if (isEmpty(profileUrl)) {
    return { valid: true, message: "valid" };
  }
  if (mediumName.toLowerCase() === "facebook") {
    profileUrl = `https://facebook.com/${profileUrl}`;
  } else if (mediumName.toLowerCase() === "twitter") {
    profileUrl = `https://twitter.com/${profileUrl}`;
  } else if (mediumName.toLocaleLowerCase() === "linkedin") {
    profileUrl = `https://linkedin.com/in/${profileUrl}`;
  }
  profileUrl = profileUrl.toLocaleLowerCase();
  const res = await axios({
    method: "post",
    url: "http://localhost:5000/api/socialProfiles/find/url",
    data: {
      empId,
      profileUrl,
    },
  });
  if (res.data.exists) {
    return { valid: false, message: "Profile already exists" };
  }
  return { valid: true, message: "valid" };
};

const validateForm = async (employee) => {
  const results = { valid: true };
  let check = validateName("First name", employee.firstName);
  let valid = true;
  if (!check.valid) {
    valid = check.valid;
    results.firstName = check.message;
  }
  check = validateName("Last name", employee.lastName);
  if (!check.valid) {
    valid = check.valid;
    results.lastName = check.message;
  }
  if (isEmpty(employee.gender)) {
    valid = false;
    results.gender = "Please, select gender";
  }

  if (isEmpty(employee.nationality)) {
    valid = false;
    results.nationality = "Please, select nationality";
  }
  if (isEmpty(employee.dateOfBirth)) {
    valid = false;
    results.dateOfBirth = "Please, select birth day";
  } else {
    const dateOfBirth = employee.dateOfBirth;
    const currentDate = dayjs();
    const diff = currentDate.diff(dateOfBirth, "year");
    if (diff < 0) {
      valid = false;
      results.dateOfBirth = "Birth date must be in the past";
    } else if (diff < 15) {
      valid = false;
      results.dateOfBirth = "Employee must be 15 years old or older.";
    }
  }
  if (isEmpty(employee.maritalStatus)) {
    valid = false;
    results.maritalStatus = "Please, select marital status";
  }
  if (isEmpty(employee.email)) {
    valid = false;
    results.email = "Please, enter an email";
  } else if (!validator.isEmail(employee.email)) {
    valid = false;
    results.email = "Invalid email. Please, enter a valid email";
  } else {
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/employees/find/email",
      data: {
        email: employee.email,
      },
    });
    if (res.data && res.data.empId !== employee.empId) {
      valid = false;
      results.email = "Email already exists";
    }
  }
  check = validatePhoneNumber(employee.phoneNumber);
  if (!check.valid) {
    valid = check.valid;
    results.phoneNumber = check.message;
  }
  if (isEmpty(employee.hireDate)) {
    valid = false;
    results.hireDate = "Please select hire date";
  }
  if (isEmpty(employee._role)) {
    valid = false;
    results._role = "Please, select a position";
  }
  check = validateNumberInput("Salary", employee.salary);
  if (!check.valid) {
    valid = check.valid;
    results.salary = check.message;
  }

  if (isEmpty(employee._department)) {
    valid = false;
    results._department = "Please, select a department";
  }
  if (isEmpty(employee.employmentType)) {
    valid = false;
    results.employmentType = "Please, select a employment type";
  }
  if (isEmpty(employee.compensationType)) {
    valid = false;
    results.compensationType = "Please, select a compensation type";
  }
  if (isEmpty(employee.officeLocation)) {
    valid = false;
    results.officeLocation = "Please, enter office location";
  }
  if (isEmpty(employee.emergencyContactName)) {
    valid = false;
    results.emergencyContactName = "Please, enter emergency contact's name";
  }
  if (isEmpty(employee.emergencyContactRelationship)) {
    valid = false;
    results.emergencyContactRelationship =
      "Please, enter emergency contact's relationship";
  }
  check = validatePhoneNumber(employee.emergencyContactPhoneNumber);
  if (!check.valid) {
    valid = check.valid;
    results.emergencyContactPhoneNumber = check.message;
  }
  if (isEmpty(employee.streetAddress)) {
    valid = false;
    results.streetAddress = "Please, enter street address";
  }
  if (isEmpty(employee.country)) {
    valid = false;
    results.country = "Please select country";
  }
  if (isEmpty(employee.city)) {
    valid = false;
    results.city = "Please select city";
  }
  if (employee.city === "Others" && isEmpty(employee._city)) {
    valid = false;
    results._city = "Please enter city";
  }
  //postal code validation is done if the select country is Canada
  if (employee.country === "Canada") {
    check = validatePostalCode(employee.postalZipCode);
    if (!check.valid) {
      valid = check.valid;
      results.postalZipCode = check.message;
    }
  }
  check = validateNumberInput("Hours per week", employee.weeklyHours);
  if (!check.valid) {
    valid = check.valid;
    results.weeklyHours = check.message;
  }

  //Check Facebook
  check = await validateSocialProfile(
    employee.empId,
    "facebook",
    employee._facebook
  );
  if (!check.valid) {
    valid = check.valid;
    results._facebook = check.message;
  }
  check = await validateSocialProfile(
    employee.empId,
    "twitter",
    employee._twitter
  );
  if (!check.valid) {
    valid = check.valid;
    results._twitter = check.message;
  }
  check = await validateSocialProfile(
    employee.empId,
    "linkedin",
    employee._linkedin
  );
  if (!check.valid) {
    valid = check.valid;
    results._linkedin = check.message;
  }

  results.valid = valid;
  return results;
};
//***Form validation functions end here***
