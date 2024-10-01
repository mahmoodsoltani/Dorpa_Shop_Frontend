import "../css/product.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Rating = (props: { rate: number }) => {
  const getFullStar = (count: number) => {
    let stars = [];
    for (let index = 0; index < Math.floor(count); index++) {
      stars.push(
        <i className='fa-sharp fa-solid fa-star text-warning' key={index}></i>
      );
    }
    return stars;
  };
  const getEmptyStar = (count: number) => {
    let stars = [];
    for (let index = 5; index > Math.ceil(count); index--) {
      stars.push(
        <i className='fa-sharp fa-regular fa-star text-warning' key={index}></i>
      );
    }
    return stars;
  };
  return (
    <>
      {getFullStar(props.rate)}
      {Math.ceil(props.rate) !== Math.floor(props.rate) ? (
        <i className='fa-regular fa-star-half-stroke text-warning'></i>
      ) : (
        ""
      )}
      {getEmptyStar(props.rate)} &nbsp;({props.rate}) &nbsp;
    </>
  );
};

export default Rating;
