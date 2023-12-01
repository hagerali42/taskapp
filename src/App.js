import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import "./App.css";
import LanguageSelect from "./components/LanguageSelect";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "eg",
  },
];
function App() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Box display={"flex"} justifyContent={"space-around"}>
        {/* //change language */}
        <LanguageSelect
          currentLanguageCode={currentLanguageCode}
          languages={languages}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
        />
        <Typography variant="h4" gutterBottom>
          {t("header")}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: "20px", minHeight: "30vh" }}>
            <Input />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} style={{ padding: "20px", minHeight: "100vh" }}>
            <TodoList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
export default App;
