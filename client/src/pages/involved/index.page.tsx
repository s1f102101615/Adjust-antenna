
import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';

const Involved = () => {
  const [user] = useAtom(userAtom);

 
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
    </>
  );
};

export default Involved;
