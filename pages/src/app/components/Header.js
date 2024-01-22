// components/Header.js
import React, { useEffect, useState } from "react";
import { signOut, useSession } from 'next-auth/react';
import {
  readData,
  tableToJson
} from '@/utils/spreadsheet';

const Header = () => {
  const { data, update } = useSession();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if ((data && !userInfo)|| data) {
      readData('members')
        .then((result) => {
          const jsonData = tableToJson(result?.data?.values);

          const verifyEmail = jsonData.filter((member) => {
            if (member.email === data?.user.email) {
              localStorage.setItem('user info', JSON.stringify(member));
              setUserInfo(member);
              return true;
            }
          });

          if (verifyEmail.length === 0) {
            alert('Wrong email');
            signOut();
          }
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi:', error);
        });
    }
  }, [data]);

  return (
    <div className="flex ml-12 max-md:ml-0">
      <p className="w-48 mr-4 border-b-4 border-green-color py-2 font-semibold max-md:text-[1.2rem] max-md:w-[8.3rem]">
        Off Days: {userInfo?.dayoff === '0' ?
        `${userInfo?.dayoff}d` : `${userInfo?.dayoff}ds`}
      </p>
      <p className="w-56 border-b-4 border-orange-color py-2 font-semibold max-md:text-[1.2rem] max-md:w-[12rem]">
        Paid Holidays: {12 - userInfo?.dayoff === 0 ?
        `${12 - parseFloat(userInfo?.dayoff.replace(',', '.'))}d` : `${12 - parseFloat(userInfo?.dayoff.replace(',', '.'))}ds`}
      </p>
    </div>
  );
};

export default Header;
