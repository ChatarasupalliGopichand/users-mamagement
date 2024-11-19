import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleAdd = () => {
    setIsEditing(true);
    setCurrentUser(null);
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleSave = (user) => {
    if (currentUser) {
      // Update user
      setUsers(
        users.map((u) =>
          u.id === currentUser.id ? { ...user, id: currentUser.id } : u
        )
      );
    } else {
      // Add new user
      setUsers([...users, { ...user, id: Date.now() }]);
    }
    setIsEditing(false);
  };
  

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="App">
      {isEditing ? (
        <UserForm
          user={currentUser}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
        />
      ) : (
        <UserList users={users} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
