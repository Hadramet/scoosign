import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { AccessTime, CheckRounded } from "@mui/icons-material";

export const DailyCourses = (props) => {
  const { dailyCourses, ...other } = props;
  return (
    <Box sx={{ mb: 4, mt: 4, p: 4 }} {...other}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {" "}
        Next Courses{" "}
      </Typography>
      <Timeline position="alternate">
        {dailyCourses && dailyCourses.length > 0 ? (
          dailyCourses.map((activity, index) => (
            <TimelineItem key={activity.date}>
              <TimelineOppositeContent color="text.secondary">
                <Typography
                  sx={{ m: "auto 0" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {format(activity.date, "p")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={activity.isSigned ? "success" : "neutral"}
                  variant="filled"
                >
                  {activity.isSigned ? (
                    <CheckRounded fontsize="small" />
                  ) : (
                    <AccessTime fontsize="small" />
                  )}
                </TimelineDot>
                {dailyCourses.length - 1 > index && (
                  <TimelineConnector
                    sx={{
                      backgroundColor: "divider",
                      minHeight: 30,
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Card
                  sx={{
                    display: "flex",
                    mb: 6,
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h6">
                        {activity.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {activity.room}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                      >
                        {activity.description}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <AvatarGroup max={4}>
                        {new Array(35).fill(0).map((_, index) => (
                          <Avatar
                            key={index}
                            src={`https://i.pravatar.cc/300?img=${Math.floor(
                              Math.random() * 30
                            )}`}
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </Box>
                  <CardActions>
                    <IconButton
                      href={`/app/teachers/attendances/${activity._id}`}
                    >
                      <KeyboardArrowRightIcon fontSize="large" />
                    </IconButton>
                  </CardActions>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <div> No course scheduled</div>
        )}
      </Timeline>
    </Box>
  );
};
DailyCourses.propTypes = {
  dailyCourses: PropTypes.object.isRequired,
};
