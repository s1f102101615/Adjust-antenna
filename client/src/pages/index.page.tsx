import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { v4 as uuidv4 } from 'uuid';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

const Home = () => {
  const [user] = useAtom(userAtom);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  //仮イベントデータ
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'イベント1', date: '2022-01-01', location: '東京' },
    { id: 2, title: 'イベント2', date: '2022-02-01', location: '大阪' },
    { id: 3, title: 'イベント3', date: '2022-03-01', location: '名古屋' },
  ]);

  const generateURL = async () => {
    // randomIdを生成する
    const randomId = uuidv4();
    // 生成したiCalendarデータを含むURLを返す
    await apiClient.calendar
      .post({
        body: {
          appoid: randomId,
          title,
          startDate,
          endDate,
          details,
          location,
          startTime,
          endTime,
          createdAt: new Date(),
        },
      })
      .then(() => {
        window.location.href = `http://localhost:3000/event/${randomId}`;
      });
    return;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.labelname}>すぐ作れる！カンタン連絡共有</div>
        <form onSubmit={handleSubmit}>
          {/* 各フォームグループをまとめてスタイリッシュに表示 */}
          <div className={styles.inputer}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.navigate}>
                1.タイトルを入力
              </label>
              <input
                className={styles.inputtitle}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="details" className={styles.navigatememo}>
                メモ書き込む(任意)
              </label>
              <textarea
                className={styles.memoarea}
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className={styles.formGrouptime}>
              <label htmlFor="startDate" className={styles.navigate}>
                2.時間を入力する
              </label>
              <label htmlFor="startDate" className={styles.navigatestart}>
                開始時間
              </label>
              <input
                type="date"
                className={styles.date}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                className={styles.time}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              {/* <div className="date-time-picker">
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div> */}
              <label htmlFor="startDate" className={styles.navigateend}>
                終了時間
              </label>
              <input
                type="date"
                className={styles.date}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                className={styles.time}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.navigate}>
                場所を書き込む(任意)
              </label>
              <input
                type="text"
                className={styles.inputtitle}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <button className={styles.submitButton} type="submit" onClick={generateURL}>
            URL生成
          </button>
        </form>
      </div>
      <div>
        <div className={styles.oldtitle}>最近このブラウザで閲覧したイベント</div>
        {events.map((event) => (
          <li key={event.id} className={styles.eventCard}>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitle}>{event.title}</div>
              <div className={styles.eventDate}>{event.date}</div>
              <div className={styles.eventLocation}>{event.location}</div>
            </div>
          </li>
        ))}


      </div>
    </>
  );
};

export default Home;
