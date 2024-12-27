import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableRooms } from "../../slice/thunk/getAvailableRooms";
import { format } from "date-fns";
import { createTransaction } from "../../slice/thunk/createTransaction";
import { useNavigate } from "react-router-dom";
import { resetSuccess } from "../../slice/userSlice";

const Reserve = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reserve = useSelector((state) => state.hotel.hotel || []);
  const err = useSelector((state) => state.user.error || []);
  console.log(err);
  const { user, isSuccess } = useSelector(
    (state) => state.user || localStorage.getItem("user")
  );
  const availabeRooms = useSelector((state) => state.hotel.rooms || []);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [fullName, setFullName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [active, setActive] = useState(true);
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [errors, setErrors] = useState({});

  const handleDateChange = (item) => {
    const newDate = [item.selection];
    setDate(newDate);

    const availableRooms = {
      ids: reserve.rooms,
      start: format(newDate[0].startDate, "yyyy-MM-dd"),
      end: format(newDate[0].endDate, "yyyy-MM-dd"),
    };
    dispatch(getAvailableRooms(availableRooms));
  };

  const handleRoomSelect = (roomNumber) => {
    setSelectedRooms((prevSelected) => {
      if (prevSelected.includes(roomNumber)) {
        return prevSelected.filter((number) => number !== roomNumber);
      } else {
        return [...prevSelected, roomNumber];
      }
    });
  };

  useEffect(() => {
    // Kiểm tra nếu trạng thái là 'fulfilled' và hiện tại là chưa được chuyển hướng
    if (isSuccess) {
      alert("Transaction created successfully!");
      navigate("/transaction"); // Điều hướng về trang chủ hoặc trang khác
      dispatch(resetSuccess());
    }
  }, [navigate, dispatch, isSuccess]);

  useEffect(() => {
    const errors = {};

    if (!fullName) errors.fullName = "Tên đầy đủ là bắt buộc.";
    if (!email) errors.email = "Email là bắt buộc.";
    if (!phone) errors.phone = "Số điện thoại là bắt buộc.";
    if (!cardNumber) errors.cardNumber = "Số thẻ là bắt buộc.";
    if (selectedRooms.length === 0)
      errors.rooms = "Phải chọn ít nhất một phòng.";
    if (date[0].startDate >= date[0].endDate)
      errors.date = "Ngày kết thúc phải sau ngày bắt đầu.";
    if (!selectedOption) errors.payment = "Phương thức thanh toán là bắt buộc.";

    setErrors(errors);
  }, [fullName, email, phone, cardNumber, selectedRooms, date, selectedOption]);

  const handleReserve = () => {
    setActive(false);
    if (Object.keys(errors).length === 0) {
      // If there are no errors, proceed with reservation
      const errors = {};

      if (!fullName) errors.fullName = "Full Name is required.";
      if (!email) errors.email = "Email is required.";
      if (!phone) errors.phone = "Phone Number is required.";
      if (!cardNumber) errors.cardNumber = "Card Number is required.";
      if (selectedRooms.length === 0)
        errors.rooms = "At least one room must be selected.";
      if (date[0].startDate >= date[0].endDate)
        errors.date = "End date must be after start date.";
      if (!selectedOption) errors.payment = "Payment method is required.";

      setErrors(errors);

      // Prevent form submission if there are validation errors
      if (Object.keys(errors).length > 0) {
        return; // Stop execution if there are validation errors
      }
      // Prepare the payload for the API
      const payload = {
        userid: user.userId,
        username: fullName, // Replace this with actual user ID from your auth system
        hotel: reserve._id, // The current hotel ID
        rooms: selectedRooms.map((roomNumber) => {
          // Find the room object based on the room number
          const room = availabeRooms.find((r) =>
            r.roomNumbers.some((rn) => rn.number === roomNumber)
          );
          // Return the payload in the required format
          return {
            id: room ? room._id.toString() : "", // Room ID
            number: roomNumber, // Room number
            price: room ? room.price : 0, // Price
          };
        }),
        dateStart: format(new Date(date[0].startDate), "yyyy-MM-dd"), // Convert to formatted string
        dateEnd: format(new Date(date[0].endDate), "yyyy-MM-dd"), // Convert to formatted string
        payment: selectedOption, // Payment method
        status: "Booked", // Transaction status
      };

      console.log(payload);

      dispatch(createTransaction(payload));
    }
  };

  const numberOfNights = Math.ceil(
    (date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24)
  );
  const totalBill = selectedRooms.reduce((total, roomNumber) => {
    // Tìm phòng tương ứng với roomNumber
    const room = availabeRooms.find((r) =>
      r.roomNumbers.some((rn) => rn.number === roomNumber)
    );

    // Nếu phòng tồn tại, cộng giá phòng * số đêm vào tổng tiền
    if (room) {
      total += room.price * numberOfNights;
    }

    return total;
  }, 0);

  return (
    <div className="flex items-center justify-center h-screen w-[70%] mx-[15%] my-[100px] ">
      <div>
        <div className="flex justify-between">
          <div className="w-[65%]">
            <p className="text-2xl font-bold">{reserve.name}</p>
            <p>{reserve.desc}</p>
          </div>
          <div className="bg-[#EBF3FF] text-center w-[25%] px-[40px] py-[30px]">
            <div className="flex justify-center text-2xl mb-6">
              <p className="mr-3 font-bold">${reserve.cheapestPrice}</p>
              <p className="font-thin text-gray-600">(1 night)</p>
            </div>
            <button className="bg-[#0071C2] px-[30px] py-1 text-xl text-white">
              Reserve or Book Now!
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-[40%]">
            <p className="text-2xl font-bold">Dates</p>
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
            />
          </div>
          <div className="w-[60%]">
            <p className="text-2xl font-bold">Reserve Info</p>
            <form>
              <p className="text-xl my-1">Your Full Name</p>
              <input
                className="w-full p-2 border border-gray-500"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName}</p>
              )}

              <p className="text-xl my-1">Your Email</p>
              <input
                className="w-full p-2 border border-gray-500"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <p className="text-xl my-1">Your Phone Number:</p>
              <input
                className="w-full p-2 border border-gray-500"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}

              <p className="text-xl my-1">Your Identity Card Number</p>
              <input
                className="w-full p-2 border border-gray-500"
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {errors.cardNumber && (
                <p className="text-red-500">{errors.cardNumber}</p>
              )}
            </form>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">Select Rooms</p>
          <div className="flex mr-6">
            {Array.isArray(availabeRooms) && availabeRooms.length > 0 ? (
              availabeRooms.map((room) => (
                <div key={room._id}>
                  <p className="font-bold">{room.title}</p>
                  <div className="flex mr">
                    <p className="mr-3">
                      Pay nothing until{" "}
                      {format(date[0].endDate, "MMMM dd, yyyy")}
                    </p>
                    <div className="flex mr">
                      {room.roomNumbers.map((roomNumber) => (
                        <div
                          className="flex flex-col mr-6"
                          key={roomNumber.number}
                        >
                          <label htmlFor={`room-${roomNumber.number}`}>
                            {roomNumber.number}
                          </label>
                          <input
                            type="checkbox"
                            id={`room-${roomNumber.number}`}
                            name={`room-${roomNumber.number}`}
                            value={roomNumber.number}
                            onChange={() => handleRoomSelect(roomNumber.number)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex">
                    <p className="mr-2">Max people: </p>
                    <p className="font-extrabold">{room.maxPeople}</p>
                  </div>
                  <p className="font-bold">${room.price}</p>
                </div>
              ))
            ) : (
              <p>No rooms available</p>
            )}
          </div>

          <div>
            <p className="text-xl font-bold">
              Total Bill: ${totalBill.toFixed(2)}
            </p>
            <div className="flex">
              <div className="mr-10">
                <select
                  id="exampleSelect"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="bg-gray-300 py-2 border border-black rounded-sm"
                >
                  <option value="">Select Payment Method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.payment && (
                  <p className="text-red-500">{errors.payment}</p>
                )}
              </div>
              <button
                onClick={handleReserve}
                className={`bg-[#0071C2] px-[30px] py-1 text-xl ${active === true? "" : "opacity-50 cursor-not-allowed"} text-white ${
                  Object.keys(errors).length === 0
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!active}
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
