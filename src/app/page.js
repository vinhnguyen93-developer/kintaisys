'use client';

import { useEffect, useState } from 'react';

const Home = () => {
  const time = new Date();

  const [isCheckIn, setIsCheckIn] = useState(false);
  const [timer, setTimer] = useState(
    `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  );

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      console.log(date.getHours());
      setTimer(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    }, 1000);
  }, []);

  const handleCheckIn = () => {
    setIsCheckIn(!isCheckIn);
  };

  return (
    <div className="flex max-md:flex-col">
      <div className="w-1/5 px-6 py-10 h-screen bg-primary-color text-white max-md:w-full max-md:h-full">
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
                <tr className="h-[5.4rem]">
                  <td className="leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
                <tr className="h-[5.4rem]">
                  <td className="max-md:leading-7">Thu, Jan 1 2024</td>
                  <td>
                    <span className="py-2 px-2.5 border border-blue-color text-blue-color rounded">
                      07:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-2.5 border border-orange-color text-orange-color rounded">
                      17:37:45
                    </span>
                  </td>
                  <td>
                    <span className="py-2 px-10 border border-primary-color rounded">
                      9.1
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
