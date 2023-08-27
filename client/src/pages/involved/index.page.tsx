
import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';
import { useEffect, useState } from 'react';

const Involved = () => {
  const [user] = useAtom(userAtom);
  const [involved, setInvolved] = useState<{ id: string; appoid: string; title: string; details: string; location: string; startDate: string; startTime: string; endDate: string; endTime: string; createdAt: Date; }[]>([]);
  useEffect(() => {
    const fetchInvolved = async () => {
      const response = await apiClient.append.get();
      const body = response.body as Array<{ id: string; appoid: string; title: string; details: string; location: string; startDate: string; startTime: string; endDate: string; endTime: string; createdAt: Date; }>;
      if (body === null) return;
      setInvolved(body);
    };
    fetchInvolved();
  }
  , []);


 
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>
        {involved.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.details}</p>
            <p>{item.location}</p>
            <p>{item.startDate} - {item.startTime} to {item.endDate} - {item.endTime}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Involved;
