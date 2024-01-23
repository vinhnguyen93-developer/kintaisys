import ReactModal from 'react-modal';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from "uuid";
import { 
  convertArrayList,
  convertArraySplitDayList,
  convertArrayModal,
  convertArraySplitDayModal
} from "@/utils/convertArray";
import {
  refreshToken,
  wirteRequest,
  updateData
} from "@/utils/spreadsheet";
import { useSession, signOut } from 'next-auth/react';
import Loading from "../loading";
import { jwtDecode } from "jwt-decode";

const ModalDayOff = ({ isOpen, closeModal, dataList }) => {
  if (!isOpen) {
    return null;
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [items, setItems] = useState([]);
  const [convertDateSelect, setConvertDateSelect] = useState([]);
  const [selectedOption, setSelectedOption] = useState('2');
  const [textValue, setTextValue] = useState('');
  const [errMessageDate, setErrMessageDate] = useState(false);
  const { data, update } = useSession();
  const [loading, setLoading] = useState(false);

  const handleDateChange = (dates) => {
    setErrMessageDate(false)
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleClick = () => {
    onSelect(label);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };
  const startDateFormat = startDate?.toLocaleDateString('en-GB')
  const endDateFormat = endDate?.toLocaleDateString('en-GB')

  const arrayList = convertArrayList(dataList)
  const arraySplitDayList = convertArraySplitDayList(arrayList)

  const addDayOff = () => {
    const newItem = {
      id: uuidv4(),
      email: data.user.email,
      type: selectedOption,
      reason: textValue,
      date: (!endDate || startDateFormat === endDateFormat)
        ? `${startDateFormat}` : `${startDateFormat} - ${endDateFormat}`
    };

    // Check the conditions for adding a date 
    const mappedValues = items.map((item) => item.date);
    const startStr = moment(startDateFormat, 'DD/MM/YYYY');
    const endStr = moment(endDateFormat, 'DD/MM/YYYY');
    for (const d of mappedValues) {
      const [s, e] = d.split(' - ');
      const sStr = moment(s, 'DD/MM/YYYY');
      const eStr = moment(e, 'DD/MM/YYYY');
      if (startStr.isSameOrAfter(sStr) && endStr.isSameOrBefore(eStr)) {
        setErrMessageDate(true)
        return;
      }
      if ((startDateFormat >= sStr.format('DD/MM/YYYY')) && (eStr.format('DD/MM/YYYY') !== 'Invalid date' && startDateFormat <= eStr.format('DD/MM/YYYY'))) {
        setErrMessageDate(true)
        return;
      }
      if (endDateFormat >= sStr.format('DD/MM/YYYY') && endDateFormat <= eStr.format('DD/MM/YYYY')) {
        setErrMessageDate(true)
        return;
      }
    }

    const convertDateSelect = [
      {
        type: selectedOption,
        date: (!endDate || startDateFormat === endDateFormat)
        ? `${startDateFormat}` : `${startDateFormat} - ${endDateFormat}`
      }
    ]

    const arrayModal = convertArrayModal(convertDateSelect)
    const arraySplitDayModal = convertArraySplitDayModal(arrayModal)

    const checkDateExists = arraySplitDayModal.some(obj1 => arraySplitDayList.some(obj2 => obj1.date === obj2.date && obj1.type === obj2.type))

    if (checkDateExists) {
      setErrMessageDate(true)
    } else {
      setItems([...items, newItem]);
      setTextValue('');
      setSelectedOption('2')
      setStartDate(null)
      setEndDate(null)
    }
  };

  const addRequestPostToSheet = () => {
    setLoading(true);
    const callbacks = {
      onSuccess: () => {
        wirteRequest(items, data.accessToken)
          .then((res) => {
            closeModal();
            setLoading(false);
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi:", error);
            setLoading(false);
          });
      },
      onFail: () => {
        setLoading(false);
        closeModal();
        signOut();
      }
    }
    updateData(callbacks, data, update)
  };

  const isWeekend = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 5; // 0 is Sunday, 6 is Saturday
  };

  const targetIndices = [0, 1];
  const filteredArray = items.filter((item, index) => targetIndices.includes(index));
  const mappedValues = filteredArray.map((item) => item.date);

  const onCloseBoxDayOff = (id) => {
    const updatedArray = [...items];
    const indexToDelete = updatedArray.findIndex((item) => item.id === id);

    if (indexToDelete !== -1) {
      updatedArray.splice(indexToDelete, 1);

      updatedArray.forEach((item, index) => {
        item.id = index + 1;
      });

      setItems(updatedArray);
    }
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const maxCharacters = 500;
  const remainingCharacters = maxCharacters - textValue?.length;

  useEffect(() => {
    setItems(items)
  }, [items]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Request to day off"
    >
      <p className="mb-5 text-start mb-10">Fill out this form to request time off. You'll receive an email once the request has been approved.</p>
      <div className="w-100 justify-center mb-5 wrap-box-modal p-5">
        <div className="flex w-100 mb-5 place-items-center">
          <p className="font-semibold mr-10">Hours</p>
          <select
            id="mySelect"
            value={selectedOption}
            onChange={handleSelectChange}
            className="selectBox"
          >
            <option value="2">All day</option>
            <option value="0">Morning Off</option>
            <option value="1">Afternoon Off</option>
          </select>
          {errMessageDate && <div className="w-100 place-items-center ml-auto">
            <p className="font-semibold text-red-color">Your date has already been selected</p>
          </div>}
        </div>
        <div className="flex gap-10 mt-10 justify-between">
          <div className="flex">
            <p className="font-semibold mr-10">When</p>
            <div className="text-center mr-10">
              <div className="flex gap-5 mb-5 justify-end">
                {(startDateFormat || endDateFormat) && <p className="text-orange-color font-semibold">{startDateFormat} - {endDateFormat}</p>}
                <i className="fa-solid fa-calendar-plus text-orange-color"></i>
              </div>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                inline
                minDate={new Date()}
                className="customDatePicker"
                filterDate={isWeekend}
              />
            </div>
          </div>

          <div className="flex">
            <p className="font-semibold mr-10">Reasons</p>
            <div>
              <textarea
                className="textarea"
                value={textValue}
                onChange={handleTextChange}
                placeholder="Type reason for off ..."
                rows={4} // Set the number of rows as needed
                cols={50} // Set the number of columns as needed
                style={{ width: '450px', height: '170px' }} // Set fixed size
                maxLength="500"
              />
              <p className="text-blue-color text-[1.2rem] mt-2">
                {remainingCharacters} characters remainning..({maxCharacters} maximum)
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-20 my-10">
          <button
            onClick={addDayOff}
            className="add-day flex text-white bg-blue-color uppercase py-[1rem] px-[2rem] rounded-2xl max-md:w-[20rem] mx-10"
            disabled={!selectedOption || !textValue || !startDateFormat}
          >
            <img className="mr-3" src="/add.png" alt="My Image" width="12" height="12" />
            Add day
          </button>
        </div>
        <hr className="mb-10" />
        <div className={`wrap-custom-box gap-10 justify-start ${items?.length > 0 && `p-8`}`}>
          {items.map((item, index) => (
            <div key={index} className="border-tab">
              <p className="font-semibold mr-3 mb-1">Request {index + 1}</p>
              <div className="custom-box">
                <button
                  onClick={() => onCloseBoxDayOff(item.id)}
                  className="close-box"
                >
                  <i class="fa-regular fa-circle-xmark"></i>
                </button>
                <div className="flex my-2 gap-7">
                  <p className="font-semibold">Hours: </p>
                  <p>{item?.type === '0' ? 'Morning' : item?.type === '1' ? 'Afternoon' : 'All day'}</p>
                </div>
                <div className="flex my-2 gap-10">
                  <p className="font-semibold">Date:</p>
                  <p className="">{item?.date}</p>
                </div>
                <div className="flex my-2 gap-3">
                  <p className="font-semibold">Reason:</p>
                  <p className="text-ellipsis">{item?.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-20">
        <button
          onClick={addRequestPostToSheet}
          className="text-white bg-orange-color py-[1rem] px-[2rem] rounded-2xl max-md:w-[20rem] mx-10"
        >
          Request Time Off
        </button>
        <button
          onClick={closeModal}
          className="text-orange-color bd-orange-color bg-white-color uppercase py-[1rem] px-[2rem] rounded-2xl max-md:w-[20rem] mx-10"
        >
          Cancel
        </button>
      </div>
      {loading && <Loading />}
    </ReactModal>
  );
};
export default ModalDayOff;