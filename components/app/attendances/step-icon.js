import { CheckCircleOutlined } from "@/components/icons";
import { Avatar } from "@mui/material";

export const StepIcon = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: "secondary.main",
          color: "secondary.contrastText"
        })
      }}
      variant="rounded"
    >
      {completed ? <CheckCircleOutlined fontSize="small" /> : icon}
    </Avatar>
  );
};
