import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import ReactPaginate from "react-paginate";
import "./Style/Categories.css"
import EditCategoryModal from "./EditCategory"
import { Table, Card, CardHeader, CardBody , Button  } from "reactstrap";

const CategoryTable = () => {
  const [Category, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const itemsPerPage = 5;

  const toggleModal = () => setModal(!modal);



    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("Category");
        console.log("Fetched Categories:", response.data); // Log fetched data
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };


  useEffect(() => {
    fetchCategories();
  }, []);



  const handleEdit = (CategoryId) => {
    // Handle edit action
    setSelectedCategoryId(CategoryId);
    toggleModal();
  };


    const DeleteCateory = async (categoryId) => {
      try {
        const response = await axiosInstance.delete(`Category/${categoryId}`);
        console.log("deleted category:", categoryId); // Log fetched data
        setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    } catch (error) {
        console.error("Error on deleting Category:", error);
      }
    };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(Category.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = Category.slice(offset, offset + itemsPerPage);


  return (
    <Card >
      <CardHeader>All categories that in System</CardHeader>
      <CardBody>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>CatNum</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((Category, index) => (
              <tr key={Category.id}>
                <th scope="row">{index + 1}</th>
                <td>{Category.categoryName}</td>
                <td>
              <Button size="sm" color="warning" onClick={() => handleEdit(Category.id)} >
                <i className="fas fa-edit"></i>
              </Button>{" "}
              <Button color="danger" onClick={() => DeleteCateory(Category.id)}>
                <i className="fas fa-trash-alt"></i>
              </Button>
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

{selectedCategoryId && (
          <EditCategoryModal
            isOpen={modal}
            toggle={toggleModal}
            CatId={selectedCategoryId}
            onSave={fetchCategories}
            size="xl"
          />
        )}
      </CardBody>
    </Card>
  );
};

export default CategoryTable;
