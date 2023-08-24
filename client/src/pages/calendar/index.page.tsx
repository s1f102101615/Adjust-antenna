import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';


const Calendar = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [data, setData] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    // URLからクエリパラメータを取得
    const encodedData = router.query.data;
    const iCalendarData = decodeURIComponent(encodedData);

    console.log('aa',iCalendarData);
    // iCalendarデータを使用してカレンダーアプリに追加するロジック
    // ここでの例はダウンロードリンクを表示するだけです
    //ほんとはurlハッシュを作ってそれを使ってダウンロードさせたい
    // const blob = new Blob([iCalendarData], { type: 'text/calendar;charset=utf-8' });
    // const url = URL.createObjectURL(blob);
    console.log('url',url);
    setUrl(url);

    const a = document.createElement('a');
    a.href = iCalendarData;
    a.download = 'event.ics';
    a.textContent = 'Download Event';
    document.body.appendChild(a);
    setData(iCalendarData); // dataを設定
  }, [router]);

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>{data}</div>
      <div>{url}</div>
    </>
  );
};

export default Calendar;