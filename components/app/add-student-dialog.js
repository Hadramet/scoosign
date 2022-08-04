import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  FormGroup,
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
import { Scrollbar } from "../custom";
import useSWR from "swr";

export const AddStudentDialog = (props) => {
  const { open, onClose, handleResult, groupParentId, ...other } = props;
  // // const [availableStudents, setAvailableStudents] = useState([]);

  const [studentsToAdd, setStudentsToAdd] = useState([]);
  const [nbStudent, setNbStudent] = useState(10);
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data: availableStudents, error } = useSWR([
    `${
      groupParentId
        ? `/api/v1/groups/${groupParentId}/students?page=1&limit=${nbStudent}`
        : `/api/v1/students?page=1&limit=${nbStudent}`
    }`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);
  useEffect(() => {
    if (open) {
      setStudentsToAdd([]);
      // // form.resetForm();
      // // getAvailableStudents();
    }
  }, [open, form]);

  // // const getAvailableStudents = async () => {
  // //   const response = await new Promise((resolve) => resolve(getRandomUser(15)));
  // //   console.log("TODO get available students");
  // //   setAvailableStudents(response);
  // // };
  const form = useFormik({
    initialValues: {
      studentsToAddForm: [],
    },
    validationSchema: Yup.object({
      studentsToAddForm: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleResult(studentsToAdd);
        onClose();
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  if(!availableStudents) return "loading"
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
            <Box
              sx={{
                backgroundColor: "background.default",
                borderColor: "divider",
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 1,
                mt: 2,
              }}
            >
              <Scrollbar sx={{ maxHeight: 300 }}>
                <FormGroup
                  name="studentsToAdd"
                  label="Students"
                  sx={{
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {availableStudents &&
                    availableStudents.data?.itemsList?.map((student) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={studentsToAdd.indexOf(student) > -1}
                            onChange={(e) => {
                              if (studentsToAdd.indexOf(student) > -1)
                                setGroupToAdd(
                                  studentsToAdd.filter(
                                    (item) => item._id != group._id
                                  )
                                );
                              else
                                setStudentsToAdd([...studentsToAdd, student]);
                            }}
                          />
                        }
                        key={student._id}
                        label={student.user.firstName+' '+student.user.lastName}
                        value={student._id}
                      />
                    ))}
                </FormGroup>
              </Scrollbar>
            </Box>
            <MenuItem value="">
              <em>
                <Button
                  disabled={nbStudent >= availableStudents.data?.paginator?.itemCount}
                  onClick={(e) => {
                    setNbStudent(nbStudent + 10);
                  }}
                  variant="text"
                  sx={{ ml: "auto" }}
                >
                  Load More
                </Button>{" "}
              </em>
            </MenuItem>
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
  groupParentId: PropTypes.string,
};
