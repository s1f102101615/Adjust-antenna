import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';
import Link from 'next/link';

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

  const generateURL = () => {
    // 各フォームの値を使用してiCalendarデータを生成
    const baseURL = "BEGIN:VCALENDAR\nVERSION:2.0\n";
    const event = `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${startDate}T${startTime}+0900\nDTEND:${endDate}T${endTime}+0900\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\n`;
    const endCalendar = "END:VCALENDAR";

    const iCalendarData = baseURL + event + endCalendar;
    const encodedData = encodeURIComponent(iCalendarData);
    setUrl(`http://localhost:3000/calendar?data=${encodeURIComponent(`data:text/calendar;charset=utf-8,${encodedData}`)}`);
    // 生成したiCalendarデータを含むURLを返す
    return ;
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

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" className={styles.labels} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" className={styles.labels} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="startTime">Start Time</label>
            <input type="time" className={styles.labels} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date</label>
            <input type="date" className={styles.labels} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endTime">End Time</label>
            <input type="time" className={styles.labels} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="details">Details</label>
            <textarea className={styles.labels} rows={3} value={details} onChange={(e) => setDetails(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input type="text" className={styles.labels} value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <button className={styles.submitButton} type="submit" onClick={generateURL}>URL生成</button>
          
        </form>
        <div><Link href={url} >aaa</Link></div>
        {/* リンクを表示してワンクリックでコピー出来るようにする */}
        <div>
          <input type="text" value={url} className={styles.url} readOnly />
          <button onClick={handleCopyClick}>Copy</button>
        </div>
        

      </div>
    </>
  );
};

export default Home;
