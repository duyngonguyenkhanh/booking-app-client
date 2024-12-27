import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTransactionsByUserId } from "../../slice/thunk/getTransactionsByUserId";

const Transaction = () => {
  const user = useSelector((state) => state.user.user);
  const transaction = useSelector((state) => state.user.transaction || []);
  const hotels = useSelector((state) => state.user.hotels || []);
  

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.userId) {
      dispatch(getTransactionsByUserId(user.userId));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex justify-center my-[50px]">
        <div className="w-[80%]">
          <h1>Your Transaction</h1>
          <div className="flex bg-[#32A4C1] text-center text-white font-medium">
            <p className="border border-gray-200 w-[5%]">#</p>
            <p className="border border-gray-200 w-[25%]">Hotel</p>
            <p className="border border-gray-200 w-[10%]">Room</p>
            <p className="border border-gray-200 w-[20%]">Date</p>
            <p className="border border-gray-200 w-[10%]">Price</p>
            <p className="border border-gray-200 w-[20%]">Payment</p>
            <p className="border border-gray-200 w-[10%]">Status</p>
          </div>
          {transaction && transaction.length > 0 ? (
            transaction.map((trans, index) => (
              <div key={trans._id} className="flex text-center">
                <p className="border border-gray-200 w-[5%] text-center">
                  {index + 1}
                </p>
                <p className="border border-gray-200 w-[25%]">
                  {findHotelNameById(trans.hotel, hotels)}
                </p>
                <p className="border border-gray-200 w-[10%]">
                  {trans.rooms.map((room, index) => (
                    <span key={index}>
                      {room.roomNumber}
                      {index < trans.rooms.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="border border-gray-200 w-[20%] text-center">
                  {formatDate(trans.dateStart)} - {formatDate(trans.dateEnd)}
                </p>
                <p className="border border-gray-200 w-[10%] text-center">
                {calculateTotalAmount(trans)} USD
                </p>
                <p className="border border-gray-200 w-[20%]">
                  {trans.payment}
                </p>
                <div className="border border-gray-200 w-[10%]">
                  <p
                    className={
                      trans.status === "Booked"
                        ? "bg-red-400"
                        : trans.status === "Pending"
                        ? "bg-yellow-200"
                        : trans.status === "Cancelled"
                        ? "bg-red-200"
                        : "bg-gray-200"
                    }
                  >
                    {trans.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;

//Hàm định dạng lại ngày giờ
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
//hàm tính tiền
const calculateTotalAmount = (transaction) => {
  if (
    !transaction ||
    !transaction.rooms ||
    !transaction.dateStart ||
    !transaction.dateEnd
  ) {
    return 0;
  }

  const { rooms, dateStart, dateEnd } = transaction;

  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);

  const timeDiff = Math.abs(endDate - startDate);
  const numDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const totalAmount = rooms.reduce((total, room) => {
    return total + room.price * numDays;
  }, 0);

  return totalAmount;
};

function findHotelNameById(hotelId, hotelArr) {


  const hotel = hotelArr.find((hotel) => hotel._id === hotelId);

  return hotel ? hotel.name : "Hotel not found";
}
