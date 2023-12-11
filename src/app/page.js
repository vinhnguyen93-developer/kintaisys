'use client';

const Home = () => {
  return (
    <div className="flex">
      <div className="w-1/5 px-6 py-10 h-screen bg-primary-color text-white">
        <div className="flex items-center cursor-pointer">
          <div className="bg-white rounded-md mr-4 shrink-0 sidebar-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/5556/5556512.png" />
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col">
              <h3 className="font-bold mb-3">Nguyen Thi Kim Chinh</h3>
              <p>IT Tech</p>
            </div>

            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>
      <div className="flex-1 px-6 py-10">
        <div className="flex ml-12">
          <p className="w-48 mr-4 border-b-4 border-green-color py-2 font-semibold">
            Off Days: 2ds
          </p>
          <p className="w-56 border-b-4 border-orange-color py-2 font-semibold">
            Paid Holidays: 10ds
          </p>
        </div>

        <div className="my-16">
          <div className="bg-second-color w-[38.6rem] mx-auto text-center py-12 rounded-2xl shadow-xl">
            <h1 className="text-[7rem] font-semibold text-primary-color mb-8 tracking-[0.2rem]">
              07:58:08
            </h1>
            <button className="text-white bg-green-color text-[2.8rem] font-black uppercase py-[1.8rem] w-[25rem] rounded-2xl">
              check in
            </button>
          </div>
        </div>

        <div className="flex items-end ml-12">
          <div className="text-holiday-color">
            <h4 className="uppercase font-semibold mb-4">date range</h4>

            <select
              className="border border-holiday-color font-medium py-[1rem] px-[1rem]"
              name="month"
              id="months"
            >
              <option value="0">Thu, Jan 25 2024 - Fri, Feb 25 2024</option>
              <option value="1">Thu, Jan 25 2024 - Fri, Feb 25 2024</option>
              <option value="2">Thu, Jan 25 2024 - Fri, Feb 25 2024</option>
              <option value="3">Thu, Jan 25 2024 - Fri, Feb 25 2024</option>
            </select>
          </div>
          <div className="flex ml-12">
            <div className="flex items-end">
              <div className="w-[4.5rem] h-[4.2rem] bg-holiday-color border-2 border-border-color"></div>
              <p className="ml-3 font-[1.8rem] font-semibold text-primary-color">
                Holiday
              </p>
            </div>
            <div className="flex items-end ml-8">
              <div className="w-[4.5rem] h-[4.2rem] bg-offline-color border-2 border-border-color"></div>
              <p className="ml-3 font-[1.8rem] font-semibold text-primary-color">
                Offline
              </p>
            </div>
            <div className="flex items-end ml-8">
              <div className="w-[4.5rem] h-[4.2rem] bg-weekend-color border-2 border-border-color"></div>
              <p className="ml-3 font-[1.8rem] font-semibold text-primary-color">
                Weekend
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <table class="table-fixed shadow-md w-full text-center rounded-t-xl">
            <thead className="bg-second-color h-[6.6rem] text-primary-color text-[1.8rem] font-semibold">
              <tr>
                <th>Date</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Total time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Thu, Jan 1 2024</td>
                <td>07:37:45</td>
                <td>17:37:45</td>
                <td>9.1</td>
              </tr>
              <tr>
                <td>Thu, Jan 1 2024</td>
                <td>07:37:45</td>
                <td>17:37:45</td>
                <td>9.1</td>
              </tr>
              <tr>
                <td>Thu, Jan 1 2024</td>
                <td>07:37:45</td>
                <td>17:37:45</td>
                <td>9.1</td>
              </tr>
              <tr>
                <td>Thu, Jan 1 2024</td>
                <td>07:37:45</td>
                <td>17:37:45</td>
                <td>9.1</td>
              </tr>
              <tr>
                <td>Thu, Jan 1 2024</td>
                <td>07:37:45</td>
                <td>17:37:45</td>
                <td>9.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
