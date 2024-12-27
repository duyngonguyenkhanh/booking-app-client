import { useSelector } from "react-redux";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  //Nhận hotels từ store
  const hotels = useSelector((state) => state.user.hotels);
  //đếm số lượng có trong mỗi thành phố
  const properties = countHotelsByCity(hotels);
  //đếm số lượng type
  const types = countHotelsByType(hotels)

  const rating = sortHotelsByRating(hotels)
  console.log(types);
  
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured  properties={properties}/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList  types={types}/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties featured={rating} /> 
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;


const countHotelsByCity = (hotels) => {
  // Khởi tạo đối tượng đếm số lượng khách sạn theo thành phố
  const cityCounts = {
    hanoi: 0,
    hochiminh: 0,
    danang: 0
  };

  // Duyệt qua danh sách khách sạn và kiểm tra thành phố của mỗi khách sạn
  hotels.forEach((hotel) => {
    const city = hotel.city.toLowerCase(); // chuyển tên thành phố về chữ thường để so sánh
    if (city.includes("ha noi")) {
      cityCounts.hanoi += 1;
    } else if (city.includes("ho chi minh")) {
      cityCounts.hochiminh += 1;
    } else if (city.includes("da nang")) {
      cityCounts.danang += 1;
    }
  });

  return cityCounts;
};
//đếm số lượng type có trong mảng
const countHotelsByType = (hotels) => {
  const typeCounts = {
    hotel: 0,
    apartments:0,
    resorts: 0,
    villas: 0,
    cabin: 0,
  };

  hotels.forEach((hotel) => {
    const type = hotel.type.toLowerCase(); // chuyển type về chữ thường để so sánh nhất quán
    if (typeCounts[type]) {
      typeCounts[type] += 1;
    } else {
      typeCounts[type] = 1; // nếu chưa có type này thì khởi tạo với giá trị là 1
    }
  });

  return typeCounts;
};

const sortHotelsByRating = (hotels) => {
  // Tạo một bản sao của mảng hotels trước khi sắp xếp
  const hotelsCopy = [...hotels]; // hoặc hotels.slice();
  
  return hotelsCopy.sort((a, b) => b.rating - a.rating);
};

