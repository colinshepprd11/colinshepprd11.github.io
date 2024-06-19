import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
export const BASE_AWS_URL = "https://know-your-way.herokuapp.com";

type CalendarEvent = {
  title: string;
  start: string;
  end: string;
};

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const mapResultsToEvents = (results: any[]) => {
    if (!results) return [];
    return results.map((r) => {
      const { time, study_session_results } = r;
      return {
        title: study_session_results,
        start: time,
        end: time,
      };
    });
  };

  const fetchData = async () => {
    try {
      const results = await axios.get(`${BASE_AWS_URL}/api/data`);
      const events = mapResultsToEvents(results.data);
      setEvents(events);
    } catch (error) {
      console.log("error fetching /api/data");
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "60vh" }}
    />
  );
};

export default Calendar;