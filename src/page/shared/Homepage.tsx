import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../css/page/homepage.css";
import { AppDispatch, RootState } from "../../app/service/shared/store";
import { productActions } from "../../app/service/productAggregate/productSlice";
import CardSlider from "../../component/shared/CardSlider";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.productR
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        productActions.getAllProduct({
          pageNumber: 1,
          pageSize: null,
          sortBy: "create_date",
          isAscending: true,
          searchTerm: null,
          searchBy: null,
        })
      );
    };

    fetchData().catch(console.error);
  }, []);
  const handleShopNavigate = () => {
    navigate("/product");
  };
  return (
    <div>
      <div className='hero-section'>
        <div className='hero-text'>
          <h1>EXPERIENCE THE FREEDOM</h1>
          <button className='buy-now' onClick={handleShopNavigate}>
            BUY NOW
          </button>{" "}
          <p>
            Four wheels move the body, but two wheels move the soul. Embrace the
            thrill of the ride and discover a new dimension of freedom and
            adventure. If you’ve never owned a bike, you’ve yet to understand
            the true exhilaration of the journey.
          </p>
        </div>
        <div className='hero-image'></div>
      </div>
      {!loading && (
        <div>
          <CardSlider products={data.items} title='Recently Added Products' />
          <CardSlider
            products={data.items
              .filter(
                (product) =>
                  product.discountPercentage && product.discountPercentage > 0
              )
              .sort((p1, p2) => {
                const discount1 = p1.discountPercentage || 0;
                const discount2 = p2.discountPercentage || 0;
                return discount2 - discount1;
              })}
            title='All Discounted Product'
          />
        </div>
      )}
    </div>
  );
};
export default Home;
