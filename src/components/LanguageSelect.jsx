import React from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function LanguageSelect({
  currentLanguageCode,
  languages,
  handleClick,
  handleClose,
  anchorEl,
}) {
  const { t } = useTranslation();

  return (
    <Box className="language-select">
      <Box className="d-flex justify-content-end align-items-center language-select-root">
        <Button
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <LanguageIcon />
        </Button>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Typography variant="body2" color="textSecondary">
              {t("language")}
            </Typography>
          </MenuItem>
          {languages.map(({ code, name, country_code }) => (
            <MenuItem
              key={country_code}
              onClick={() => {
                i18next.changeLanguage(code);
                handleClose();
              }}
            >
              <ReactCountryFlag
                countryCode={country_code.toUpperCase()}
                svg
                style={{
                  opacity: currentLanguageCode === code ? 0.5 : 1,
                  width: "24px",
                  height: "16px",
                  borderRadius: "4px",
                  marginRight: "8px", // Adjust the margin as needed
                }}
              />
              {name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}

export default LanguageSelect;
