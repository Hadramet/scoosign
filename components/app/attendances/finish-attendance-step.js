import { ArrowRight } from "@/components/icons";
import {
  Alert,
  Avatar, Box,
  Button, IconButton, TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import {
  Plus as PlusIcon,
  Photograph as PhotographIcon,
  PaperClip as PaperClipIcon,
  Link as LinkIcon,
  EmojiHappy as EmojiHappyIcon
} from "@/components/icons";
import { getInitials } from "@/lib/get-initials";

export const FinishAttendanceStep = (props) => {
  const { onBack, onNext, setComment, ...other } = props;

  const onCommentValueChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div {...other}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{
            height: 40,
            mr: 2,
            width: 40
          }}
        >
          {getInitials("TO" + " " + "DO")}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            onChange={onCommentValueChange}
            placeholder="Add a comment"
            rows={3}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper"
              }
            }} />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              mt: 3
            }}
          >
            <IconButton
              sx={{
                display: {
                  xs: "inline-flex",
                  sm: "none"
                }
              }}
            >
              <PlusIcon fontSize="small" />
            </IconButton>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block"
                },
                m: -1,
                "& > *": {
                  m: 1
                }
              }}
            >
              <IconButton disabled>
                <PhotographIcon fontSize="small" />
              </IconButton>
              <IconButton disabled>
                <PaperClipIcon fontSize="small" />
              </IconButton>
              <IconButton disabled>
                <LinkIcon fontSize="small" />
              </IconButton>
              <IconButton disabled>
                <EmojiHappyIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4, mb: 3 }}>
        <Alert severity="warning">
          <Typography variant="caption">
            <div>
              Make sure that all the information has been filled in correctly,
              once completed you can never go back.
            </div>
          </Typography>
        </Alert>
      </Box>
      <Button
        endIcon={<ArrowRight fontSize="small" />}
        onClick={onNext}
        variant="contained"
      >
        Complete
      </Button>
      <Button onClick={onBack} sx={{ ml: 2 }}>
        Back
      </Button>
    </div>
  );
};
FinishAttendanceStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  setComment: PropTypes.func
};
