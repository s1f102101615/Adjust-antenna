
import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Link from 'next/link';

const Involved = () => {
  const [user] = useAtom(userAtom);
  const [involved, setInvolved] = useState<{ appoid: string; title: string; location: string; startDate: string; startTime: string; endDate: string; endTime: string; }[]>([]);
  // useEffect(() => {
  //   const fetchInvolved = async () => {
  //     const response = await apiClient.append.get();
  //     const body = response.body as Array<{ id: string; appoid: string; title: string; details: string; location: string; startDate: string; startTime: string; endDate: string; endTime: string; createdAt: Date; }>;
  //     if (body === null) return;
  //     setInvolved(body);
  //   };
  //   fetchInvolved();
  // }
  // , []);


  // localsotrageから取得
    useEffect(() => {
    const fetchInvolved = async () => {
      const events = JSON.parse(localStorage.getItem('recentEvents') as string);
      setInvolved(events);
    };
    fetchInvolved();
  }, []);

  // 日付を年月日形式にフォーマットする関数
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    return formattedDate;
  };

 
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.headerup}>
        <div className={styles.header}>
          <div className={styles.flag}><a href={`http://localhost:3000`} className={styles.link}>ホームページ</a>{' '}
            -&gt; 最近このブラウザで関与したイベント</div>
          <div className={styles.uptitle}>最近このブラウザで関与したイベント</div>
        </div>
      </div>
      <div className={styles.involved}>
        {involved.map(eventString => {
              const eventObj = JSON.parse((eventString)); // JSON文字列をオブジェクトに変換
              return (
                <Link key={eventObj.appoid} className={styles.eventCards} href={`http://localhost:3000/event/${eventObj.appoid}`}>
                <div key={eventObj.appoid}>
                  <div className={styles.title}>{eventObj.title}</div><br />
                  Location: {eventObj.location}<br />
                  {formatDate(eventObj.startDate)}{eventObj.startTime} - {formatDate(eventObj.endDate)}{eventObj.endTime}<br />
                </div>
                </Link>
              );
            })}
      </div>
    </>
  );
};

export default Involved;
