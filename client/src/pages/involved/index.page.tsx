
import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';
import { useEffect, useState } from 'react';


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



 
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>このアカウントで</div>
      <div>
        {involved.map(eventString => {
              const eventObj = JSON.parse((eventString)); // JSON文字列をオブジェクトに変換
              return (
                <div key={eventObj.appoid}>
                  <strong>{eventObj.title}</strong><br />
                  Location: {eventObj.location}<br />
                  Date: {eventObj.startDate} - {eventObj.endDate}<br />
                  Time: {eventObj.startTime} - {eventObj.endTime}
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Involved;
