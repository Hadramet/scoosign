import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/timeline/main.css";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Head from "next/head";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";

import ViewConfigIcon from "@mui/icons-material/ViewComfy";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import {
  addDays,
  endOfDay,
  format,
  setHours,
  setMinutes,
  startOfDay,
  subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Plus } from "@/components/icons";

const { AppLayout } = require("@/components/app/app-layout");
const { AuthGuard } = require("@/components/authentication/auth-guard");
const { RoleGuard } = require("@/components/authentication/role-guard");

const FullCalendarWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
  "& .fc-license-message": {
    display: "none",
  },
  "& .fc": {
    "--fc-bg-event-opacity": 1,
    "--fc-border-color": theme.palette.divider,
    "--fc-daygrid-event-dot-width": "10px",
    "--fc-event-text-color": theme.palette.primary.contrastText,
    "--fc-list-event-hover-bg-color": theme.palette.background.default,
    "--fc-neutral-bg-color": theme.palette.background.default,
    "--fc-page-bg-color": theme.palette.background.default,
    "--fc-today-bg-color": alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  "& .fc .fc-col-header-cell-cushion": {
    paddingBottom: "10px",
    paddingTop: "10px",
    fontSize: theme.typography.overline.fontSize,
    fontWeight: theme.typography.overline.fontWeight,
    letterSpacing: theme.typography.overline.letterSpacing,
    lineHeight: theme.typography.overline.lineHeight,
    textTransform: theme.typography.overline.textTransform,
  },
  "& .fc .fc-day-other .fc-daygrid-day-top": {
    color: theme.palette.text.secondary,
  },
  "& .fc-daygrid-event": {
    borderRadius: theme.shape.borderRadius,
    padding: "0px 4px",
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  },
  "& .fc-daygrid-block-event .fc-event-time": {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
  },
  "& .fc-daygrid-day-frame": {
    padding: "12px",
  },
}));

const now = new Date();

