import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import SelectMessage from "../global/SelectMessage";
import axios from "axios";
import { Link } from "react-router-dom";

const Tables = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { database, setTable, setSelected } = useContext(Context);

  const [tables, setTables] = useState([]);

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
              to={"/properties"}
              style={{ textDecoration: "none", color: colors.grey[100] }}
            >
              <h2
                variant="text"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelected("Properties");
                  setTable(params?.row?.name);
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

  useEffect(() => {
    const get = async () => {
      try {
        let rows = [];
        const res = await axios.get(`http://localhost:3000/${database}`);
        res.data.content.map((row, i) => rows.push({ name: row, id: i }));
        setTables(rows);
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, [database]);

  return (
    <Box m="20px">
      <Header
        title="TABLES"
        subtitle={`List of Tables of ${database || "..."}`}
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {!database ? (
          <SelectMessage name="Databases" to="/" />
        ) : (
          <DataGrid
            rows={tables}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Tables;
