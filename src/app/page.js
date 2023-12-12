'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';

import { dataFake } from './data';
import Loading from './loading';

const Home = () => {
  const time = new Date();

  const [loading, setLoading] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [selectMonth, setSelectMonth] = useState(0);
  const [timer, setTimer] = useState(
    `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  );

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

  const handleCheckIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCheckIn(!isCheckIn);
    }, 3000);
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
              <img src="https://cdn-icons-png.flaticon.com/512/5556/5556512.png" />
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold mb-3">Nguyen Thi Kim Chinh</h3>
                <p>IT Tech</p>
              </div>

              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div className="flex-1 px-6 py-10 h-screen">
          <div className="flex ml-12 max-md:ml-0">
            <p className="w-48 mr-4 border-b-4 border-green-color py-2 font-semibold max-md:text-[1.2rem] max-md:w-[8.3rem]">
              Off Days: 2ds
            </p>
            <p className="w-56 border-b-4 border-orange-color py-2 font-semibold max-md:text-[1.2rem] max-md:w-[12rem]">
              Paid Holidays: 10ds
            </p>
          </div>

          <div className="my-16 max-md:my-10">
            <div className="bg-second-color w-[38.6rem] mx-auto text-center py-12 rounded-2xl shadow-xl max-[430px]:w-full">
              <h1 className="text-[7rem] font-semibold text-primary-color mb-8 tracking-[0.2rem] max-md:text-[5.2rem]">
                {timer}
              </h1>
              <button
                onClick={handleCheckIn}
                className={`text-white ${
                  isCheckIn ? 'bg-orange-color' : 'bg-green-color'
                } text-[2.8rem] font-black uppercase py-[1.8rem] w-[25rem] rounded-2xl max-md:text-[2rem] max-md:w-[20rem]`}
              >
                {isCheckIn ? 'check out' : 'check in'}
              </button>
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
                <option value="0">{`Thu, Dec 25 2023 - Fri, Jan 25 2024`}</option>
                <option value="1">{`Thu, Jan 25 2024 - Fri, Feb 25 2024`}</option>
                <option value="2">{`Thu, Jan 25 2024 - Fri, Feb 25 2024`}</option>
                <option value="3">{`Thu, Jan 25 2024 - Fri, Feb 25 2024`}</option>
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
                  {dataFake?.map((item) => (
                    <tr
                      key={item.id}
                      className={`h-[5.4rem] ${
                        moment(item.date, 'DD/MM/YYYY').weekday() === 0 ||
                        moment(item.date, 'DD/MM/YYYY').weekday() === 6
                          ? 'bg-weekend-color'
                          : ''
                      }`}
                    >
                      <td
                        className={`leading-7 ${
                          moment(item.date, 'DD/MM/YYYY').weekday() === 0 ||
                          moment(item.date, 'DD/MM/YYYY').weekday() === 6
                            ? 'text-red-color'
                            : ''
                        }`}
                      >
                        {item.date}
                      </td>
                      <td>
                        <p
                          className={`py-2 w-[8.9rem] ${
                            item?.check_in
                              ? 'border'
                              : 'bg-outer-color h-[2.8rem] max-md:h-[2.5rem]'
                          } mx-auto border-blue-color text-blue-color rounded max-md:w-[7rem]`}
                        >
                          {item?.check_in}
                        </p>
                      </td>
                      <td>
                        <p
                          className={`py-2 w-[8.9rem] ${
                            item?.check_out
                              ? 'border'
                              : 'bg-outer-color h-[2.8rem] max-md:h-[2.5rem]'
                          } mx-auto border-orange-color text-orange-color rounded max-md:w-[7rem]`}
                        >
                          {item?.check_out}
                        </p>
                      </td>
                      <td>
                        <p
                          className={`py-2 w-[8.9rem] ${
                            item?.check_in
                              ? 'border'
                              : 'bg-outer-color h-[2.8rem] max-md:h-[2.5rem]'
                          } mx-auto border-primary-color rounded max-md:w-[3.5rem]`}
                        >
                          {item?.check_in &&
                            moment(item?.check_out, 'hhmm').diff(
                              moment(item?.check_in, 'hhmm'),
                              'hours'
                            )}
                        </p>
                      </td>
                    </tr>
                  ))}
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
