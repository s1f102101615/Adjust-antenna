import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { apiClient } from 'src/utils/apiClient';
import type { CalendarModel } from 'commonTypesWithClient/models';


const Calendar = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const { appoid } = router.query;
  const [nowEvent, setNowEvent] = useState<CalendarModel>();

  useEffect(() => {
    const fetchEvent = async () => {
      if (appoid === undefined) {
        return;
      }
      const response = await apiClient.calendar.get({query: { appoid: appoid as string } });
      const nowEvent = response.body;
      console.log('nowEvent',nowEvent)
      setNowEvent(nowEvent); // update the type of nowEvent to match CalendarModel
  
      const baseURL = "BEGIN:VCALENDAR\nVERSION:2.0\n";
      const event = `BEGIN:VEVENT\nSUMMARY:${nowEvent?.title}\nDTSTART:${nowEvent?.startDate}T${nowEvent?.startTime}+0900\nDTEND:${nowEvent?.endDate}T${nowEvent?.endTime}+0900\nDESCRIPTION:${nowEvent?.details}\nLOCATION:${nowEvent?.location}\nEND:VEVENT\n`;
      const endCalendar = "END:VCALENDAR";
  
      const iCalendarData = baseURL + event + endCalendar;
      const encodedData = encodeURIComponent(iCalendarData);
      console.log('encodeEvent',encodedData)
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('iphone') > 0) {
  
        window.location.href = `webcal://pocketcalendar.app/${encodedData}`;
      } else if (userAgent.indexOf('android') > 0) {
  
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:text/calendar;charset=utf-8,${encodedData}`;
        downloadLink.download = 'event.ics';
        downloadLink.click();
      } else if (userAgent.indexOf('windows') > 0) {
  
        window.open(`data:text/calendar;charset=utf-8,${encodedData}`);
      }
    }
      fetchEvent();
  }, []);

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>{nowEvent?.appoid}</div>
    </>
  );
};

export default Calendar;