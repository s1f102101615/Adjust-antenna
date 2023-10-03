import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Involved = () => {
  const [user] = useAtom(userAtom);
  const [involved, setInvolved] = useState<string[]>([]);

  const isMobile = window.innerWidth <= 448;

  // localsotrageから取得
  useEffect(() => {
    const fetchInvolved = async () => {
      const events = JSON.parse(localStorage.getItem('recentEvents') as string);
      setInvolved(events.reverse());
    };
    fetchInvolved();
  }, []);

  // 日付を年月日形式にフォーマットする関数
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    return formattedDate;
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.headerup}>
        <div className={styles.header}>
          <div className={styles.flag}>
            {isMobile ? (
              <p>
                <a href={`https://adjust-antenna.vercel.app`} className={styles.link}>
                  ホームページ
                </a>{' '}
                <br />
                -&gt; 最近このブラウザで関与したイベント
              </p>
            ) : (
              <text>
                <a href={`https://adjust-antenna.vercel.app`} className={styles.link}>
                  ホームページ
                </a>{' '}
                -&gt; 最近このブラウザで関与したイベント
              </text>
            )}
          </div>

          {isMobile ? (
            <div className={styles.uptitle}>
              最近このブラウザで
              <br />
              関与したイベント
            </div>
          ) : (
            <div className={styles.uptitle}>最近このブラウザで関与したイベント</div>
          )}
        </div>
      </div>
      <div className={styles.involved}>
        {involved.map((eventString) => {
          const eventObj = JSON.parse(eventString); // JSON文字列をオブジェクトに変換
          return (
            <Link
              key={eventObj.appoid}
              className={styles.eventCards}
              href={`https://adjust-antenna.vercel.app/event/${eventObj.appoid}`}
            >
              <div key={eventObj.appoid}>
                <div className={styles.title}>{eventObj.title}</div>
                <br />
                場所: {eventObj.location === '' ? '未設定' : eventObj.location}
                <br />
                {formatDate(eventObj.startDate)}
                {eventObj.startTime} - {formatDate(eventObj.endDate)}
                {eventObj.endTime}
                <br />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Involved;
