import {
  Button,
  Card,
  CardActions,
  CardContent, Checkbox, Dialog,
  Divider, ListItemText,
  MenuItem, Select, Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getRandomGroups } from "@/faker/fakeDatas";

export const AddGroupDialog = (props) => {
  const { open, onClose, handleGroupResult, ...other } = props;
  const [availableGroup, setAvailableGroup] = useState([]);
  useEffect(() => {
    if (open) {
      setAvailableGroup([]);
      groupForms.resetForm();
      getAvailableGroup();
    }
  }, [open, groupForms]);

  const getAvailableGroup = async () => {
    const response = await new Promise(async (resolve) => resolve(await getRandomGroups(5))
    );
    console.log("TODO get available groups");
    setAvailableGroup(response);
  };
  const groupForms = useFormik({
    initialValues: {
      groupsToAdd: [],
    },
    validationSchema: Yup.object({
      groupsToAdd: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const value_to_add = [];
        values.groupsToAdd.map((group) => value_to_add.push({ id: group.id, name:group.name }));
        console.log(value_to_add);
        handleGroupResult(value_to_add)
        onClose();
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open} {...other}>
      <Card>
        <form onSubmit={groupForms.handleSubmit}>
          <CardContent>
            <div>
              <Typography variant="h6">Add Groups</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Click on the group and save your selections.
              </Typography>
            </div>
            <Divider
              sx={{
                mt: 3,
                mb: 3,
              }} />
            <Select
              label="Groups"
              displayEmpty
              //   value={groups}
              onBlur={groupForms.handleBlur}
              onChange={groupForms.handleChange}
              error={Boolean(
                groupForms.touched.parent && groupForms.errors.parent
              )}
              value={groupForms.values.groupsToAdd}
              name="groupsToAdd"
              fullWidth
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <Typography color="textSecondary" variant="body2">
                    Groups selected : {selected.length}
                  </Typography>
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Select groups</em>
              </MenuItem>
              {availableGroup &&
                availableGroup.map((group) => (
                  <MenuItem key={group.id} value={group}>
                    <Checkbox
                      checked={groupForms.values.groupsToAdd.indexOf(group) > -1} />
                    <ListItemText primary={group.name} />
                  </MenuItem>
                ))}
            </Select>
          </CardContent>
          <CardActions>
            <Button sx={{ ml: "auto" }} onClick={onClose}>
              Cancel
            </Button>
            <Button sx={{ ml: 1 }} type="submit" variant="contained">
              Confirm
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
};
AddGroupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleGroupResult: PropTypes.func.isRequired,
};
