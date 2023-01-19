import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import MouseIcon from "@mui/icons-material/Mouse";
import { Link } from "react-router-dom";

const SelectMessage = ({ name, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const error = [
    {
      id: 1,
      name: `Select an element in ${name}`,
    },
  ];

  const columns = [
    {
      field: "name",
      headerName: "",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "edit",
      headerName: "",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[600]}
            borderRadius="4px"
          >
            <MouseIcon />
            <Typography color={colors.primary[100]} sx={{ ml: "5px" }}>
              <Link to={to}>{name}</Link>
            </Typography>
          </Box>
        );
      },
    },
  ];

  return <DataGrid rows={error} columns={columns} />;
};

export default SelectMessage;
