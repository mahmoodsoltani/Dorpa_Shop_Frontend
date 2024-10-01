import "bootstrap/dist/css/bootstrap.min.css";

import "../../css/page/product.css";
import { searchPanelPropsType } from "../../type/propsType";

const SearchPanel = (props: searchPanelPropsType) => {
  return (
    <>
      <div className='pt-3 h-auto pb-2 top '>
        <i className='fa-solid fa-magnifying-glass pt-1 mb-1'></i>
        <p className='pt-1 mb-1'>&nbsp;Search :&nbsp;</p>
        <input
          type='text'
          value={props.searchTerm ?? 0}
          name='searchTerm'
          onChange={props.onHandelSearchChange}
          className='rounded w-50 h-6 text-sm p-1'
        />
      </div>
    </>
  );
};

export default SearchPanel;
