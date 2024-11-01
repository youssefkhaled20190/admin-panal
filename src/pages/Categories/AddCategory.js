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
import CategoryTable from "./CategriosTable";

const AddCategory = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  

  const validate = (values) => {
    const errors = {};
    if (!values.categoryName) {
      errors.categoryName = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      categoryName:""
    },
    validate,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('id', 0);
      formData.append('categoryName', values.categoryName);
      
      try {
        const response = await axiosInstance.post("Category",{
            id: 0,
            categoryName: values.categoryName,
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });

        if (response.status === 200) {
          setSuccess(true); // Product added successfully
          setError(""); // Clear any error messages
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to add Category!");
        setSuccess(false); // Show error message
      }
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>Add Category</CardHeader>
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup row>
              <Label for="exampleName" sm={2}>
                Category Name
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleName"
                  name="categoryName"
                  placeholder="Enter the name of the Category"
                  type="text"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <div className="text-danger">{formik.errors.categoryName}</div>
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

      <br></br>
      <br></br>
      <CategoryTable/>
    </div>
  );
};

export default AddCategory;
