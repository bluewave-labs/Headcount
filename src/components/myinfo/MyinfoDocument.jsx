import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Typography, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StateContext from "../../context/StateContext";
import dayjs from "dayjs";
const api = require("../../assets/FetchServices");

const MyinfoDocument = () => {
  const stateContext = useContext(StateContext);

  const fileInputRef = React.createRef();
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [currentfilename, setCurrentFileName] = useState("");
  const [filesize, setFileSize] = useState(0);
  const [filelist, setFileList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (stateContext.state.mdFilelist) {
          // md stands for my document
          setFileList(stateContext.state.mdFilelist);
        } else {
          if (stateContext.state.employee) {
            const empId = stateContext.state.employee.empId;
            const results = await api.document.fetchOne(empId);
            if (results) {
              stateContext.updateState("mdFilelist", results);
              setFileList(results);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Utility function to restrict the type of files that can be dragged and dropped
  const permittedFile = (fileName) => {
    const allowedExtensions = [
      "PDF",
      "DOC",
      "DOCX",
      "GIV",
      "JPEG",
      "JPG",
      "PNG",
      "SVG",
    ];
    if (!fileName) return false;
    const indexOfDot = fileName.lastIndexOf(".");
    if (indexOfDot < 0) {
      return false;
    }
    const fileExtension = fileName.substring(indexOfDot + 1).toUpperCase();
    return allowedExtensions.includes(fileExtension);
  };

  // Handle file change event
  const handleFileChange = async (e) => {
    const file = await e.target.files[0];
    if (file && permittedFile(file.name)) {
      const name = file.name.split(".")[0];
      const documentExtension = file.name.split(".")[1];
      const dateUploaded = new Date();
      const size = (file.size / 1000000).toFixed(1);
      setCurrentFileName(name);
      setFileSize(size);
      console.log("File size in MB:", size);
      var reader = new FileReader();
      reader.onload = async function (event) {
        const base64String = await event.target.result.split(",")[1]; // Extract base64 string
        const uploadFile = {
          empId: stateContext.state.employee.empId,
          documentName: name,
          documentExtension,
          dateUploaded,
          documentDescription: null,
          documentFile: base64String,
        };
        saveAndUploadFile(uploadFile);
      };
      reader.readAsDataURL(file);
    }
  };
  const saveAndUploadFile = async (file) => {
    // Save file
    const files = [...filelist, file];
    setFileList(files);
    stateContext.updateState("mdFilelist", files);
    // Upload to backend
    await api.document.createOneWithProgressReport(file, setProgress);
  };

  // Trigger file input
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInputRef.current.files = files;
      handleFileChange({ target: { files } });
    }
  };

  const handleDelete = (index) => {
    // Get the id of the file
    const id = filelist[index].id;
    // Remove item from the list
    const newFilelist = filelist.filter((_, i) => i !== index);
    // Update the state with the new array
    setFileList(newFilelist);
    stateContext.updateState("mdFilelist", newFilelist);

    // Delete from the backend
    api.document.remove(id);

  };
  

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Box
          height={126}
          width={812}
          my={4}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          boxShadow={4}
          gap={4}
          p={2}
          sx={{ border: "2px solid #7F56D9", borderRadius: "12px" }}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ height: "100vh" }}
          >
            <CloudUploadOutlinedIcon
              sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
            />
            <Stack direction="row">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden-input"
                onChange={handleFileChange}
              />
              <Link
                onClick={handleClick}
                type="file"
                component="button"
                underline="none"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#6941C6",
                  fontFamily: "Inter",
                  marginBottom: "4px",
                  marginRight: "2px",
                }}
              >
                Click to upload
              </Link>

              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "regular",
                  color: "#475467",
                  fontFamily: "Inter",
                  marginBottom: "4px",
                }}
              >
                or drag and drop
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </div>

      <Box
        height={72}
        width={812}
        my={4}
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        gap={4}
        p={2}
        sx={{
          border: "2px solid #EAECF0",
          borderRadius: "12px",
          background: `linear-gradient(to right, #F9FAFB ${progress}%, transparent ${progress}%), transparent 100%`,
        }}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "medium",
              color: "#344054",
              fontFamily: "Inter",
              marginBottom: "4px",
            }}
          >
            {currentfilename}
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "regular",
              color: "#475467",
              fontFamily: "Inter",
              marginBottom: "4px",
            }}
          >
            {filesize}MB – {progress}% uploaded
          </Typography>
        </Stack>
        <Stack sx={{ position: "relative" }}>
          <CircularProgress
            variant="determinate"
            sx={{
              color: "#F2F4F7",
            }}
            size={40}
            thickness={4}
            value={100}
          />
          <CircularProgress
            variant="determinate"
            disableShrink
            sx={{
              color: "#7F56D9",
              position: "absolute",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            value={progress}
            size={40}
            thickness={4}
          />
        </Stack>
      </Box>
      {filelist.length > 0 && (
        <TableContainer
          sx={{
            width: "840px",
            overflowX: "auto",
            maxHeight: 390,
          }}
        >
          <Table sx={{ width: "812px" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    fontWeight: "medium",
                    color: "#475467",
                    fontFamily: "Inter",
                  }}
                >
                  File name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    fontWeight: "medium",
                    color: "#475467",
                    fontFamily: "Inter",
                  }}
                  align="left"
                >
                  Date uploaded
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filelist.map((file, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "medium",
                      color: "#101828",
                      fontFamily: "Inter",
                    }}
                  >
                    {file.documentName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "13px",
                      fontWeight: "regular",
                      color: "#475467",
                      fontFamily: "Inter",
                    }}
                  >
                    {dayjs(file.dateUploaded).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="right"
                    >
                      <Link
                        component="button"
                        underline="none"
                        onClick={() => handleDelete(index)}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#475467",
                          fontFamily: "Inter",
                          marginBottom: "4px",
                          marginRight: "8px",
                        }}
                      >
                        Delete
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default MyinfoDocument;

// https://www.youtube.com/watch?v=edR6Az7shv8
