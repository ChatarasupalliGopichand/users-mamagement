import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import styled from 'styled-components'; // Import styled-components

// Define dynamic styled-components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: ${(props) => (props.darkMode ? '#2c3e50' : '#ecf0f1')};
  color: ${(props) => (props.darkMode ? '#ecf0f1' : '#2c3e50')};
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => (props.darkMode ? '#ecf0f1' : '#2c3e50')};
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#3498db' : '#e74c3c')};
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.primary ? '#2980b9' : '#c0392b')};
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
  border: 1px solid ${(props) => (props.darkMode ? '#34495e' : '#ddd')};
  background-color: ${(props) => (props.darkMode ? '#34495e' : '#ecf0f1')};
  color: ${(props) => (props.darkMode ? '#ecf0f1' : '#2c3e50')};
`;

const Td = styled.td`
  padding: 10px 15px;
  text-align: left;
  border: 1px solid ${(props) => (props.darkMode ? '#34495e' : '#ddd')};
  background-color: ${(props) => (props.darkMode ? '#34495e' : '#fff')};
  color: ${(props) => (props.darkMode ? '#ecf0f1' : '#2c3e50')};
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => (props.darkMode ? '#3d4b5c' : '#f2f2f2')};
  }
  &:hover {
    background-color: ${(props) => (props.darkMode ? '#7f8c8d' : '#ddd')};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const UserList = ({ onEdit, onAdd }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Track dark mode state

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container darkMode={darkMode}>
      <Title darkMode={darkMode}>User Management</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button primary onClick={onAdd}>Add User</Button>
      <Button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </Button>
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
          {users.map((user) => (
            <Row key={user.id} darkMode={darkMode}>
              <Td darkMode={darkMode}>{user.id}</Td>
              <Td darkMode={darkMode}>{user.username || 'N/A'}</Td>
              <Td darkMode={darkMode}>{user.email || 'N/A'}</Td>
              <Td darkMode={darkMode}>{user.company.name || 'N/A'}</Td>
              <Td darkMode={darkMode}>
                <Button primary onClick={() => onEdit(user)}>Edit</Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
