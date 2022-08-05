import { Box } from "@mui/system";
import { default as Head } from "next/head";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "@/components/app/app-layout";
import {
  ArrowBack as ArrowBackIcon,
  FlashOffOutlined,
} from "@mui/icons-material";
import { PencilAlt as PencilAltIcon } from "@/components/icons";
import NextLink from "next/link";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  studentDetailsTabs,
  teacherDetailsTabs,
  userDetailsTabs,
} from "@/lib/user-options-and-tabs";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { getInitials } from "@/lib/get-initials";
import { PropertyList } from "@/components/property-list";
import { PropertyListItem } from "@/components/property-list-items";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { GroupSubGroupItems } from "@/components/app/groups/group-sub-group-items";
import { AddGroupDialog } from "@/components/app/add-group-dialog";

const TeacherDetails = (props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const router = useRouter();
  return (
    <Box>
      <Head>
        <title>App - Teacher Details | ScooSign</title>
      </Head>
      <Container maxWidth="md">
        <div>
          <Box sx={{ mb: 4 }}>
            <NextLink href="/app/teachers" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Teachers</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container justifyContent="space-between" spacing={3}></Grid>
          <Tabs
            indicatorColor="primary"
            scrollButtons="auto"
            sx={{ mt: 3 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {teacherDetailsTabs.map((tab) => (
              <Tab
                disabled={tab.disabled}
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </div>
        <Divider />
        <Box sx={{ mt: 3, mb: 3 }}>
          {currentTab === "details" && (
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};
TeacherDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default TeacherDetails;
