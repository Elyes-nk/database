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

const Edit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [databases, setDatabases] = useState([]);

  const { setDatabase, setSelected } = useContext(Context);


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
      <Header title="Edit" subtitle="Edit qq chose" />
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
      ></Box>
    </Box>
  );
};

export default Edit;
