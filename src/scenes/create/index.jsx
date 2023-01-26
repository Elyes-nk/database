import { Box, InputBase, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../Context";
import SaveIcon from "@mui/icons-material/Save";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const context = location.state?.context || "database";
  const [name, setName] = useState("");
  const [body, setBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { database, table, property } = useContext(Context);
  const navigate = useNavigate();

  const url = `http://localhost:3000/${
    context === "database"
      ? name
      : context === "table"
      ? database + "/" + name
      : context === "property"
      ? database + "/" + table + "/" + name
      : ""
  }`;

  async function save() {
    setIsLoading(true);
    try {
      await axios.put(url, body, {
        headers: {
          "Content-type": "text/plain",
        },
      });
      setIsLoading(false);
      navigate(
        context === "property"
          ? "/properties"
          : context === "table"
          ? "/tables"
          : "/"
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box m="20px">
      <Header
        title="Create"
        subtitle={` ${
          context === "table"
            ? database + "/"
            : context === "property"
            ? database + "/" + table + "/"
            : ""
        }Create ${context}`}
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
        }}
      >
        <Typography
          variant="h4"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Name
        </Typography>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, m: "15px 0 15px 20px" }}
            placeholder={`Insert a ${context} name...`}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Typography
          variant="h4"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Body
        </Typography>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{
              width: "100%",
              backgroundColor: colors.grey[900],
              color: colors.grey[100],
            }}
            minRows="10"
            onChange={(e) => setBody(e.target.value)}
          />
        </Box>
        <Box
          width="100px"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[600]}
          borderRadius="4px"
          marginTop="10px"
          onClick={() => save()}
        >
          <SaveIcon />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {isLoading ? "Saving..." : "Save "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
