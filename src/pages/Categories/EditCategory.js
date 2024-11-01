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

function EditCategoryModal({ isOpen, CatId, toggle, onSave, size = "lg" }) {
  const [category, setCategory] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (CatId) {
      const fetchCategory = async () => {
        try {
          const response = await axiosInstance.get(`Category/${CatId}`);
          setCategory(response.data);
        } catch (error) {
          console.error("Error fetching Category:", error.response ? error.response.data : error.message);
        }
      };
      fetchCategory();
    }
  }, [CatId]);

  const validate = (values) => {
    const errors = {};
    if (!values.categoryName) {
      errors.categoryName = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      categoryName: category?.categoryName || "",
    },
    validate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.put(`Category/${CatId}`, {id:CatId , categoryName:values.categoryName}, {
          headers: {
            "Content-Type": "application/json",
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
        setError(err.response?.data?.message || "Failed to update Category!");
        setSuccess(false);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size}>
      <Form onSubmit={formik.handleSubmit}>
        <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label for="categoryName" sm={2}>
              Category Name
            </Label>
            <Col sm={10}>
              <Input
                id="categoryName"
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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} size="sm">
            Close
          </Button>
          <Button color="primary" type="submit" size="sm">
            Save Changes
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default EditCategoryModal;