let events = [
  {
    id: "5e8882e440f6322fa399eeb8",
    allDay: false,
    color: "#FFB020",
    description: "Test event",
    end: setHours(setMinutes(subDays(now, 6), 0), 19).getTime(),
    start: setHours(setMinutes(subDays(now, 6), 30), 17).getTime(),
    title: "4PROJ TEST",
  },
  {
    id: "5e8882eb5f8ec686220ff131",
    allDay: false,
    color: "#14B8A6",
    description: "",
    end: setHours(setMinutes(addDays(now, 2), 30), 15).getTime(),
    start: setHours(setMinutes(addDays(now, 2), 0), 12).getTime(),
    title: "4MERN",
  },
  {
    id: "5e8882f1f0c9216396e05a9b",
    allDay: false,
    color: "#2196F3",
    description: "",
    end: setHours(setMinutes(addDays(now, 5), 0), 12).getTime(),
    start: setHours(setMinutes(addDays(now, 5), 0), 8).getTime(),
    title: "2MATH",
  },
  {
    id: "5e8882f6daf81eccfa40dee2",
    allDay: true,
    color: "#D14343",
    description: "",
    end: startOfDay(subDays(now, 11)).getTime(),
    start: endOfDay(subDays(now, 12)).getTime(),
    title: "3DOCKER",
  },
  {
    id: "5e8882fcd525e076b3c1542c",
    allDay: false,
    color: "#14B8A6",
    description: "Sorry, John!",
    end: setHours(setMinutes(addDays(now, 3), 31), 7).getTime(),
    start: setHours(setMinutes(addDays(now, 3), 30), 7).getTime(),
    title: "1ALGO",
  },
  {
    id: "5e888302e62149e4b49aa609",
    allDay: false,
    color: "#10B981",
    description: "",
    end: setHours(setMinutes(subDays(now, 6), 30), 9).getTime(),
    start: setHours(setMinutes(subDays(now, 6), 0), 9).getTime(),
    title: "5SECU",
  },
  {
    id: "5e88830672d089c53c46ece3",
    allDay: false,
    color: "#2196F3",
    description: "",
    end: setHours(setMinutes(now, 30), 17).getTime(),
    start: setHours(setMinutes(now, 30), 15).getTime(),
    title: "2ENG",
  },
];
const viewOptions = [
  {
    icon: ViewConfigIcon,
    label: "Month",
    value: "dayGridMonth",
  },
  {
    icon: ViewWeekIcon,
    label: "Week",
    value: "timeGridWeek",
  },
  {
    icon: ViewDayIcon,
    label: "Day",
    value: "timeGridDay",
  },
  {
    icon: ViewAgendaIcon,
    label: "Agenda",
    value: "listWeek",
  },
];
const CalendarToolbar = (props) => {
  const {
    date,
    mobile,
    onAddClick,
    onDateNext,
    onDatePrev,
    onDateToday,
    onViewChange,
    view,
    ...other
  } = props;

  const handleViewChange = (event) => {
    onViewChange?.(event.target.value);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        px: 3,
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mb: {
            xs: 2,
            md: 0,
          },
          mr: 2,
        }}
      >
        <Typography variant="h5">{format(date, "MMMM")}</Typography>
        <Typography
          sx={{
            fontWeight: 400,
            ml: 1,
          }}
          variant="h5"
        >
          {format(date, "y")}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          flexWrap: "wrap",
          display: "flex",
          m: -1,
        }}
      >
        <Box sx={{ m: 1 }}>
          <IconButton onClick={onDatePrev}>
            <ChevronLeft fontSize="small" />
          </IconButton>
          <IconButton onClick={onDateNext}>
            <ChevronRight fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          label="View"
          name="view" disabled
          onChange={handleViewChange}
          select
          size="small"
          value={view}
          sx={{
            ml: {
              xs: "auto",
              md: 1,
            },
            m: 1,
            minWidth: 120,
          }}
          SelectProps={{ native: true }}
        >
          {viewOptions.map((viewOption) => {
            // On mobile allow only timeGridDay and agenda views
            if (
              mobile &&
              !["timeGridDay", "listWeek"].includes(viewOption.value)
            ) {
              return null;
            }

            return (
              <option key={viewOption.value} value={viewOption.value}>
                {viewOption.label}
              </option>
            );
          })}
        </TextField>
        <Button disabled
          onClick={onAddClick}
          startIcon={<Plus fontSize="small" />}
          sx={{
            m: 1,
            order: {
              xs: -1,
              md: 0,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
          variant="contained"
        >
          New Event
        </Button>
      </Box>
    </Box>
  );
};

CalendarToolbar.propTypes = {
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  mobile: PropTypes.bool,
  onAddClick: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf([
    "dayGridMonth",
    "timeGridWeek",
    "timeGridDay",
    "listWeek",
  ]).isRequired,
};
const Calendar = () => {
  const calendarRef = useRef(null);
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(smDown ? "timeGridDay" : "dayGridMonth");

  const handleDateToday = () => {
    //TODO
  };

  const handleViewChange = (newView) => {
    //TODO
  };

  const handleDatePrev = () => {
    //TODO
  };

  const handleDateNext = () => {
    //TODO
  };

  const handleAddClick = () => {
    //TODO
  };

  const handleRangeSelect = (arg) => {
    //TODO
  };

  const handleEventSelect = (arg) => {
    //TODO
  };

  const handleEventResize = async (arg) => {
    //TODO
  };

  const handleEventDrop = async (arg) => {
    //TODO
  };
  return (
    <>
      <Head>
        <title>App: Calendar | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          py: 8,
        }}
      >
        <CalendarToolbar
          date={date}
          onAddClick={handleAddClick}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
          mobile={smDown}
        />
        <FullCalendarWrapper>
          <FullCalendar
            allDayMaintainDuration
            dayMaxEventRows={3}
            droppable
            editable
            eventClick={handleEventSelect}
            eventDisplay="block"
            eventDrop={handleEventDrop}
            eventResizableFromStart
            eventResize={handleEventResize}
            events={events}
            headerToolbar={false}
            height={800}
            initialDate={date}
            initialView={view}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              listPlugin,
              timeGridPlugin,
              timelinePlugin,
            ]}
            ref={calendarRef}
            rerenderDelay={10}
            select={handleRangeSelect}
            selectable
            weekends
          />
        </FullCalendarWrapper>
      </Box>
    </>
  );
};

Calendar.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["all"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default Calendar;
