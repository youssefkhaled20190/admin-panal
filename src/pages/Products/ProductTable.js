import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import ReactPaginate from "react-paginate";
import "./style/Products.css";
import EditModal from "./EditProduct";
import { Table, Card, CardHeader, CardBody, Button } from "reactstrap";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const toggleModal = () => setModal(!modal);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("Product");
      console.log("Fetched products:", response.data); // Log fetched data
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Handle edit action
    setSelectedProductId(productId);
    toggleModal();
  };

  const DeleteProduct = async (ProductId) => {
    try {
      const response = await axiosInstance.delete(`Product/${ProductId}`);

      console.log("deleted Product:", ProductId); // Log fetched data
      setProducts((prevProduct) =>
        prevProduct.filter((products) => products.id !== ProductId)
      );
    } catch (error) {
      console.error("Error on deleting Product:", error);
    }
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);

  return (
    <Card>
      <CardHeader>All products that in System</CardHeader>
      <CardBody>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>ProdNum</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Count</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>{product.productTittle}</td>
                <td>{product.productPrice}</td>
                <td>{product.productDescription.substring(0,12)}...</td>
                <td>{product.count}</td>
                <td>
                  {product.imageName ? (
                    <img
                      src={`https://localhost:7121/files/Images/${product.imageName}`}
                      alt={product.productTittle}
                      style={{ width: "100px", height: "100px" }}
                      //   onError={(e) => {
                      //     console.error(`Failed to load image: ${e.target.src}`);
                      //     e.target.src = "/path/to/default/image.jpg"; // Fallback image
                      //   }}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td>
                  <Button
                    size="lg"
                    color="warning"
                    onClick={() => handleEdit(product.id)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>{" "}
                  <Button
                  size="lg"
                    color="danger"
                    onClick={() => DeleteProduct(product.id)}
                  >
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

        {selectedProductId && (
          <EditModal
            isOpen={modal}
            toggle={toggleModal}
            productId={selectedProductId}
            onSave={fetchProducts}
            size="xl"
          />
        )}
      </CardBody>
    </Card>
  );
};

export default ProductTable;
