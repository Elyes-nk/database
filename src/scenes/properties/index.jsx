import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import SelectMessage from "../global/SelectMessage";
import axios from "axios";

const Properties = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
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

  const { database, table } = useContext(Context);

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const get = async () => {
      try {
        let rows = [];
        const res = await axios.get(
          `http://localhost:3000/${database}/${table}`
        );
        res.content.map((row) => rows.push({ name: row }));
        setProperties(rows);
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, [database, table]);

  return (
    <Box m="20px">
      <Header
        title="PROPERTIES"
        subtitle={`List of Properties of Table ${table || "..."}`}
      />
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
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
        {!database && !table ? (
          <SelectMessage name="Tables" to="/tables" />
        ) : (
          <DataGrid rows={properties} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Properties;
