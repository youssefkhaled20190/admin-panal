import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import ReactPaginate from "react-paginate";

import { Table, Card, CardHeader, CardBody , Button  } from "reactstrap";

const RateTable = () => {
  const [Rates, setRates] = useState([]);
  const [productName , setProductName]=("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
    const fetchRates = async () => {
      try {
        const response = await axiosInstance.get("Rating");
        console.log("Fetched Rating:", response.data); // Log fetched data
        setRates(response.data);
        const ProductName = await axiosInstance.get(`Product/${response.data.productId}`)
        setProductName(ProductName.data.productTittle)
        console.log(productName)


      } catch (error) {
        console.error("Error fetching Rating:", error);
      }
    };


  useEffect(() => {
    fetchRates();
  }, []);


  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(Rates.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = Rates.slice(offset, offset + itemsPerPage);


  return (
    <Card >
      <CardHeader>Show Product Rates</CardHeader>
      <CardBody>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>Rate</th>
              <th>Comment</th>
              <th>Product Code</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((rate, index) => (
              <tr key={rate.id}>
                <th scope="row">{rate.score}</th>
                <td>{rate.comment}</td>
                <td>
                <td>{rate.productId}</td>
            
            </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
        previousLabel={"<<previous"}
        nextLabel={"next>>"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />


      </CardBody>
    </Card>
  );
};

export default RateTable;
