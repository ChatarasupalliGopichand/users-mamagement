import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import styled from "styled-components";

// Define dynamic styled-components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: ${(props) => (props.darkMode ? "#2c3e50" : "#ecf0f1")};
  color: ${(props) => (props.darkMode ? "#ecf0f1" : "#2c3e50")};
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => (props.darkMode ? "#ecf0f1" : "#2c3e50")};
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#3498db" : "#e74c3c")};
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.primary ? "#2980b9" : "#c0392b")};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  border: 1px solid ${(props) => (props.darkMode ? "#34495e" : "#ddd")};
  background-color: ${(props) => (props.darkMode ? "#34495e" : "#ecf0f1")};
  color: ${(props) => (props.darkMode ? "#ecf0f1" : "#2c3e50")};
`;

const Td = styled.td`
  padding: 10px 15px;
  text-align: left;
  border: 1px solid ${(props) => (props.darkMode ? "#34495e" : "#ddd")};
  background-color: ${(props) => (props.darkMode ? "#34495e" : "#fff")};
  color: ${(props) => (props.darkMode ? "#ecf0f1" : "#2c3e50")};
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => (props.darkMode ? "#3d4b5c" : "#f2f2f2")};
  }
  &:hover {
    background-color: ${(props) => (props.darkMode ? "#7f8c8d" : "#ddd")};
  }
`;

const UserList = ({ users, onAdd, onEdit, onDelete }) => {
  const [allUsers, setAllUsers] = useState([]); // State to hold combined users
  const [darkMode, setDarkMode] = useState(false);

  // Fetch users from API and merge with `users` prop
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers(); // Fetch API users
        setAllUsers([...data, ...users]); // Merge fetched users with `users` prop
      } catch (err) {
        console.error("Failed to fetch users", err);
        setAllUsers([...users]); // Fallback to just `users` if API fails
      }
    };
    fetchUsers();
  }, [users]); // Re-run if `users` prop changes

  // Handle delete user
  // Handle delete user
const onDeleteHandler = async (id) => {
  try {
    await deleteUser(id); // Call API to delete the user
    setAllUsers(allUsers.filter((user) => user.id !== id)); // Remove user from state
  } catch (err) {
    console.error("Failed to delete user", err);
    alert("Failed to delete user. Please try again."); // Show an error alert
  }
};


  return (
    <Container darkMode={darkMode}>
      <Title darkMode={darkMode}>User Management</Title>
      <Button primary onClick={onAdd}>
        Add User
      </Button>
      <Button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</Button>
      <Table>
        <thead>
          <Row darkMode={darkMode}>
            <Th darkMode={darkMode}>ID</Th>
            <Th darkMode={darkMode}>User Name</Th>
            <Th darkMode={darkMode}>Email</Th>
            <Th darkMode={darkMode}>Department</Th>
            <Th darkMode={darkMode}>Actions</Th>
          </Row>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <Row key={user.id} darkMode={darkMode}>
              <Td darkMode={darkMode}>{user.id}</Td>
              <Td darkMode={darkMode}>{user.username || "N/A"}</Td>
              <Td darkMode={darkMode}>{user.email || "N/A"}</Td>
              <Td darkMode={darkMode}>{user.department || "N/A"}</Td>
              <Td darkMode={darkMode}>
                <Button primary onClick={() => onEdit(user)}>Edit</Button>
                <Button onClick={() => onDeleteHandler(user.id)}>Delete</Button>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;

