import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Drawer, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import StopForm from "./StopForm";
import MaterialInput from "./formElements/MaterialInput";
import MaterialToggle from "./formElements/MaterialToggle";

const RouteForm = (props) => {
  const [stopFormModal, setStopFormModal] = useState(false);
  const navigate = useNavigate();
  const {
    actions: { createRoute, createStop },
    existingRoutes,
    existingStops
  } = props;

  const saveRoute = (values) => {
    values.stops.map((stop) => {
      stop.id = existingStops[stop.name.toUpperCase()];
      return stop;
    });
    createRoute(values);
    navigate("/");
  };

  const saveStop = (values) => {
    if (!values) {
      setStopFormModal(false);
      return;
    }
    createStop(values);
    setStopFormModal(false);
  };

  const openForm = (val) => {
    setStopFormModal(val);
  };

  const getPosition = (index) => {
    let num = 1 + parseInt(index);
    switch (num % 10) {
      case 1:
        return num + "st";
      case 2:
        return num + "nd";
      case 3:
        return num + "rd";
      default:
        return num + "th";
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      direction: true,
      status: true,
      stops: ["", ""]
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("Required")
        .test(
          "existing id check",
          "ID already being used",
          (val) => !existingRoutes.includes(val)
        ),
      name: Yup.string()
        .matches(/^([1-9])\d*$/, "Please enter only numbers")
        .required("Required"),
      direction: Yup.boolean().required("Required"),
      status: Yup.boolean().required("Required"),
      stops: Yup.array()
        .of(
          Yup.object({
            id: Yup.string(),
            name: Yup.string()
              .max(30, "Please enter 30 characters or less")
              .required("Required")
              .test(
                "existing stop check",
                "This stop doesn't exist",
                (val) => val && existingStops.hasOwnProperty(val.toUpperCase())
              )
          })
        )
        .test("min stops", "Need at least two stops", (val) => val.length >= 2)
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      saveRoute({ ...values });
    }
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue
  } = formik;
  const { id, name, direction, status, stops } = values;

  return (
    <Box style={{ margin: "0 16px", textAlign: "center" }}>
      <Typography variant="h5" style={{ margin: "4px 0 12px" }}>
        Enter Route Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <MaterialInput
              label="ID"
              identifier="id"
              value={id}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.id}
              touched={touched.id}
            />
          </Grid>
          <Grid item xs={6}>
            <MaterialInput
              label="Name of route"
              identifier="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
            />
          </Grid>
        </Grid>
        <Box style={{ display: "flex", margin: "12px 0 24px" }}>
          <MaterialToggle
            name="Direction"
            value1={true}
            value2={false}
            label1="up"
            label2="down"
            selected={direction}
            handleChange={(v) => setFieldValue("direction", v)}
          />
          <MaterialToggle
            name="Status"
            value1={true}
            value2={false}
            style={{ marginLeft: "24px" }}
            label1="active"
            label2="inactive"
            selected={status}
            handleChange={(v) => setFieldValue("status", v)}
          />
        </Box>
        {stops.map((stop, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <MaterialInput
              label={`Name of ${getPosition(index)} stop`}
              identifier={`stops[${index}].name`}
              value={stops[index].name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.stops && errors.stops[index]?.name}
              touched={touched.stops && touched.stops[index]?.name}
              helperFunction={openForm}
            />
            {index > 1 && (
              <Typography
                style={{ marginLeft: "12px", marginBottom: "16px" }}
                onClick={() => {
                  const newStops = [...stops];
                  newStops.splice(index, 1);
                  setFieldValue("stops", [
                    ...newStops
                    // ...stops.slice(0, index - 1),
                    // ...stops.slice(index + 1, stops.length - 1)
                  ]);
                }}
              >
                Remove stop
              </Typography>
            )}
          </Box>
        ))}
        <Typography
          style={{ margin: "12px 0 24px" }}
          onClick={() => {
            // if (Object.keys(errors).length) return;
            setFieldValue("stops", [...stops, { name: "", id: "" }]);
          }}
        >
          Add another stop
        </Typography>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          type="submit"
          onClick={() => {
            console.log(errors);
          }}
        >
          Submit
        </Button>
      </form>
      <Drawer open={stopFormModal} anchor="bottom">
        <StopForm
          save={saveStop}
          cancel={() => saveStop()}
          presetName={stopFormModal}
        />
      </Drawer>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  existingRoutes: state.routeList.map((route) => route.id),
  existingStops: state.stopList.reduce(
    (result, stop) => ({ ...result, [stop.name.toUpperCase()]: stop.id }),
    {}
  )
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    createRoute: (values) => dispatch({ type: "SAVE_ROUTE", payload: values }),
    createStop: (values) => dispatch({ type: "SAVE_STOP", payload: values })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteForm);
