import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { PropertyList } from "../../property-list";
import { PropertyListItem } from "../../property-list-items";
import { useMounted } from "../../../hooks/use-mounted";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSWR from "swr";

export const GroupBasicDetails = (props) => {
  const { group, setGroupInfosHandler, ...other } = props;
  const isMounted = useMounted();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const align = smDown ? "vertical" : "horizontal";

  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data: availableParent, error } = useSWR([
    `/api/v1/groups/list/available?limit=20`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  const groupForms = useFormik({
    initialValues: {
      parent: group.data.parent || "",
      description: group.data.description,
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
                disabled={!group.data.active}
                error={Boolean(
                  groupForms.touched.description &&
                    groupForms.errors.description
                )}
                helperText={
                  groupForms.touched.description &&
                  groupForms.errors.description
                }
                value={groupForms.values.description}
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 3,
                }}
              />
            </Box>
          </PropertyListItem>
          <Divider />
          <PropertyListItem
            align={align}
            label="Created By"
            value={
              group.data.created_by.firstName +
              " " +
              group.data.created_by.lastName
            }
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Created At"
            value={new Date(group.data.created_at).toUTCString()}
          />
          <Divider />
          {!group.data.active && (
            <>
              <PropertyListItem
                align={align}
                label="Locked By"
                value={group.data.locked_by || "unknown"}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Locked At"
                value={new Date(group.data.locked_at).toUTCString()}
              />
              <Divider />
            </>
          )}
          {!group.data.active ? (
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
                    availableParent.data.itemsList.map((parent) => (
                      <option key={parent._id} value={parent._id}>
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
