import {
  Button,
  Card,
  CardActions, CardHeader, Divider, TextField, useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { PropertyList } from "../../property-list";
import { PropertyListItem } from "../../property-list-items";
import { useMounted } from "../../../hooks/use-mounted";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getRandomGroups } from "../../../faker/fakeDatas";

export const GroupBasicDetails = (props) => {
  const { group, setGroupInfosHandler, ...other } = props;
  const isMounted = useMounted();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const align = smDown ? "vertical" : "horizontal";
  const [availableParent, setAvailableParent] = useState([]);

  useEffect(() => {
    if (isMounted)
      getAvailableParent();
  }, [isMounted]);

  // Fetch available parent from api
  const getAvailableParent = async () => {
    const response = await new Promise((resolve) => resolve(getRandomGroups(50)));
    console.log("[LOAD AVAILABLE PARENT]", response);
    setAvailableParent(response);
  };

  const groupForms = useFormik({
    initialValues: {
      parent: group.root_groups || "",
      description: group.description,
    },
    validationSchema: Yup.object({
      parent: Yup.string(),
      description: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await setGroupInfosHandler(values);
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={groupForms.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Basic info" />
        <Divider />
        <PropertyList>
          <PropertyListItem align={align} label="Description">
            <Box
              sx={{
                display: "flex",
                mt: 3,
                alignItems: "center",
              }}
            >
              <TextField
                label="Description"
                name="description"
                onBlur={groupForms.handleBlur}
                onChange={groupForms.handleChange}
                error={Boolean(
                  groupForms.touched.description &&
                  groupForms.errors.description
                )}
                helperText={groupForms.touched.description &&
                  groupForms.errors.description}
                value={groupForms.values.description}
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 3,
                }} />
            </Box>
          </PropertyListItem>
          <Divider />
          <PropertyListItem
            align={align}
            label="Created By"
            value={group.created_by} />
          <Divider />
          <PropertyListItem
            align={align}
            label="Created At"
            value={group.created_at} />
          <Divider />
          {group.locked && (
            <>
              <PropertyListItem
                align={align}
                label="Locked By"
                value={group.locked_by} />
              <Divider />
              <PropertyListItem
                align={align}
                label="Locked At"
                value={group.locked_at} />
              <Divider />
            </>
          )}
          {group.locked ? (
            <></>
          ) : (
            <PropertyListItem align={align} label="Set Parent">
              <Box
                sx={{
                  alignItems: {
                    sm: "center",
                  },
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  mx: -1,
                }}
              >
                <TextField
                  label="Parent"
                  margin="normal"
                  name="parent"
                  select
                  onBlur={groupForms.handleBlur}
                  onChange={groupForms.handleChange}
                  error={Boolean(
                    groupForms.touched.parent && groupForms.errors.parent
                  )}
                  value={groupForms.values.parent}
                  SelectProps={{ native: true }}
                  sx={{
                    flexGrow: 1,
                    m: 1,
                    minWidth: 150,
                  }}
                >
                  <option></option>
                  {availableParent &&
                    availableParent.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                </TextField>
              </Box>
            </PropertyListItem>
          )}
        </PropertyList>
        <Divider />
        <CardActions>
          <Button
            sx={{ mr: -1, ml: "auto" }}
            type="submit"
            disabled={groupForms.isSubmitting}
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
GroupBasicDetails.propTypes = {
  group: PropTypes.object,
  setGroupInfosHandler: PropTypes.func.isRequired,
};
