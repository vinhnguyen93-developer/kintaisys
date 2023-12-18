"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import Loading from "./loading";
import {
  readData,
  writeSheet,
  checkTokenInvalid,
  tableToJson,
  getColumnLetter,
  refreshToken,
} from "@/utils/spreadsheet";

import { jwtDecode } from "jwt-decode";

const Home = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const { data, update } = useSession();

  const [loading, setLoading] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState("2");
  const [selectMonth, setSelectMonth] = useState(currentMonth);
  const [timer, setTimer] = useState(
    `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
  );
  const [userInfo, setUserInfo] = useState(null);
  const [checkinIndex, setCheckinIndex] = useState(-1);
  const [dataList, setDataList] = useState([]);
  const [dataListCurrentMonth, setDataListCurrentMont] = useState([]);
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const timeFormat = moment(
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        'hhmmss'
      ).format('HH:mm:ss');
      setTimer(timeFormat);
    }, 1000);
  }, []);

  useEffect(() => {
    if (data) {
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

  useEffect(() => {
    if (userInfo) {
      getData(selectMonth);
    }
  }, [userInfo, selectMonth]);

  const getData = async (month) => {
    setLoading(true);
    readData(month)
      .then((result) => {
        const values = result?.data?.values;
        let newList = [values[4], values[5]];

        for (let index = 0; index < values.length; index++) {
          const row = values[index];
          if (row.length == 0) continue;
          if (row[1] === userInfo?.name) {
            newList.push(row);
            if (newList.length == 4) {
              newList.push(values[index + 1]);
              mapingList(newList);
              if (month === currentMonth) {
                setCheckinIndex(index);
              }
              break;
            }
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Đã xảy ra lỗi:', error);
        setLoading(false);
      });
  };

  const mapingList = (arrays) => {
    if (arrays && arrays.length == 5) {
      const lstDay = arrays[0];
      const lstDate = arrays[1];
      const lstTime = arrays[2];
      const lstCheckIn = arrays[3];
      const lstCheckOut = arrays[4];
      let listTmp = [];

      let day = 0;

      for (let index = 2; index < lstDay.length; index++) {
        const startDay = moment(
          `${currentDate.getFullYear()}-${selectMonth - 1}-${lstDate[2]}`
        );

        if (selectMonth === currentMonth && lstDate[index] == currentDate.getDate()) {
          if(lstCheckIn[index] == '') {
            setCheckInStatus('0')
          }
          else if (lstCheckOut[index] == '') {
            setCheckInStatus('1')
          } else {
            setCheckInStatus('2')
          }
        }

        listTmp.push({
          date: startDay.add(day, 'days').format('ddd, MMM D YYYY'),
          total_time: lstTime[index] || '',
          check_in: lstCheckIn[index] || '',
          check_out: lstCheckOut[index] || '',
        });

        day++;
      }
      if (selectMonth === currentMonth) {
        setDataListCurrentMont([...listTmp]);
      }
      setDataList(listTmp.reverse());
    }
  };

  const getColumnName = (type) => {
    let index = dataListCurrentMonth.findIndex((item) => {
      let date = new Date(item.date);
      return currentDate.getDate() === date.getDate();
    });
    if (type == "checkin") {
      return `${getColumnLetter(index + 2)}${checkinIndex + 1}`;
    }
    return `${getColumnLetter(index + 2)}${checkinIndex + 2}`;
  };

  const handleWrite = (accessToken) => {
    let position = "";
    if (checkInStatus === "0") {
      position = getColumnName("checkin");
    } else if (checkInStatus === "1") {
      position = getColumnName("checkout");
    }
    if (position !== "") {
      writeSheet(currentMonth, position, timer, accessToken)
        .then((result) => {
          getData(selectMonth);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi wirte:", error);
          setLoading(false);
        });
    }
  };

  const handleCheckIn = async () => {
    const decodedToken = jwtDecode(data.id_token);
    let currentTime = new Date();
    // console.log('token expire '+new Date(decodedToken.exp * 1000));
    if (currentTime < decodedToken.exp * 1000) {
      setLoading(true);
      handleWrite(data.accessToken);
    } else {
      if (data.refresh_token) {
        setLoading(true);
        refreshToken(data.refresh_token)
          .then((response) => {
            let newToken = response.data.access_token;
            updateSession(newToken);
            handleWrite(newToken);
          })
          .catch((error) => {
            console.log("refresh token fail");
            signOut();
          });
      } else {
        signOut();
      }
    }
  };

  const updateSession = async (accessToken) => {
    await update({ ...data, access_token: accessToken });
  };

  const handleChangeSelect = (event) => {
    setSelectMonth(event.target.value);
  };

  return (
    <>
      <div className="flex max-md:flex-col">
        <div className="w-1/5 px-6 py-10 h-screen bg-primary-color text-white max-md:w-full max-md:h-full max-md:py-8">
          <div className="flex items-center cursor-pointer">
            <div className="bg-white rounded-md mr-4 shrink-0 sidebar-avatar">
              <img src={data?.user.image} />
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold mb-3">{data?.user.name}</h3>
                {/* <p>IT Tech</p> */}
              </div>

              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <div className="flex items-center cursor-pointer mt-10">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <button onClick={signOut} className="ml-4 font-semibold">
              Logout
            </button>
          </div>
        </div>
        <div className="flex-1 px-6 py-10 h-screen">
          <div className="flex ml-12 max-md:ml-0">
            {/* <p className="w-48 mr-4 border-b-4 border-green-color py-2 font-semibold max-md:text-[1.2rem] max-md:w-[8.3rem]">
              Off Days: 2ds
            </p> */}
            {/* <p className="w-56 border-b-4 border-orange-color py-2 font-semibold max-md:text-[1.2rem] max-md:w-[12rem]">
              Paid Holidays: 10ds
            </p> */}
          </div>

          <div className="my-16 max-md:my-10">
            <div className="bg-second-color w-[38.6rem] mx-auto text-center py-12 rounded-2xl shadow-xl max-[430px]:w-full">
              <h1 className="text-[7rem] font-semibold text-primary-color mb-8 tracking-[0.2rem] max-md:text-[5.2rem]">
                {timer}
              </h1>
              {
                checkInStatus !== '2' && <button
                onClick={handleCheckIn}
                className={`text-white ${
                  checkInStatus === '1' ? 'bg-orange-color' : 'bg-green-color'
                } text-[2.8rem] font-black uppercase py-[1.8rem] w-[25rem] rounded-2xl max-md:text-[2rem] max-md:w-[20rem]`}
              >
                {checkInStatus === '1' ? 'check out' : 'check in'}
              </button>
              }
            </div>
          </div>

          <div className="flex items-end ml-12 max-md:ml-0 max-md:flex-col max-md:items-start">
            <div className="text-holiday-color max-md:mb-10">
              <h4 className="uppercase font-semibold mb-4">date range</h4>

              <select
                className="border border-holiday-color font-medium py-[1rem] px-[1rem]"
                onChange={handleChangeSelect}
                value={selectMonth}
                name="month"
                id="months"
              >
                <option value="1">{`Dec 25 2022 - Jan 25 2023`}</option>
                <option value="2">{`Jan 25 2023 - Feb 25 2023`}</option>
                <option value="3">{`Fed 25 2023 - Mar 25 2023`}</option>
                <option value="4">{`Mar 25 2023 - Apr 25 2023`}</option>
                <option value="5">{`Apr 25 2023 - May 25 2023`}</option>
                <option value="6">{`May 25 2023 - Jun 25 2023`}</option>
                <option value="7">{`Jun 25 2023 - Jul 25 2023`}</option>
                <option value="8">{`Jul 25 2023 - Aug 25 2023`}</option>
                <option value="9">{`Aug 25 2023 - Sep 25 2023`}</option>
                <option value="10">{`Sep 25 2023 - Oct 25 2023`}</option>
                <option value="11">{`Oct 25 2023 - Nov 25 2023`}</option>
                <option value="12">{`Nov 25 2023 - Dec 25 2023`}</option>
              </select>
            </div>
            <div className="flex ml-12 max-md:ml-0">
              <div className="flex items-end">
                <div className="w-[4.5rem] h-[4.2rem] bg-holiday-color border-2 border-border-color max-md:w-[2.8rem] max-md:h-[2.6rem]"></div>
                <p className="ml-3 font-[1.8rem] font-semibold text-primary-color">
                  Holiday
                </p>
              </div>
              <div className="flex items-end ml-8">
                <div className="w-[4.5rem] h-[4.2rem] bg-offline-color border-2 border-border-color max-md:w-[2.8rem] max-md:h-[2.6rem]"></div>
                <p className="ml-3 font-[1.8rem] font-semibold text-primary-color">
                  Offline
                </p>
              </div>
              <div className="flex items-end ml-8">
                <div className="w-[4.5rem] h-[4.2rem] bg-weekend-color border-2 border-border-color max-md:w-[2.8rem] max-md:h-[2.6rem]"></div>
                <p className="ml-3 font-[1.8rem] font-semibold text-primary-color">
                  Weekend
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-md:mt-[1.6rem]">
            <div
              className="overflow-scroll shadow-md"
              style={{ height: 'calc(100vh - 460px' }}
            >
              <table className="table-fixed  w-full text-center rounded-t-xl">
                <thead className="text-primary-color text-[1.8rem] font-semibold max-md:text-[1.3rem]">
                  <tr>
                    <th className="h-[6.6rem] sticky top-0 bg-second-color max-md:h-[5rem]">
                      Date
                    </th>
                    <th className="sticky top-0 bg-second-color">Check in</th>
                    <th className="sticky top-0 bg-second-color">Check out</th>
                    <th className="sticky top-0 bg-second-color">Total time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-second-color text-[1.6rem] text-primary-color font-medium max-md:text-[1.3rem]">
                  {dataList?.map(
                    (item) =>
                      moment().diff(item?.date) >= 0 && (
                        <tr
                          key={item.date}
                          className={`h-[5.4rem] ${
                            item?.total_time === 'w'
                              ? 'bg-weekend-color'
                              : item?.total_time.toUpperCase() === 'O'
                              ? 'bg-offline-color'
                              : item?.total_time.toUpperCase() === 'H'
                              ? 'bg-holiday-color'
                              : ''
                          }`}
                        >
                          <td
                            className={`leading-7 ${
                              item?.total_time === 'w' ? 'text-red-color' : ''
                            }`}
                          >
                            {item?.date}
                          </td>
                          <td>
                            <p
                              className={`py-2 w-[8.9rem] ${
                                item?.check_in === 'w' || item?.check_in === ''
                                  ? 'bg-outer-color h-[2.8rem] max-md:h-[2.5rem]'
                                  : 'border'
                              } mx-auto border-blue-color text-blue-color rounded max-md:w-[7rem]`}
                            >
                              {item?.check_in !== 'w' && item?.check_in}
                            </p>
                          </td>
                          <td>
                            <p
                              className={`py-2 w-[8.9rem] ${
                                item?.check_out === 'w' ||
                                item?.check_out === ''
                                  ? 'bg-outer-color h-[2.8rem] max-md:h-[2.5rem]'
                                  : 'border'
                              } mx-auto border-orange-color text-orange-color rounded max-md:w-[7rem]`}
                            >
                              {item?.check_out !== 'w' && item?.check_out}
                            </p>
                          </td>
                          <td>
                            <p
                              className={`py-2 w-[8.9rem] ${
                                item?.total_time === 'w' ||
                                item?.total_time.toUpperCase() === 'O' ||
                                item?.total_time.toUpperCase() === 'H' ||
                                item?.total_time === ''
                                  ? 'bg-outer-color h-[2.8rem] max-md:h-[2.5rem]'
                                  : 'border'
                              } mx-auto border-primary-color rounded max-md:w-[3.5rem]`}
                            >
                              {item?.total_time !== 'w' &&
                                item?.total_time.toUpperCase() !== 'O' &&
                                item?.total_time.toUpperCase() !== 'H' &&
                                item?.total_time.toUpperCase()}
                            </p>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </>
  );
};

export default Home;
