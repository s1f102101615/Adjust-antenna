import { GithubIcon } from 'src/components/icons/GithubIcon';
import { loginWithGitHub } from 'src/utils/login';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import { useLoading } from '../@hooks/useLoading';
import styles from './index.module.css';

const Login = () => {
  const { addLoading, removeLoading } = useLoading();
  const login = async () => {
    addLoading();
    await loginWithGitHub();
    removeLoading();
  };

  return (
    <>
      <BasicHeader user={null} />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.title}>ログイン</div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                メールアドレス
              </label>
              <input className={styles.email} type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">パスワード</label>
              <input
                className={styles.password}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <button className={styles.btn} onClick={login}>
                <span>ログイン</span>
              </button>
              <div>もしくは</div>
              <button className={styles.btngit} onClick={login}>
                <GithubIcon size={18} fill="#fff" />
                <span>GitHubでログイン</span>
              </button>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.footerText}>
              アカウントをお持ちでない場合は、<a href="#">新規登録</a>してください。
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
