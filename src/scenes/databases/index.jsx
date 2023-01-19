import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import axios from "axios";

const Databases = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // {
    //   field: "name",
    //   headerName: "Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "name",
      headerName: "Name lol",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {params}
          </Typography>
        );
      },
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
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <EditIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Edit
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "delete",
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
            backgroundColor={colors.redAccent[600]}
            borderRadius="4px"
          >
            <DeleteOutlineIcon />
            <Typography color={colors.primary[100]} sx={{ ml: "5px" }}>
              Delete
            </Typography>
          </Box>
        );
      },
    },
  ];

  const [databases, setDatabases] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        let rows = [];
        const res = await axios.get(`http://localhost:3000/`);
        res.data.content.map((row, i) => rows.push({ name: row, id: i }));
        setDatabases(rows);
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, []);

  return (
    <Box m="20px">
      <Header title="DATABASES" subtitle="List of Databases" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={databases}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Databases;
