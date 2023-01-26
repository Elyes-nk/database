import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../Context";
import SaveIcon from "@mui/icons-material/Save";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const Edit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const context = location.state?.context || "database";
  const selectedRow = location.state?.selectedRow;

  const [body, setBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { database, table } = useContext(Context);

  const url = `http://localhost:3000/${
    context === "database"
      ? selectedRow
      : context === "table"
      ? database + "/" + selectedRow
      : context === "property"
      ? database + "/" + table + "/" + selectedRow
      : ""
  }`;

  useEffect(() => {
    const get = async () => {
      try {
        const res = await axios.get(url);
        setBody(`{${res.data.content.map((el) => `\n${el}:{...}`)}\n}`);
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, []);

  async function save() {
    setIsLoading(true);
    try {
      await axios.post(url, body, {
        headers: {
          "Content-type": "text/plain",
        },
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box m="20px">
      <Header
        title="Edit"
        subtitle={`Edit ${context} ${
          context === "table"
            ? "in database " + database
            : context === "property"
            ? "in table " + table
            : ""
        }`}
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
        <Typography
          variant="h3"
          color={colors.grey[100]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {selectedRow}
        </Typography>
        <Typography
          variant="h4"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {context === "database"
            ? "Tables"
            : context === "table"
            ? "Properties"
            : "Body"}
        </Typography>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <TextareaAutosize
            aria-label="empty textarea"
            style={{
              width: "100%",
              backgroundColor: colors.grey[900],
              color: colors.grey[100],
            }}
            minRows="10"
            onChange={(e) => setBody(e.target.value)}
            placeholder={body}
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

export default Edit;
