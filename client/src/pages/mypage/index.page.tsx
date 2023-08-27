import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { userAtom } from '../../atoms/user';

const Mypage = () => {
  const [user] = useAtom(userAtom);
  
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>Mypage</div>
    </>
  );
};

export default Mypage;
