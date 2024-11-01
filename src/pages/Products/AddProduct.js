import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormText,
  Button,
} from "reactstrap";
import { useFormik } from "formik";
import axiosInstance from "../../axios/axiosInstance";
import ProductTable from "./ProductTable";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the image file directly
    formik.setFieldValue("image", file); // Update Formik value
  };

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("Fetching categories..."); // Log here
      try {
        const response = await axiosInstance.get("Category");
        console.log("Response:", response); // Log response
        setCategories(response.data);
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCategories();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.productTittle) {
      errors.productTittle = "Required";
    }
    if (!values.productPrice) {
      errors.productPrice = "Required";
    }
    if (!values.productDescription) {
      errors.productDescription = "Required";
    }
    if (!values.count) {
      errors.count = "Required";
    }
    if (!values.image) { // Check for the file itself
      errors.image = "Required";
    }
    if (!values.categoryId) {
      errors.categoryId = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      productTittle: "",
      productPrice: "",
      productDescription: "",
      rating: null,
      count: "",
      image: null,
      categoryId: "",
    },
    validate,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('id', 0);
      formData.append('productTittle', values.productTittle);
      formData.append('productPrice', values.productPrice);
      formData.append('productDescription', values.productDescription);
      formData.append('rating', values.rating || 0);
      formData.append('count', values.count);
      formData.append('image', values.image); // Append image file
      formData.append('categoryId', values.categoryId);

      try {
        const response = await axiosInstance.post("Product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setSuccess(true); // Product added successfully
          setError(""); // Clear any error messages
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to add product!");
        setSuccess(false); // Show error message
      }
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>Add Products</CardHeader>
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup row>
              <Label for="exampleTittle" sm={2}>
                Product Title
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleTittle"
                  name="productTittle"
                  placeholder="Enter the name of the product"
                  type="text"
                  value={formik.values.productTittle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productTittle && formik.errors.productTittle ? (
                  <div className="text-danger">{formik.errors.productTittle}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePrice" sm={2}>
                Product Price
              </Label>
              <Col sm={10}>
                <Input
                  id="examplePrice"
                  name="productPrice"
                  placeholder="Enter the price"
                  type="number"
                  value={formik.values.productPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productPrice && formik.errors.productPrice ? (
                  <div className="text-danger">{formik.errors.productPrice}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleDescription" sm={2}>
                Product Description
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleDescription"
                  name="productDescription"
                  type="textarea"
                  value={formik.values.productDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productDescription && formik.errors.productDescription ? (
                  <div className="text-danger">{formik.errors.productDescription}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleCount" sm={2}>
                Product Count
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleCount"
                  name="count"
                  placeholder="Enter the count"
                  type="number"
                  value={formik.values.count}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.count && formik.errors.count ? (
                  <div className="text-danger">{formik.errors.count}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                Image
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleFile"
                  name="image" // Correct field name
                  type="file"
                  onChange={handleImageChange}
                  onBlur={formik.handleBlur}
                />
                <FormText>Select an image of Your Product</FormText>
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-danger">{formik.errors.image}</div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleCategory" sm={2}>
                Category
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleCategory"
                  name="categoryId"
                  type="select"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Select category" />
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Input>
                {formik.touched.categoryId && formik.errors.categoryId ? (
                  <div className="text-danger">{formik.errors.categoryId}</div>
                ) : null}
              </Col>
            </FormGroup>

            <Button color="success" size="" type="submit">
              Save
            </Button>
            {success && <div className="text-success">Product added successfully!</div>}
            {error && <div className="text-danger">{error}</div>}
          </Form>
        </CardBody>
      </Card>
      <br>
      </br>
      <br></br>

      <ProductTable/>
    </div>
  );
};

export default Products;
