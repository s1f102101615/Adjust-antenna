import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Event = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [url, setUrl] = useState('');
  const [urlarea, setUrlarea] = useState('');

  const { appoid } = router.query;

  useEffect(() => {
    const fetchEvent = async () => {
      if (appoid === undefined) {
        return;
      }
      const response = await apiClient.calendar.get({ query: { appoid: appoid as string } });
      const nowEvent = response.body;
      console.log('nowEvent', nowEvent);
      // nowEventの中身をuseStateにセットする
      setTitle(nowEvent?.title);
      setStartDate(nowEvent?.startDate);
      setEndDate(nowEvent?.endDate);
      setDetails(nowEvent?.details);
      setLocation(nowEvent?.location);
      setStartTime(nowEvent?.startTime);
      setEndTime(nowEvent?.endTime);
      setUrlarea(`タイトル：${title}\n開始：${nowEvent?.startDate} ${nowEvent?.startTime}\n終了：${nowEvent?.endDate} ${nowEvent?.endTime}\n場所：${nowEvent?.location}\n詳細：${nowEvent?.details}\nURL：${`http://localhost:3000/calendar/${appoid}`}`);
      setUrl(`http://localhost:3000/calendar/${appoid}`);
    };
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // urlをクリップボードにコピーする
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  // urlareaをコピーする
  const handleCopyUrlArea = async () => {
    try {
      await navigator.clipboard.writeText(urlarea);
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>{title}</div>
      <div>{startDate}</div>
      <div>{startTime}</div>
      <div>{endDate}</div>
      <div>{endTime}</div>
      <div>{details}</div>
      <div>{location}</div>
      <div>
        <input className={styles.urlinput} type="text" value={url} readOnly />
        <button onClick={handleCopyUrl}>Copy</button>
      </div>
      <div>
        <textarea className={styles.urlarea} value={urlarea} readOnly />
        <button onClick={handleCopyUrlArea}>Copy</button>
      </div>

    </>
  );
};

export default Event;
