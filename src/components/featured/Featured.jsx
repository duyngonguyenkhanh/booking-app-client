import "./featured.css";

const Featured = ({properties}) => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="/Ha Noi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hà Nội</h1>
          <h2>{properties.hanoi} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="/HCM.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Hồ Chí Minh</h1>
          <h2>{properties.hochiminh} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="/Da Nang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Đà Nẵng</h1>
          <h2>{properties.danang} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
