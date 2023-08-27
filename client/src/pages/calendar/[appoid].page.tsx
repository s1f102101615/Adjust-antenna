import type { CalendarModel } from 'commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';

const Calendar = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const { appoid } = router.query;
  const [nowEvent, setNowEvent] = useState<CalendarModel>();

  function saveEvent(eventData: string) {
    if ((localStorage.getItem('recentEvents')) === null) {
      const events = []
      events.push(eventData);
      localStorage.setItem('recentEvents', JSON.stringify(events));
      return ;
    } 
    const events = JSON.parse(localStorage.getItem('recentEvents') as string);
    // 同じイベントがある場合、保存しない
    for (let i = 0; i < events.length; i++) {
      if (events[i] === eventData) {
        return ;
      }
    }
    events.push(eventData);
    // イベントが5件以上になる場合、古いイベントを削除
    if (events.length > 5) {
      events.shift(); // 最も古いイベントを削除
    }
    localStorage.setItem('recentEvents', JSON.stringify(events));
    return ;
  }

  useEffect(() => {
    const fetchEvent = async () => {
      if (appoid === undefined) {
        return;
      }
      const response = await apiClient.calendar.get({ query: { appoid: appoid as string } });
      const nowEvent = response.body;
      console.log('nowEvent', nowEvent);
      setNowEvent(nowEvent); // update the type of nowEvent to match CalendarModel

      const baseURL = 'BEGIN:VCALENDAR\nVERSION:2.0\n';
      const event = `BEGIN:VEVENT\nSUMMARY:${nowEvent?.title}\nDTSTART:${nowEvent?.startDate}T${nowEvent?.startTime}+0900\nDTEND:${nowEvent?.endDate}T${nowEvent?.endTime}+0900\nDESCRIPTION:${nowEvent?.details}\nLOCATION:${nowEvent?.location}\nEND:VEVENT\n`;
      const endCalendar = 'END:VCALENDAR';

      const iCalendarData = baseURL + event + endCalendar;
      const encodedData = encodeURIComponent(iCalendarData);
      console.log('encodeEvent', encodedData);
      // involvedに登録する
      await apiClient.append.post({ body: { appoid: appoid as string } });
      // localStorageに保存する
      const newEvent = {
        appoid: nowEvent.appoid as string,
        title: nowEvent.title as string,
        location:  nowEvent.location as string,
        startDate: nowEvent.startDate as string,
        startTime: nowEvent.startTime as string,
        endDate: nowEvent.endDate as string,
        endTime: nowEvent.endTime as string,
      };
      saveEvent(JSON.stringify(newEvent));
      // デバイスによって処理を分ける
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
    };
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>{nowEvent?.appoid}</div>
      <div>pcでアクセスした場合カレンダーに追加するためのデータをDLしています(8KB程)</div>
    </>
  );
};

export default Calendar;
