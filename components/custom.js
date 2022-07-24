import "simplebar/dist/simplebar.min.css";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import SimpleBar from "simplebar-react";

const ScrollbarRoot = styled(SimpleBar)``;

export const Scrollbar = forwardRef((props, ref) => {
  return <ScrollbarRoot ref={ref} {...props} />;
});
