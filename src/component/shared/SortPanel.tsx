import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SortPanelPropsType } from "../../type/propsType";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const SortPanel = (props: SortPanelPropsType) => {
  return (
    <>
      <div className='pt-3 h-auto pb-3 top '>
        <p className='pt-1 mb-1 '>Sort By :&nbsp;&nbsp;</p>
        <select
          className='w-50 rounded '
          value={props.sortBy}
          onChange={props.onHandelSortByChange}
        >
          <option value=''>Sort By</option>
          <option value='name'>Title</option>
          <option value='price'>Price</option>
        </select>

        <button
          className='pt-1 mb-3 bg-white  text-black '
          onClick={props.onHandelOrderChange}
        >
          {props.order ? <FaArrowUp /> : <FaArrowDown />}
        </button>
      </div>
    </>
  );
};

export default SortPanel;
