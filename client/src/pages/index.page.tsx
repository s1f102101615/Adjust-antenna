import { useAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { v4 as uuidv4 } from 'uuid';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
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

  const generateURL = async () => {
    // randomIdを生成する
    const randomId = uuidv4();

    setUrl(`http://localhost:3000/calendar/${randomId}`);
    setUrlarea(
      `タイトル：${title}\n開始：${startDate} ${startTime}\n終了：${endDate} ${endTime}\n場所：${location}\n詳細：${details}\nURL：${url}`
    );
    // 生成したiCalendarデータを含むURLを返す
    await apiClient.calendar.post({
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
    });
    return;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  const handleUrlCopyClick = async () => {
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
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {/* 各フォームグループをまとめてスタイリッシュに表示 */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="details">Details</label>
            <textarea rows={3} value={details} onChange={(e) => setDetails(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <button className={styles.submitButton} type="submit" onClick={generateURL}>
            URL生成
          </button>
        </form>
        {/* リンクを表示してワンクリックでコピー出来るようにする */}
        <div>
          <input type="text" value={url} className={styles.url} readOnly />
          <button onClick={handleCopyClick}>Copy</button>
          <button>
            <Link href={url}>リンクに飛ぶ</Link>
          </button>
        </div>
        {/* 他人に送りやすいようにメッセージにurlを混ぜて出力する、それもコピーできるようにする */}
        <div>
          <textarea className={styles.message} value={urlarea} readOnly />
          <button onClick={handleUrlCopyClick}>Copy</button>
        </div>
      </div>
    </>
  );
};

export default Home;
