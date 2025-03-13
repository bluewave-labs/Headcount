import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./PopupModal.css";

const saveButtonStyle = {
  textTransform: "none",
  backgroundColor: "#7F56D9",
  font: "400 13px/24px Inter, sans-serif",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#6941C6",
  },
};

const otherButtonStyle = {
  textTransform: "none",
  backgroundColor: "#fff",
  border: "1px solid #EAECF0",
  font: "400 13px/24px Inter, sans-serif",
  color: "#344054",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    border: "1px solid #D0D5DD",
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export default function PopupModal(props) {
  const { onAccept, onDiscard, onCancel } = props;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
    handleClose();
  };

  const handleDiscard = () => {
    if (onDiscard) {
      onDiscard();
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="PopupModals">
            <div className="unsavedPopupBody">
              <label className="modal-header-h2"> Unsaved Changes</label>
              <p className="modal-header-p">
                Do you want to save or discard changes?
              </p>
              <div className="btngroup1">
                <Button
                  sx={saveButtonStyle}
                  onClick={handleAccept}
                  disableRipple
                >
                  Save changes
                </Button>
                <Button
                  sx={otherButtonStyle}
                  onClick={handleDiscard}
                  disableRipple
                >
                  Discard
                </Button>
                <Button
                  sx={otherButtonStyle}
                  onClick={handleClose}
                  disableRipple
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
