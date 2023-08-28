import type { UserModel } from 'commonTypesWithClient/models';
import { HumanIcon } from 'src/components/icons/HumanIcon';
import { logout } from 'src/utils/login';
import styles from './BasicHeader.module.css';
import { useState } from 'react';
import Link from 'next/link';

export const BasicHeader = ({ user }: { user: UserModel }) => {
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
        <div className={styles.users}>
          <div className={styles.userBtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{marginTop: dropdownVisible ? '76px' : '0'}} onClick={handleDropdownClick} >
            {user.photoURL !== undefined ? (
              <img className={styles.userIcon} src={user.photoURL} height={24} alt={user.displayName} />
            ) : (
              <HumanIcon size={18} fill="#555" />
            )}
            <span className={styles.userName}>{user.displayName}</span>
            <span className={styles.dropdownIcon}>{dropdownVisible ? '▲' : '▼'}</span>
          </div>
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