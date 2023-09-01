import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const [group, setGroup] = useState<string[]>([]);
  const [id, setId] = useState('');

  const { appoid } = router.query;

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
      if (response.body === null) {
        setUrl(`このURLは無効です`);
        return;
      }

      const nowEvent = response.body;
      console.log('nowEvent', nowEvent);

      // ローカルストレージに保存
      const newEvent = {
        appoid: nowEvent.appoid as string,
        title: nowEvent.title as string,
        location: nowEvent.location as string,
        startDate: nowEvent.startDate as string,
        startTime: nowEvent.startTime as string,
        endDate: nowEvent.endDate as string,
        endTime: nowEvent.endTime as string,
      };
      saveEvent(JSON.stringify(newEvent));
      // nowEventの中身をuseStateにセットする
      setId(nowEvent?.id ?? '');
      setTitle(nowEvent?.title);
      setStartDate(nowEvent?.startDate);
      setEndDate(nowEvent?.endDate);
      setDetails(nowEvent?.details);
      setLocation(nowEvent?.location);
      setStartTime(nowEvent?.startTime);
      setEndTime(nowEvent?.endTime);
      setGroup(nowEvent?.group);
      setUrlarea(
        `タイトル：${nowEvent?.title}\n開始：${nowEvent?.startDate} ${nowEvent?.startTime}\n終了：${
          nowEvent?.endDate
        } ${nowEvent?.endTime}\n場所：${nowEvent?.location}\n詳細：${
          nowEvent?.details
        }\nURL：${`http://localhost:3000/calendar/${appoid}`}`
      );
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

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.event}>
        <div className={styles.container}>
          <div className={styles.titlearound}>
            <div className={styles.titledetail}>タイトル</div>
            <div className={styles.title}>{title}</div>
            {/* idがuidと一致していたらあなたは作成者ですと表示する */}
            {id === user?.id && <div className={styles.creater}>あなたが作成者です</div>}
          </div>
          <div className={styles.timearound}>
            <div className={styles.starttime}>
              <div className={styles.timedetail}>開始</div>
              <div className={styles.time}>
                {startDate} {startTime}
              </div>
            </div>
            <div className={styles.to}> ~</div>
            <div className={styles.endtime}>
              <div className={styles.titledetail}>終了</div>
              <div className={styles.time}>
                {endDate} {endTime}
              </div>
            </div>
          </div>
          <div className={styles.locationaround}>
            <div className={styles.locationdetail}>場所</div>
            <div className={styles.location}>{location}</div>
          </div>
          <div className={styles.detailaround}>
            <div className={styles.detailofdetail}>イベントの詳細</div>
            <div className={styles.detail}>{details}</div>
          </div>
          <div className={styles.grouparound}>
            <div className={styles.groupdetail}>参加者 現在{group.length}人</div>
            <div className={styles.group}>
              {group.map((group) => (
                <div key={group}>{group}&nbsp;</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.urlzone}>
        <div className={styles.urldetail}>イベントに参加するURL</div>
        <div>
          <input className={styles.urlinput} type="text" value={url} readOnly />
          <button className={styles.copybutton1} onClick={handleCopyUrl}>
            Copy
          </button>
        </div>
        {/* イベントに参加するボタン */}
        <a href={`${url}`} className={styles.btn}>
          <div className={styles.btntext}>イベントに参加する&gt;</div>
        </a>
        <div className={styles.urlmessagedetail}>URL付きメッセージ</div>
        <div>
          <textarea className={styles.urlarea} value={urlarea} readOnly />
          <button className={styles.copybutton1} onClick={handleCopyUrlArea}>
            Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default Event;
