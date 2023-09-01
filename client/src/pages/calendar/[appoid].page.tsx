import type { CalendarModel } from 'commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Calendar = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const { appoid } = router.query;
  const [nowEvent, setNowEvent] = useState<CalendarModel>();
  const [pop, setPop] = useState(true);
  const [username, setUsername] = useState('');
  const [calendarType, setCalendarType] = useState('google');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [group, setGroup] = useState<string[]>([]);

  function saveEvent(eventData: string) {
    if (localStorage.getItem('recentEvents') === null) {
      const events = [];
      events.push(eventData);
      localStorage.setItem('recentEvents', JSON.stringify(events));
      return;
    }
    const events = JSON.parse(localStorage.getItem('recentEvents') as string);
    // 同じイベントがある場合、保存しない
    for (let i = 0; i < events.length; i++) {
      if (events[i] === eventData) {
        return;
      }
    }
    events.push(eventData);
    // イベントが5件以上になる場合、古いイベントを削除
    if (events.length > 5) {
      events.shift(); // 最も古いイベントを削除
    }
    localStorage.setItem('recentEvents', JSON.stringify(events));
    return;
  }

  useEffect(() => {
    const fetchEvent = async () => {
      if (appoid === undefined) {
        return;
      }
      const response = await apiClient.calendar.get({ query: { appoid: appoid as string } });
      const nowEvent = response.body;
      // nowEventにセットする
      if (nowEvent) {
        setTitle(nowEvent.title);
        setStartDate(nowEvent.startDate);
        setEndDate(nowEvent.endDate);
        setDetails(nowEvent.details);
        setLocation(nowEvent.location);
        setStartTime(nowEvent.startTime);
        setEndTime(nowEvent.endTime);
        setCreatedAt(new Date(nowEvent.createdAt));
        setGroup(nowEvent.group);
        console.log('nowEvent', nowEvent);
        setNowEvent(nowEvent);
      }
    };
    fetchEvent();
  }, [appoid]);

  // eslint-disable-next-line complexity
  const fetchCalendar = async (username: string, calendarType: string) => {
    if (appoid === undefined) {
      return;
    }
    const baseURL = 'BEGIN:VCALENDAR\nVERSION:2.0\n';
    const event = `BEGIN:VEVENT\nSUMMARY:${nowEvent?.title}\nDTSTART:${nowEvent?.startDate}T${nowEvent?.startTime}+0900\nDTEND:${nowEvent?.endDate}T${nowEvent?.endTime}+0900\nDESCRIPTION:${nowEvent?.details}\nLOCATION:${nowEvent?.location}\nEND:VEVENT\n`;
    const endCalendar = 'END:VCALENDAR';

    const iCalendarData = baseURL + event + endCalendar;
    const encodedData = encodeURIComponent(iCalendarData);
    console.log('encodeEvent', encodedData);
    if (user !== null) {
      await apiClient.append.post({ body: { appoid: appoid as string } });
    }
    //groupに登録する
    await apiClient.calendar.post({
      body: {
        appoid: appoid as string,
        title: title as string,
        startDate: startDate as string,
        endDate: endDate as string,
        details: details as string,
        location: location as string,
        startTime: startTime as string,
        endTime: endTime as string,
        createdAt: createdAt.toString() as string,
        group: [...group, username],
      },
    });
    // localStorageに保存する
    const newEvent = {
      appoid: appoid as string,
      title: title as string,
      location: location as string,
      startDate: startDate as string,
      startTime: startTime as string,
      endDate: endDate as string,
      endTime: endTime as string,
    };
    saveEvent(JSON.stringify(newEvent));
    // 指定されたカレンダーによって処理を分ける
    if (calendarType === 'google') {
      // window.location.href = `webcal://pocketcalendar.app/${encodedData}`;
    } else if (calendarType === 'apple') {
      // window.location.href = `data:text/calendar;charset=utf-8,${encodedData}`;
    } else if (calendarType === 'outlook') {
      window.open(`data:text/calendar;charset=utf-8,${encodedData}`);
    }
  };

  const handleButtonClick = () => {
    setPop(false);
    fetchCalendar(username, calendarType);
  };

  const handleBackClick = () => {
    setPop(false);
    router.push(`/event/${appoid}`);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleCalendarTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCalendarType(event.target.value);
  };

  return (
    <>
      <BasicHeader user={user} />
      <div>Outlookを選択した場合カレンダーに追加するためのデータをDLします(8KB程)</div>
      {/* popがtrueだったら現れるポップアップを作成する */}
      {pop && (
        <div className={styles.popup}>
          <div className={styles.popupinner}>
            {/* nowEventを表示する */}
            <div className={styles.popuptitle}>{nowEvent?.title}</div>
            <div className={styles.popuplocation}>{nowEvent?.location}</div>
            <div className={styles.popupdate}>
              {nowEvent?.startDate} {nowEvent?.startTime} - {nowEvent?.endDate} {nowEvent?.endTime}
            </div>
            <div className={styles.popupdetails}>{nowEvent?.details}</div>
            {/* 線を追加 */}
            <div className={styles.line} />
            <div className={styles.popuptext}>
              <div className={styles.caution}>このイベントをカレンダーに追加しますか？</div>
              <div className={styles.forminput}>
                <label className={styles.label} htmlFor="username">
                  ユーザー名
                </label>
                <input
                  type="text"
                  className={styles.input}
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className={styles.forminput}>
                <label className={styles.label} htmlFor="calendarType">
                  カレンダーの種類
                </label>
                <select
                  className={styles.input}
                  id="calendarType"
                  value={calendarType}
                  onChange={handleCalendarTypeChange}
                >
                  <option value="google">Googleカレンダー</option>
                  <option value="apple">Appleカレンダー</option>
                  <option value="outlook">Outlookカレンダー</option>
                </select>
              </div>
            </div>
            <div className={styles.popupbutton}>
              <button className={styles.buttonback} onClick={handleBackClick}>
                イベントページへ
              </button>
              <button className={styles.button} onClick={handleButtonClick}>
                追加する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Calendar;
