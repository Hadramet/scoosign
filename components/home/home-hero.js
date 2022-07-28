import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from "../icons";

export const HomeHero = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 6,
      }}
      {...props}
    >
      <Container
        maxWidth="md"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography color="primary" variant="overline">
          Introducing
        </Typography>
        <Typography align="center" variant="h1">
          School Signe v1.0
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          OLorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrials standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </Typography>
        <Box
          sx={{
            alignItems: {
              sm: "center",
              xs: "flex-start",
            },
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            py: 3,
            m: -1,
            "& > *": {
              m: 1,
            },
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Available For:
          </Typography>
          {["Pedagogic", "Student", "Teacher"].map((item) => (
            <Box
              key={item}
              sx={{
                alignItems: "center",
                display: "flex",
                m: 2,
              }}
            >
              <CheckCircleOutlinedIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">{item}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mx: -1,
            mt: 2,
            mb: 6,
            "& > a": {
              m: 1,
            },
          }}
        ></Box>
      </Container>
    </Box>
  );
};
