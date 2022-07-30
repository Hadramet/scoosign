import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  Divider,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getRandomUser } from "@/faker/fakeDatas";

export const AddStudentDialog = (props) => {
  const { open, onClose, handleResult, ...other } = props;
  const [availableStudents, setAvailableStudents] = useState([]);
  useEffect(() => {
    if (open) {
      setAvailableStudents([]);
      form.resetForm();
      getAvailableStudents();
    }
  }, [open, form]);

  const getAvailableStudents = async () => {
    const response = await new Promise((resolve) =>
      resolve(getRandomUser(15))
    );
    console.log("TODO get available students");
    setAvailableStudents(response);
  };
  const form = useFormik({
    initialValues: {
      studentsToAdd: [],
    },
    validationSchema: Yup.object({
      studentsToAdd: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const value_to_add = [];
        values.studentsToAdd.map((o) =>
          value_to_add.push({ id: o.id, name: o.firstName+" "+o.lastName })
        );
        console.log(value_to_add);
        handleResult(value_to_add);
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
        <form onSubmit={form.handleSubmit}>
          <CardContent>
            <div>
              <Typography variant="h6">Add Students</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Click on the student and save your selections.
              </Typography>
            </div>
            <Divider
              sx={{
                mt: 3,
                mb: 3,
              }}
            />
            <Select
              label="Students"
              displayEmpty
              //   value={groups}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={Boolean(
                form.touched.studentsToAdd && form.errors.studentsToAdd
              )}
              value={form.values.studentsToAdd}
              name="studentsToAdd"
              fullWidth
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <Typography color="textSecondary" variant="body2">
                    Students selected : {selected.length}
                  </Typography>
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Select students</em>
              </MenuItem>
              {availableStudents &&
                availableStudents.map((o) => (
                  <MenuItem key={o.id} value={o}>
                    <Checkbox
                      checked={form.values.studentsToAdd.indexOf(o) > -1}
                    />
                    <ListItemText primary={o.firstName + " " + o.lastName} />
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
AddStudentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleResult: PropTypes.func.isRequired,
};
