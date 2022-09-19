import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";

const MaterialToggle = ({
  name,
  label1,
  label2,
  value1,
  value2,
  selected,
  handleChange,
  style = {}
}) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        ...style
      }}
    >
      <Box style={{ marginRight: "16px" }}>
        <Typography>{name}</Typography>
      </Box>
      <ToggleButtonGroup
        exclusive={true}
        value={selected}
        onChange={(e, value) => {
          if (value === null) return;
          handleChange(value);
        }}
      >
        <ToggleButton value={value1}>{label1}</ToggleButton>
        <ToggleButton value={value2}>{label2}</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default MaterialToggle;
