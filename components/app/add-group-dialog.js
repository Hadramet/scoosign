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
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSWR from "swr";
import { Scrollbar } from "../custom";

export const AddGroupDialog = (props) => {
  const { open, onClose, handleGroupResult, ...other } = props;
  const [groupsToAdd, setGroupToAdd] = useState([]);
  const [nbGroups, setNbGroups] = useState(10);
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data: availableGroup, error } = useSWR([
    `/api/v1/groups?page=1&limit=${nbGroups}`,
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
      setGroupToAdd([]);
    }
  }, [open]);
  const groupForms = useFormik({
    initialValues: {
      groupToAdd: [],
    },
    validationSchema: Yup.object({
      groupToAdd: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(groupsToAdd);
        handleGroupResult(groupsToAdd);
        onClose();
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  if (!availableGroup) return "loading";
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
                  name="groupsToAdd"
                  label="Groups"
                  sx={{
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {availableGroup &&
                    availableGroup.data?.itemsList?.map((group) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={groupsToAdd.indexOf(group) > -1}
                            onChange={(e) => {
                              if (groupsToAdd.indexOf(group) > -1)
                                setGroupToAdd(
                                  groupsToAdd.filter(
                                    (item) => item._id != group._id
                                  )
                                );
                              else setGroupToAdd([...groupsToAdd, group]);
                            }}
                          />
                        }
                        key={group._id}
                        label={group.name}
                        value={group._id}
                      />
                    ))}
                </FormGroup>
              </Scrollbar>
            </Box>

            <MenuItem value="">
              <em>
                <Button
                  disabled={nbGroups >= availableGroup.data?.paginator?.itemCount}
                  onClick={(e) => {
                    setNbGroups(nbGroups + 10);
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
AddGroupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleGroupResult: PropTypes.func.isRequired,
};
