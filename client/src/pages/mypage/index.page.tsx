import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Mypage = () => {
  const [user] = useAtom(userAtom);
  const [settings, setSettings] = useState<
    'profile' | 'email' | 'password' | 'email-reception' | 'withdrawal'
  >('profile');
  const [involved, setInvolved] = useState<
    | {
        id: string;
        appoid: string;
        title: string;
        details: string;
        location: string;
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
        createdAt: Date;
      }[]
    | null[]
  >([]);
  useEffect(() => {
    const fetchInvolved = async () => {
      const response = await apiClient.append.get();
      setInvolved(response.body || []);
    };
    fetchInvolved();
  }, []);

  // 日付を年月日形式にフォーマットする関数
  const formatDate = (dateString: string | undefined) => {
    if (dateString === undefined) return '';
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    return formattedDate;
  };

  const handleSettingsClick = (
    setting: 'profile' | 'email' | 'password' | 'email-reception' | 'withdrawal'
  ) => {
    setSettings(setting);
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />

      <div className={styles.siteup}>
        <div className={styles.mytitle}>{user.displayName}のマイページ</div>
      </div>

      <div className={styles.mylist}>
        <div className={styles.pasent}>
          {settings === 'profile' && (
            <>
              {/* プロフィール設定のコンポーネントを表示 */}
              <div className={styles.cont}>
                <div className={styles.label}>イベント履歴</div>
                {involved.reverse().map((item) => (
                  <Link
                    key={item?.appoid}
                    className={styles.eventCards}
                    href={`http://localhost:3000/event/${item?.appoid}`}
                  >
                    <div key={item?.appoid}>
                      <div className={styles.title}>{item?.title}</div>
                      <br />
                      Location: {item?.location}
                      <br />
                      {formatDate(item?.startDate)}
                      {item?.startTime} - {formatDate(item?.endDate)}
                      {item?.endTime}
                      <br />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          {settings === 'email' && <div>{/* メールアドレス設定のコンポーネントを表示 */}</div>}
          {settings === 'password' && <div>{/* パスワード設定のコンポーネントを表示 */}</div>}
          {settings === 'email-reception' && (
            <div>{/* メール受信設定のコンポーネントを表示 */}</div>
          )}
          {settings === 'withdrawal' && <div>{/* 退会設定のコンポーネントを表示 */}</div>}

          <div className={styles.settings}>
            <div className={styles.label1}>設定</div>
            <div className={styles.setlabel} onClick={() => handleSettingsClick('profile')}>
              プロフィール設定
            </div>
            <div className={styles.setlabel} onClick={() => handleSettingsClick('email')}>
              メールアドレス設定
            </div>
            <div className={styles.setlabel} onClick={() => handleSettingsClick('password')}>
              パスワード設定
            </div>
            <div className={styles.setlabel} onClick={() => handleSettingsClick('email-reception')}>
              メール受信設定
            </div>
            <div className={styles.setlabel} onClick={() => handleSettingsClick('withdrawal')}>
              退会設定
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
