import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import MaterialInput from "./formElements/MaterialInput";

const StopForm = (props) => {
  const { presetName, save, cancel } = props;
  const formik = useFormik({
    initialValues: {
      id: "",
      name: presetName,
      lat: "",
      lng: ""
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Required"),
      name: Yup.string()
        .matches(/^[a-zA-Z0-9\s,'-]*$/, "Please enter a valid name")
        .required("Required"),
      lat: Yup.string()
        .matches(/\d+\.?\d*/, "Please enter a valid cooridnate")
        .required("Required"),
      lng: Yup.string()
        .matches(/\d+\.?\d*/, "Please enter a valid cooridnate")
        .required("Required")
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      save(values);
    }
  });

  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit
  } = formik;
  const { id, name, lat, lng } = values;
  return (
    <Box
      style={{
        padding: "16px",
        textAlign: "center"
      }}
    >
      <Typography variant="h5" style={{ margin: "4px 0 12px" }}>
        Enter Stop Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <MaterialInput
          label="ID"
          identifier="id"
          value={id}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.id}
          touched={touched.id}
        />
        <MaterialInput
          label="Name of stop"
          identifier="name"
          disabled
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
        />
        <MaterialInput
          label="Latitude"
          identifier="lat"
          value={lat}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lat}
          touched={touched.lat}
        />
        <MaterialInput
          label="Longitude"
          identifier="lng"
          value={lng}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lng}
          touched={touched.lng}
        />
        <Box style={{ margin: "8px 0" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                fullWidth
                size="medium"
                variant="outlined"
                onClick={cancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth size="medium" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default StopForm;
