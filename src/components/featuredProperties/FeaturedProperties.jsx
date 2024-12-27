import "./featuredProperties.css";
//eslint-disable-next-line
const FeaturedProperties = ({ featured = [] }) => {
  return (
    <div className="fp">
      {featured.map((hote) => (
        <div key={hote._id} className="fpItem">
          <img src={hote.photos[0]} alt="" className="fpImg" />
          <span className="fpName">
            <a href="./hotels/0" target="_blank">
              {hote.name}
            </a>
          </span>
          <span className="fpCity">{hote.city}</span>
          <span className="fpPrice">Starting from ${hote.cheapestPrice}</span>
          <div className="fpRating">
            <button>{hote.rating}</button>
            <span>Excellent</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
