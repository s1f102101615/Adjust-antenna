import { useAtom } from 'jotai';
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

  const generateURL = async () => {
    // randomIdを生成する
    const randomId = uuidv4();
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
    }).then(() => {
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
      </div>
    </>
  );
};

export default Home;
