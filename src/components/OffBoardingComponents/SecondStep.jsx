import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import CheckBox from "../Checkbox/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import arrow from "../../Images/Arrow.svg";
import { produce } from "immer";
import DocumentUpload from "./DocumentUpload";

// Utility function to create a TableRow.
function CreateTableRow(downloadable, key, handleDownload) {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      key={key}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          fontFamily: "Inter",
          fontWeight: "600",
          fontSize: "14px",
        }}
        key={0}
      >
        {downloadable.documentName}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          fontFamily: "Inter",
          fontWeight: "600",
          color: "#7F56D9",
        }}
        key={1}
      >
        <Button
          onClick={() => handleDownload(downloadable)}
          sx={{
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
            color: "#7F56D9",
            fontWeight: "600",
            background: "none",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          Download
        </Button>
      </TableCell>
    </TableRow>
  );
}

function CreateDownloadableDocumentContainer(downloadable, handleDownload) {
  if (downloadable.length === 0) {
    return (
      <>
        <Box
          width={"1003px"}
          margin={"49px auto 0 auto"}
          textAlign={"center"}
          sx={{ border: "2px solid #ebebeb" }}
          padding={"44px 0"}
        >
          <Typography
            fontFamily="Inter"
            variant="h1"
            fontSize={"16px"}
            fontWeight={600}
            margin={"20px auto"}
          >
            No documents to download
          </Typography>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box
        width={"1003px"}
        margin={"49px auto 0 auto"}
        textAlign={"center"}
        sx={{ border: "2px solid #ebebeb" }}
        padding={"44px 0"}
      >
        <Typography
          fontFamily="Inter"
          variant="h1"
          fontSize={"16px"}
          fontWeight={600}
          margin={"20px auto"}
        >
          {`Download ${
            downloadable.length === 1 ? "document" : "documents"
          } below, sign them and upload again`}
        </Typography>
        <Typography
          fontFamily="Inter"
          fontSize={"13px"}
          fontWeight={400}
          margin={"0 auto 20px auto"}
        >
          You can sign digitally or manually by printing and scanning as you
          wish.
        </Typography>

        <TableContainer sx={{ width: "80%", margin: "20px auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#F9FAFB",
                    width: "100%",
                    fontFamily: "Inter",
                    fontWeight: "500",
                  }}
                >
                  File name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F9FAFB",
                    width: "100%",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {downloadable.map((row, index) => {
                return CreateTableRow(row, index, handleDownload);
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

function SecondStep() {
  const [enabled, setEnabled] = useState(true); // To disable save button after click
  const { setCurrentStep, state, setState, handleSave, downloadable } =
    useContext(multiStepContext);

  const handleDownload = (downloadable) => {
    const link = document.createElement("a");
    link.href = `data:application/${
      downloadable.documentExtension
    };base64,${atob(downloadable.documentFile)}`;
    link.download = `${downloadable.documentName}.${downloadable.documentExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCheckBox = (e) => {
    const data = produce(state, (newState) => {
      newState.signedDocumentAck = e.target.checked;
    });
    setState(data);
  };

  const handleNext = async (e) => {
    setEnabled(false);
    await handleSave();
  };
  return (
    <>
      {CreateDownloadableDocumentContainer(downloadable, handleDownload)}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "26px 0",
        }}
      >
        <img src={arrow} alt="arrow-icon" width={50} height={50} />
      </Box>

      <Box
        width={"1003px"}
        margin={"0 auto 49px auto"}
        padding={"65px 0"}
        textAlign={"center"}
        sx={{ border: "2px solid #ebebeb" }}
      >
        <Typography
          fontFamily="Inter"
          variant="h1"
          fontSize={"16px"}
          fontWeight={600}
          margin={"20px auto"}
        >
          Upload signed documents
        </Typography>
        <Typography
          fontFamily="Inter"
          fontSize={"13px"}
          fontWeight={400}
          margin={"0 auto 20px auto"}
        >
          You can sign digitally or manually by printing and scanning as you
          wish.
        </Typography>
        {/* <FileUploadDialog/> */}
        <Box sx={{ width: "80%", margin: "20px auto" }}>
          <DocumentUpload />
        </Box>

        {/* table logic ends... */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "80%",
            margin: "54px auto",
          }}
        >
          <CheckBox
            checked={state.signedDocumentAck}
            onChange={handleCheckBox}
          />
          <Typography
            fontFamily="Inter"
            variant="h1"
            fontSize={"13px"}
            fontWeight={400}
            // sx={{display:"inline"}}
            margin={"0 5px"}
            lineHeight={"10px"}
          >
            I have signed the documents and am ready to proceed to the next step
          </Typography>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "50px 0",
          }}
        >
          <HRMButton
            mode={"secondaryA"}
            startIcon={<ArrowBackIcon />}
            style={{
              padding: "10px",
              width: "132px",
              height: "32px",

              fontSize: "13px",
            }}
            onClick={() => setCurrentStep(state.step - 1)}
          >
            Previous
          </HRMButton>
          {enabled ? (
            <HRMButton
              mode={"primary"}
              style={{
                padding: "10px",
                width: "132px",
                height: "32px",
                fontSize: "13px",
              }}
              onClick={handleNext}
              enabled={state.signedDocumentAck}
            >
              Save and next
            </HRMButton>
          ) : (
            <HRMButton
              mode={"primary"}
              style={{
                padding: "10px",
                width: "132px",
                height: "32px",
                fontSize: "13px",
              }}
              onClick={handleNext}
              enabled={false}
            >
              Processing...
            </HRMButton>
          )}
        </div>
      </Box>
    </>
  );
}

export default SecondStep;
