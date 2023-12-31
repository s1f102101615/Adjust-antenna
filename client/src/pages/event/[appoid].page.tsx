import { useAtom } from 'jotai';
import Link from 'next/link';
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
    // 同じイベントがある場合、それを取り除き先頭にpushする
    for (let i = 0; i < events.length; i++) {
      const event = JSON.parse(events[i]);
      if (event.appoid === appoid) {
        events.splice(i, 1);
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
    // eslint-disable-next-line complexity
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
      // urlareaのロケーションと詳細が空の場合、その部分に未設定と表示する
      setUrlarea(
        `タイトル：${nowEvent?.title}\n開始：${nowEvent?.startDate} ${nowEvent?.startTime}\n終了：${
          nowEvent?.endDate
        } ${nowEvent?.endTime}\n場所：${nowEvent?.location || '未設定'}\n詳細：${
          nowEvent?.details || '未設定'
        }\nURL：${`https://adjust-antenna.vercel.app/calendar/${appoid}/`}`
      );
      setUrl(`https://adjust-antenna.vercel.app/calendar/${appoid}/`);
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
            {location === '' ? (
              <div className={styles.locationunknown}>未設定</div>
            ) : (
              <div className={styles.location}>{location}</div>
            )}
          </div>
          <div className={styles.detailaround}>
            <div className={styles.detailofdetail}>イベントの詳細</div>
            {details === '' ? (
              <div className={styles.detailunknown}>未設定</div>
            ) : (
              <div className={styles.detail}>{details}</div>
            )}
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
        <Link href={`${url}/`} key={appoid as string} className={styles.btn}>
          <div className={styles.btntext}>イベントに参加する&gt;</div>
        </Link>
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

// export async function getStaticPaths() {
//   // context パラメータを使って appoid を取得
//   const { params } = context;

//   // params.appoid を使用して paths を構築
//   const paths = [
//     {
//       params: { appoid: params.appoid },
//     },
//   ];

//   return { paths, fallback: false };
// }

// // eslint-disable-next-line complexity
// export async function getStaticProps({ params }) {
//   // params.appoid を使用してデータを取得するロジックを実装
//   const appoid = params.appoid;
//   const eventData = await apiClient.calendar.get({ query: { appoid: appoid as string } });
//   const newEvent = {
//     appoid: (eventData.body?.appoid as string) || null,
//     title: (eventData.body?.title as string) || null,
//     location: (eventData.body?.location as string) || null,
//     startDate: (eventData.body?.startDate as string) || null,
//     startTime: (eventData.body?.startTime as string) || null,
//     endDate: (eventData.body?.endDate as string) || null,
//     endTime: (eventData.body?.endTime as string) || null,
//   };
//   if (eventData === null) {
//     const error = null;
//     return {
//       props: {
//         error,
//       },
//     };
//   }

//   return {
//     props: {
//       newEvent,
//     },
//   };
// }
