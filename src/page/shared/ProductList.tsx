import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, PaginationProps } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { productActions } from "../../app/service/productAggregate/productSlice";
import { ProductReadDto } from "../../app/data/dto/productAggregate/productDtos";
import { AppDispatch, RootState } from "../../app/service/shared/store";
import ProductCard from "../../component/shared/ProductCard";
import SortPanel from "../../component/shared/SortPanel";
import SearchPanel from "../../component/shared/SearchPanel";
import "../../css/page/product.css";
// Define a type for your product data

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const searchKey = location.state?.searchKey ?? "";
  const { loading, error, data } = useSelector(
    (state: RootState) => state.productR
  );

  const [searchTerm, setSearchTerm] = useState<string | null>(searchKey);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        productActions.getAllProduct({
          pageNumber: currentPage,
          pageSize: pageSize,
          sortBy: sortBy,
          isAscending: sortOrder,
          searchTerm: searchTerm,
          searchBy: "name",
        })
      );
    };

    setTotalCount(data.totalCount);
    fetchData().catch(console.error);
  }, [pageSize, currentPage, sortOrder, searchTerm, totalPages, sortBy]);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };
  const onPageSizeChange: PaginationProps["onChange"] = (current, size) => {
    setCurrentPage(Math.ceil(((current - 1) * pageSize) / size));
    setPageSize(size);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  const handleOrderChange = () => {
    setSortOrder(!sortOrder);
  };
  const handelSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className='w-100'>
        <div className='search-sor-panel'>
          <SearchPanel
            searchTerm={searchTerm}
            onHandelSearchChange={handelSearchChange}
          />
          <SortPanel
            order={sortOrder}
            sortBy={sortBy}
            onHandelOrderChange={handleOrderChange}
            onHandelSortByChange={handleSortByChange}
          />
        </div>
        <hr />

        <div className='pb-2 top pagination-container'>
          {loading && <span>Loading ...</span>}
          <Pagination
            total={data.totalCount}
            showSizeChanger
            showQuickJumper
            pageSize={pageSize}
            defaultCurrent={currentPage}
            onChange={onChange}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
            onShowSizeChange={(current, size) =>
              onPageSizeChange(current, size)
            }
          />
        </div>
        <div className='product-list-container '>
          {data.items.length == 0 && (
            <div className='flex items-start justify-center h-full'>
              <span className='font-bold'>
                No Result. Change the search key.
              </span>
            </div>
          )}
          {data.items.map((product: ProductReadDto) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
