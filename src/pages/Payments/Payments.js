import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import ReactPaginate from "react-paginate";

import { Table, Card, CardHeader, CardBody , Button  } from "reactstrap";

const PaymentTable = () => {
  const [Payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const itemsPerPage = 5;




    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get("Payment");
        console.log("Fetched Payments:", response.data); // Log fetched data
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching Paymnets:", error);
      }
    };


  useEffect(() => {
    fetchPayments();
  }, []);



  

   
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(Payments.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = Payments.slice(offset, offset + itemsPerPage);


  return (
    <Card >
      <CardHeader>All categories that in System</CardHeader>
      <CardBody>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>payNum</th>
              <th>Amount</th>
              <th>Product Name</th>
              <th>User Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((Payments, index) => (
              <tr key={Payments.id}>
                <th scope="row">{index + 1}</th>
                <td>{Payments.amount}</td>
                <td>{Payments.productName}</td>
                <td>{Payments.firstName}  {Payments.lastName} </td>
                <td>{Payments.address}</td>
                <td>{Payments.email}</td>
                <td>{Payments.phone}</td>
                <td>{Payments.paymentMethod}</td>
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

export default PaymentTable;
