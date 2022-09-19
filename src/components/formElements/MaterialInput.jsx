import React from "react";
import { TextField, InputAdornment, Typography } from "@material-ui/core";

const MaterialInput = ({
  label,
  identifier,
  value,
  error,
  touched,
  helperFunction,
  ...restProps
}) => (
  <TextField
    variant="filled"
    fullWidth={true}
    margin="dense"
    label={label}
    name={identifier}
    key={identifier}
    value={value}
    helperText={(Boolean(touched) && error) || " "}
    error={Boolean(error) && Boolean(touched)}
    InputProps={{
      endAdornment:
        error === "This stop doesn't exist" && helperFunction ? (
          <InputAdornment position="end">
            <Typography onClick={() => helperFunction(value)}>
              Add new stop
            </Typography>
          </InputAdornment>
        ) : null
    }}
    {...restProps}
  />
);

export default MaterialInput;
