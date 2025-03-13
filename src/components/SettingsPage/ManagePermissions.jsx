import { Box, Stack } from "@mui/system";
import {
  styled,
  Typography,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { useMemo, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import PermissionsTable from "./PermissionsTable";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Toast from "./Toast";
import PermissionsDialog from "./PermissionsDialog";
import { useSettingsContext } from "./context";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

const PAGE_SIZE = 10;

export default function ManagePermissions({
  contentList,
  titleTabPage,
  style,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredContentList, setFilteredContentList] = useState(contentList);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    const filteredItems = contentList?.filter((item) =>
      `${item.firstName} ${item.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredContentList(filteredItems);
    setCurrentPage(1);
  }, [searchTerm, contentList]);

  const itemsToDisplay = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredContentList?.slice(start, end);
  }, [currentPage, filteredContentList]);

  const handlePage = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(contentList.length / PAGE_SIZE)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box
      sx={{
        ...{
          paddingTop: 6,
          paddingBottom: 16,
          fontFamily: "Inter, sans-serif",
        },
        ...style,
      }}
    >
      <Grid container columns={10} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={10} textAlign="center">
          <Stack
            direction="row"
            alignContent="center"
            justifyContent="space-between"
            style={{ marginBottom: "20px" }}
          >
            <Stack
              direction="row"
              alignContent="center"
              justifyContent="space-between"
              spacing={1}
            >
              <HeadText component="h3">{titleTabPage}</HeadText>
              <Tooltip
                title="Assign roles such as Admin, Manager, or Employee to define the level of access and control each user has. Admins have full access to all settings and can add or remove employees. Managers can approve time-off requests for their teams and view full information about their team members, while Employees can request time off and view only their own information."
                placement="right"
              >
                <IconButton
                  sx={{
                    padding: "6px",
                    height: "fit-content",
                    color: "#98A2B3",
                  }}
                >
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Stack>
            <TextField
              placeholder="Search employee name"
              sx={{ width: "200px" }}
              size="small"
              fullWidth
              color="secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>
        </Grid>

        <PermissionsDialog
          open={isDialogOpen}
          onClose={closeDialog}
          setToast={setToast}
        />

        <PermissionsTable
          contentList={itemsToDisplay}
          sx={{ marginBottom: "40px" }}
          open={openDialog}
        />
        {contentList?.length > PAGE_SIZE && (
          <PagesNavBar
            numOfEntries={contentList.length}
            currentPage={currentPage}
            handlePage={handlePage}
          />
        )}
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ marginTop: "20px", width: "100%" }}
        >
          {/* <HRMButton
            mode="primary"
            enabled={updatedPermissions?.length > 0}
            onClick={openDialog}
          >
            Save changes
          </HRMButton> */}
        </Stack>

        <Toast
          open={toast.open}
          severity={toast.severity}
          message={toast.message}
          onClose={handleCloseToast}
        />
      </Grid>
    </Box>
  );
}
