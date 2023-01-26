import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import AddIcon from "@mui/icons-material/Add";
const Databases = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [databases, setDatabases] = useState([]);

  const { setDatabase, setSelected } = useContext(Context);

  async function deleteRow(name) {
    try {
      await axios.delete(`http://localhost:3000/${name}`);
    } catch (err) {
      console.log(err);
    }
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/tables"}
              style={{ textDecoration: "none", color: colors.grey[100] }}
            >
              <h2
                variant="text"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelected("Tables");
                  setDatabase(params?.row?.name);
                }}
              >
                {params?.formattedValue}
              </h2>
            </Link>
          </>
        );
      },
    },
    {
      field: "edit",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
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
              <Link
                to={"/edit"}
                state={{ context: "database", selectedRow: params?.row?.name }}
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                Edit
              </Link>
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.redAccent[600]}
            borderRadius="4px"
            onClick={() => deleteRow(params?.row?.name)}
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
      <Header title="DATABASES" subtitle="Databases" />
      <Link
        to={"/create"}
        state={{ context: "database" }}
        style={{ textDecoration: "none", color: colors.grey[100] }}
      >
        <Box
          width="160px"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[600]}
          borderRadius="4px"
          marginTop="10px"
        >
          <AddIcon />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Create new database
          </Typography>
        </Box>
      </Link>

      <Box
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
