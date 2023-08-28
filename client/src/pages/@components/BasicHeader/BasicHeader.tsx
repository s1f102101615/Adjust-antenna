import type { UserModel } from 'commonTypesWithClient/models';
import { HumanIcon } from 'src/components/icons/HumanIcon';
import { logout } from 'src/utils/login';
import styles from './BasicHeader.module.css';
import { useState } from 'react';
import Link from 'next/link';

// eslint-disable-next-line complexity
export const BasicHeader = ({ user }: { user: UserModel | null }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  
  const handleLogout = async () => {
    if (confirm('Logout?')) await logout();
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link href='http://localhost:3000/'><div className={styles.maintitle}>連絡あんてな</div></Link>
        <div className={styles.users}>
          {user ? (
          <div className={styles.userBtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{marginTop: dropdownVisible ? '76px' : '0'}} onClick={handleDropdownClick} >
            {user?.photoURL !== undefined ? (
              <img className={styles.userIcon} src={user.photoURL} height={24} alt={user.displayName} />
            ) : (
              <HumanIcon size={18} fill="#555" />
            )}
            <span className={styles.userName}>{user?.displayName}</span>
            <span className={styles.dropdownIcon}>{dropdownVisible ? '▲' : '▼'}</span>
          </div>
          ) : (
            <Link href="/login">
              <div className={styles.userBtn}>
                <HumanIcon size={18} fill="#555" />
                <span className={styles.userName}>ログイン/新規作成</span>
              </div>
            </Link>
          )}
          {dropdownVisible && (
            <div className={styles.dropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link href="/mypage">
                <div className={styles.dropdownItem}>マイページ</div>
              </Link>
              <div className={styles.dropdownItem} onClick={handleLogout}>
                ログアウト
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};