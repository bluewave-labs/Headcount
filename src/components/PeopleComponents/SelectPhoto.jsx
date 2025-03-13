import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Typography, Stack, Avatar } from "@mui/material";
import Link from "@mui/material/Link";

const isImageFile = (fileName) => {
  const allowedExtensions = ["GIV", "JPEG", "JPG", "PNG", "SVG"];
  if (!fileName) return false;
  const indexOfDot = fileName.lastIndexOf(".");
  if (indexOfDot < 0) {
    return false;
  }
  const fileExtension = fileName.substring(indexOfDot + 1).toUpperCase();
  return allowedExtensions.includes(fileExtension);
};



const SelectPhoto = (props) => {
  const { imageData, onChange } = props;
  const fileInputRef = React.createRef();

  const [selectedFile, setSelectedFile] = useState(imageData);
  useEffect(() => {
    setSelectedFile(imageData);
  }, [imageData]);

  const readURL = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
      if (onChange) {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle file change event
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file && isImageFile(file.name)){
    readURL(file);}
  };
  // Trigger file input
  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInputRef.current.files = files;
      handleFileChange({ target: { files } });
    }
  };

  return (
    <Stack
      spacing={2}
      alignContent={"flex-start"}
      direction={"row"}
    >
      <Avatar sx={{ height: 75, width: 75 }} src={selectedFile}></Avatar>
      <Box
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        height={100}
        width={"80%"}
        minWidth={250}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        gap={4}
        p={2}
        sx={{ border: "1px solid #d0d5dd", borderRadius: "12px" }}
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
              accept=".svg, .png, .jpg, .jpeg, .gif"
              onChange={handleFileChange}
              style={{ display: "none" }}
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
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "regular",
              color: "#475467",
              fontFamily: "Inter",
              marginBottom: "4px",
            }}
          >
            SVG, PNG, JPG or GIF (max. 800x400px)
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SelectPhoto;

// https://www.youtube.com/watch?v=edR6Az7shv8
