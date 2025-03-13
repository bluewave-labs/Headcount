import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { Button, styled } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";

const FormattedButton = styled(Button)(() => ({
  backgroundColor: "#FFFFFF",
  color: "#000",
  border: "1px solid #D0D5DD",
  textTransform: "none",
  fontStyle: "normal",
  fontWeight: "inherit",
  "&:hover": {
    backgroundColor: "#F5F5F5",
    border: "1px solid #D0D5DD",
  },
}));
/**
 * This is a utility component that renders a formatted left arrow icon.
 * @returns {ReactNode} A formatted React button element.
 */
function previousButton() {
  return (
    <FormattedButton variant="outlined" startIcon={<ArrowBackOutlinedIcon />}>
      Previous
    </FormattedButton>
  );
}

/**
 * This is a utility component that renders a formatted right arrow icon.
 * @returns {ReactNode} A formatted React button element.
 */
function nextButton() {
  return (
    <FormattedButton variant="outlined" endIcon={<ArrowForwardSharpIcon />}>
      Next
    </FormattedButton>
  );
}
/**
 * This component renders a pagination.
 * @param {Pagination properties} props The properties include count (size of the data),
 * rowsPerPage (the number of rows displays at a time), and handleChangePage
 * (function to call when the page number changes)
 * @returns {ReactNode} A Pagination React element.
 */
export default function AppPagination(props) {
  const { count, rowsPerPage, handleChangePage } = props;

  return (
    <Stack
      sx={{
        border: "1px solid #EAECF0",
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 2,
        alignItems: "center",
      }}
    >
      <Pagination
        count={Math.ceil(count / rowsPerPage)}
        onChange={handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: previousButton, next: nextButton }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
