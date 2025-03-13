import React, { useState, useContext, forwardRef } from "react";
import Box from "@mui/material/Box";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Typography, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { multiStepContext } from "../../context/stepContext";
import { produce } from "immer";

const DocumentUpload = forwardRef((props, ref) => {
  const fileInputRef = React.createRef();
  const [dragOver, setDragOver] = useState(false);
  const { state, setState } = useContext(multiStepContext);

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

  const addFile = (newFile) => {
    const files = [...state.offboardingSignedDocuments, newFile];
    const data = produce(state, (newState) => {
      newState.offboardingSignedDocuments = files;
    });
    setState(data);
  };

  const handleDelete = (index) => {
    const currFiles = state.offboardingSignedDocuments;
    const updatedFiles = [];
    for (let i = 0; i < currFiles.length; i++) {
      if (i === index) {
        continue;
      }
      updatedFiles.push(currFiles[i]);
    }

    const data = produce(state, (newState) => {
      newState.offboardingSignedDocuments = updatedFiles;
      //Check if this file has already been uploaded
      if (currFiles[index].id) {
        // Keep track of ids of deleted files
        if (state.deletedOffboardingSignedDocuments) {
          newState.deletedOffboardingSignedDocuments = [
            ...state.deletedOffboardingSignedDocuments,
            currFiles[index].id,
          ];
        } else {
          newState.deletedOffboardingSignedDocuments = [currFiles[index].id];
        }
      }
    });
    setState(data);
  };

  // Handle file change event
  const handleFileChange = async (e) => {
    const file = await e.target.files[0];
    if (file && permittedFile(file.name)) {
      const name = file.name.split(".")[0];
      const documentExtension = file.name.split(".")[1];
      const uploadedDate = new Date();
      var reader = new FileReader();
      reader.onload = async function (event) {
        const base64String = await event.target.result.split(",")[1]; // Extract base64 string
        const uploadFile = {
          offboardingId: state.id,
          empId: state.empId,
          documentName: name,
          documentExtension,
          documentCategory: "offboarding",
          dateUploaded: uploadedDate,
          documentDescription: "Signed document",
          documentFile: base64String,
        };
        addFile(uploadFile);
      };
      reader.readAsDataURL(file);
    }
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
                accept=".pdf,.doc,.docx,image/*"
                hidden
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
                accept="application/pdf"
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
      {state.offboardingSignedDocuments === 0 ? (
        <></>
      ) : (
        <TableContainer>
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
              {state.offboardingSignedDocuments.map((file, index) => (
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
});

export default DocumentUpload;
