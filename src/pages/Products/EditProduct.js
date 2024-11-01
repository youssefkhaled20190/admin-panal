import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormText,
} from "reactstrap";
import { useFormik } from "formik";
import axiosInstance from "../../axios/axiosInstance";

function EditModal({ isOpen, productId, toggle, onSave, size = "lg" }) {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`Product/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error.response ? error.response.data : error.message);
        }
      };
      fetchProduct();
    }

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("Category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.response ? error.response.data : error.message);
      }
    };
    fetchCategories();
  }, [productId]);

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
    if (!values.image) {
      errors.image = "Required";
    }
    if (!values.categoryId) {
      errors.categoryId = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      productTittle: product?.productTittle || "",
      productPrice: product?.productPrice || "",
      productDescription: product?.productDescription || "",
      rating: product?.rating || 0,
      count: product?.count || "",
      image: null,
      categoryId: product?.categoryId || "",
    },
    validate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", productId);
      formData.append("productTittle", values.productTittle);
      formData.append("productPrice", values.productPrice);
      formData.append("productDescription", values.productDescription);
      formData.append("rating", values.rating || 0);
      formData.append("count", values.count);
      formData.append("image", values.image);
      formData.append("categoryId", values.categoryId);

      try {
        const response = await axiosInstance.put(`Product/${productId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include authentication header if needed
          },
        });
        if (response.status === 200) {
          setSuccess(true);
          setError("");
          onSave();
          toggle();
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to update product!");
        setSuccess(false);
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size}>
      <Form onSubmit={formik.handleSubmit}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label for="productTittle" sm={2}>
              Product Title
            </Label>
            <Col sm={10}>
              <Input
                id="productTittle"
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
            <Label for="productPrice" sm={2}>
              Product Price
            </Label>
            <Col sm={10}>
              <Input
                id="productPrice"
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
            <Label for="productDescription" sm={2}>
              Product Description
            </Label>
            <Col sm={10}>
              <Input
                id="productDescription"
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
            <Label for="count" sm={2}>
              Product Count
            </Label>
            <Col sm={10}>
              <Input
                id="count"
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
            <Label for="image" sm={2}>
              Image
            </Label>
            <Col sm={10}>
              <Input
                id="image"
                name="image"
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
            <Label for="categoryId" sm={2}>
              Category
            </Label>
            <Col sm={10}>
              <Input
                id="categoryId"
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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Save Changes
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default EditModal;
