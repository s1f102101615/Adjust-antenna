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

  const fetchEvent = async () => {
    if (appoid == null) {
      return;
    }
    const response = await apiClient.calendar.get({query: { appoid: appoid as string } });
    const nowEvent = response.body;
    console.log(nowEvent)
    setNowEvent(nowEvent); // update the type of nowEvent to match CalendarModel
  }

  useEffect(() => {
    fetchEvent();
    const encodedData = nowEvent;
    const userAgent = window.navigator.userAgent.toLowerCase();
    let calendarApp = '';
    if (userAgent.indexOf('iphone') > 0) {
      calendarApp = 'apple_calendar';
    } else if (userAgent.indexOf('android') > 0) {
      calendarApp = 'google_calendar';
    } else if (userAgent.indexOf('windows') > 0) {
      calendarApp = 'outlook_calendar';
    }
    console.log('calendarApp',calendarApp);






    // const iCalendarData = decodeURIComponent(encodedData);

    // console.log('aa',iCalendarData);
    // iCalendarデータを使用してカレンダーアプリに追加するロジック
    // ここでの例はダウンロードリンクを表示するだけです
    //ほんとはurlハッシュを作ってそれを使ってダウンロードさせたい
    // const blob = new Blob([iCalendarData], { type: 'text/calendar;charset=utf-8' });
    // const url = URL.createObjectURL(blob);
    // console.log('url',url);
    // setUrl(url);

    // const a = document.createElement('a');
    // a.href = iCalendarData;
    // a.download = 'event.ics';
    // a.textContent = 'Download Event';
    // document.body.appendChild(a);
    // setData(iCalendarData); // dataを設定
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