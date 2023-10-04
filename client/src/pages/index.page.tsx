/* eslint-disable complexity */
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { v4 as uuidv4 } from 'uuid';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

// eslint-disable-next-line complexity
const Home = () => {
  const [user] = useAtom(userAtom);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const isMobile = window.innerWidth <= 448; // 画面幅が720px以下かどうかを判定

  //仮イベントデータ
  const [events, setEvents] = useState<string[]>([]);
  //eventsにlocalStorageから取得したデータから直近２件だけを表示
  useEffect(() => {
    const fetchEvents = async () => {
      const events = JSON.parse(localStorage.getItem('recentEvents') as string);
      if (events === null) return;
      setEvents(events.slice(-2).reverse());
    };
    fetchEvents();
  }, []);

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
          createdAt: new Date().toISOString(),
          group: [],
        },
      })
      .then(async () => {
        // アカウントに保存
        if (user !== null) {
          await apiClient.append.post({ body: { appoid: randomId as string } });
        }
        window.location.href = `https://adjust-antenna.vercel.app/event/${randomId}/`;
      });
    return;
  };

  // 日付を年月日形式にフォーマットする関数
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    return formattedDate;
  };

  // eslint-disable-next-line complexity
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!title || !startDate || !startTime || !endDate || !endTime) {
      alert('タイトルと時間は必須です。');
      event.preventDefault();
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert('終了日は開始日以降の日付を選択してください。');
      event.preventDefault();
      return;
    }
    if (startDate === endDate && startTime > endTime) {
      alert('終了時間は開始時間以降の時間を選択してください。');
      event.preventDefault();
      return;
    }
    event.preventDefault();
    generateURL();
  };

  const isFormValid =
    title.trim() !== '' &&
    startDate.trim() !== '' &&
    endDate.trim() !== '' &&
    startTime.trim() !== '' &&
    endTime.trim() !== '';

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.upinput}>
        <div className={styles.container}>
          {/* widthが720以下になったら文字を変える */}
          {isMobile ? (
            <div className={styles.labelname}>
              すぐ作れる！
              <br />
              カンタン連絡共有
            </div>
          ) : (
            <div className={styles.labelname}>すぐ作れる！カンタン連絡共有</div>
          )}
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
            <div>
              <div className={styles.attention}>
                ※タイトルと時間を入力しなければイベント生成は出来ません
              </div>
            </div>
            <button
              className={styles.submitButton}
              type="submit"
              onClick={generateURL}
              disabled={!isFormValid}
            >
              イ ベ ン ト 生 成
            </button>
          </form>
        </div>
      </div>
      <div className={styles.old2}>
        <div className={styles.oldmain}>
          <div className={styles.oldtitle}>最近このブラウザで関与したイベント</div>
          <div className={styles.oldevent}>
            {events.map((eventString) => {
              const event = JSON.parse(eventString);
              return (
                <Link
                  key={event.appoid}
                  className={styles.eventCard}
                  href={`/event/${event.appoid}`}
                >
                  <div key={event.appoid}>
                    <div className={styles.eventTitle}>{event.title}</div>
                    <br />
                    場所: {event.location === '' ? '未設定' : event.location}
                    <br />
                    {formatDate(event.startDate)}
                    {event.startTime} - {formatDate(event.endDate)}
                    {event.endTime}
                    <br />
                  </div>
                </Link>
              );
            })}
          </div>
          <Link className={styles.oldlink} href="/involved">
            <div>{'>'}閲覧履歴をすべて見る</div>
          </Link>
        </div>
      </div>
      {/* <div className={styles.old2}>
        <div className={styles.oldmain}>
          <div className={styles.oldtitle}>最近このブラウザで関与したイベント</div>
          <div className={styles.oldevent}>
            {events.map((eventString) => {
              const event = JSON.parse(eventString);
              return (
                <Link
                  key={event.appoid}
                  className={styles.eventCard}
                  href={`/event/${event.appoid}`}
                >
                  <div key={event.appoid}>
                    <div className={styles.eventTitle}>{event.title}</div>
                    <br />
                    場所: {event.location === '' ? '未設定' : event.location}
                    <br />
                    {formatDate(event.startDate)}
                    {event.startTime} - {formatDate(event.endDate)}
                    {event.endTime}
                    <br />
                  </div>
                </Link>
              );
            })}
          </div>
          <Link className={styles.oldlink} href="/involved">
            <div>{'>'}閲覧履歴をすべて見る</div>
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default Home;
