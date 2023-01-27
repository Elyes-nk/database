import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import SelectMessage from "../global/SelectMessage";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const Properties = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { database, table, setProperty } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [params, setParams] = useState([]);

  const get = async () => {
    try {
      let rows = [];
      const res = await axios.get(
        `http://localhost:3000/${database}/${table}${
          params.length > 0
            ? `?${params.map((param) => param.name + "=" + param.value)}`
            : ""
        }`
      );
      res.data.content.map((row, i) => rows.push({ ...row, id: i }));
      setProperties(rows);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get();
  }, []);

  async function deleteRow(name) {
    try {
      await axios.delete(`http://localhost:3000/${database}/${table}/${name}`);
      get();
    } catch (err) {
      console.log(err);
    }
  }

  async function onSearch() {
    get();
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
              to={"/properties"}
              style={{ textDecoration: "none", color: colors.grey[100] }}
            >
              <h2
                variant="text"
                style={{ cursor: "pointer" }}
                onClick={() => setProperty(params?.row?.name)}
              >
                {params?.formattedValue}
              </h2>
            </Link>
          </>
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
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
                state={{ context: "property", selectedRow: params?.row?.name }}
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

  return (
    <Box m="20px">
      <Header
        title="PROPERTIES"
        subtitle={`${
          database && table
            ? database + "/" + table + "/Properties"
            : "no database/table selected"
        }`}
      />
      <Link
        to={"/create"}
        state={{ context: "property" }}
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
            Create new property
          </Typography>
        </Box>
      </Link>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        marginTop="20px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          onChange={(e) => setParams([e.target.value])}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={() => onSearch()}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box
        m="5px 0 0 0"
        height="63vh"
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
        {!database && !table ? (
          <SelectMessage name="Tables" to="/tables" />
        ) : (
          <DataGrid
            rows={properties}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Properties;
