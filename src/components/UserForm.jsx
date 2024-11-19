import React, { useState } from "react";
import { addUser, editUser } from "../services/api";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  background-color: ${(props) => (props.primary ? "#3498db" : "#e74c3c")};
  color: white;
`;

const UserForm = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState(
    user || { username: "", email: "", department: "" }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      if (user && user.id) {
        await editUser(user.id, formData); // Pass `id` and `formData` correctly
        onSave({ ...formData, id: user.id });
      } else {
        const response = await addUser(formData); // Ensure the API responds as expected
        onSave(response.data || formData); // Use response data if provided
      }
    } catch (error) {
      console.error("Error saving user:", error.response || error.message);
      alert(`Failed to save user. ${error.response?.data?.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Label>User Name</Label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Label>Department</Label>
        <Input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <Button primary type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </form>
    </FormContainer>
  );
};

export default UserForm;
