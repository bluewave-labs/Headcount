import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useState, createRef } from "react";
import { colors, fonts } from "../../Styles";

/**
 * Intermediate component for uploading an image in the SetupCompanyMenu component
 *
 * Props:
 * - setFile<Function>: Function for setting the file to be uploaded in the parent component.
 *      Syntax: setFile(<file base64 string>)
 *
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {}
 */
export default function UploadFile({ setFile, style }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = createRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files;
    if (f.length > 0) {
      fileInputRef.current.files = f;
      handleFileChange({ target: { files: f } });
    }
  }

  function handleClick() {
    fileInputRef.current.click();
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: "fit-content",
        border: "1px solid #EBEBEB",
        borderRadius: "12px",
        padding: "16px 24px",
        color: dragOver ? colors.primary : colors.darkGrey,
        fontFamily: fonts.fontFamily,
        backgroundColor: dragOver ? "#f0f0f0" : "white",
        ...style,
      }}
    >
      <Stack spacing={1} justifyContent="center" textAlign="center">
        {/*Upload icon*/}
        <Box
          sx={{
            width: "fit-content",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            padding: 1,
            "&.MuiBox-root": {
              margin: "0 auto",
            },
          }}
        >
          <CloudUploadOutlinedIcon />
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          accept=".svg, .png, .jpg, .jpeg, .gif"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {/*Text*/}
        <p>
          <a
            id="uploadFileLink"
            onMouseOver={() =>
              (document.getElementById("uploadFileLink").style.cursor =
                "pointer")
            }
            onMouseOut={() =>
              (document.getElementById("uploadFileLink").style.cursor = "auto")
            }
            onClick={handleClick}
            style={{
              color: "#7F56D9",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Click to upload
          </a>
          &nbsp;or drag and drop
        </p>
        <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
      </Stack>
    </div>
  );
}

//Control panel settings for storybook
UploadFile.propTypes = {};

//Default values for this component
UploadFile.defaultProps = {
  style: {},
};
