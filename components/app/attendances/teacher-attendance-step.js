import { ArrowRight } from "@/components/icons";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { ScooSignaturePad } from "./scoo-signature-pad";
import { useAuth } from "@/hooks/use-auth";

export const TeacherAttendanceStep = (props) => {
  const { onBack, onNext, padRef, padData, handleClear, isSigned, ...other } =
    props;
  const [notSignedAlert, setNotSigned] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!isSigned) padRef.current.fromData(padData, { clear: true });
  }, [padData, padRef, isSigned]);

  const canGoNext = (e) => {
    e.preventDefault();
    if (!padRef.current.isEmpty()) {
      onNext();
    } else {
      setNotSigned(true);
    }
  };
  return (
    <Container maxWidth="sm" {...other}>
      {isSigned ? (
        <div>Already signed</div>
      ) : (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Card variant="outlined" sx={{ mb: 2, px: 1, py: 1 }}>
              <Typography
                variant="overline"
                color="text.secondary"
                component="div"
              >
                Sign here
              </Typography>
              <ScooSignaturePad padRef={padRef} />
            </Card>
            <Typography variant="body2" color="text.secondary" component="div">
              {`I hereby certify that I, as ${user.name} that, am present at the
            training course NAME OF THE COURSE, from the DATE OF START to the
            DATE OF END.`}
            </Typography>
            {notSignedAlert && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="error">
                  <Typography variant="caption">
                    <div>🤷‍♂️ You must signed first.</div>
                  </Typography>
                </Alert>
              </Box>
            )}
          </CardContent>
          <CardActions>
            <Button
              sx={{ mr: "auto" }}
              endIcon={<ArrowRight fontSize="small" />}
              onClick={canGoNext}
              variant="contained"
            >
              Continue
            </Button>
            <Button
              endIcon={<DeleteOutline fontSize="small" />}
              onClick={handleClear}
              variant="outlined"
            >
              Clear
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};
TeacherAttendanceStep.propTypes = {
  onBack: PropTypes.func.isRequired,
  isSigned: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  padRef: PropTypes.object.isRequired,
  padData: PropTypes.array.isRequired,
  handleClear: PropTypes.func.isRequired,
};
