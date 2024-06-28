import axios from "axios";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
export const BASE_AWS_URL = "https://open.bluebirdjournal.app/public/computation";
// export const BASE_AWS_URL = "http://localhost:3001/public/computation"
type CalendarEvent = {
  title: string;
  start: string;
  end: string;
};

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const mapResultsToEvents = (results: any[]): CalendarEvent[] => {
    if (!results) return [];
    return results.map((r) => {
      const { timestamp, count } = r;
      const t = moment(Number(timestamp)).toString();
      return {
        title: count,
        start: t,
        end: t,
      };
    });
  };

  const fetchData = async () => {
    try {
      const results = await axios.post(`${BASE_AWS_URL}/data`);
      const events = mapResultsToEvents(results.data);
      setEvents(events);
    } catch (error) {
      console.log("error fetching /data");
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "60vh" }}
      onSelectEvent={() => {}}
    />
  );
};

export default Calendar;
