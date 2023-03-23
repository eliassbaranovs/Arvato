import axios from "axios";

const API_URL = "/api/users/";

// Get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Change user password
const changePassword = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + `changepass/${data._id}`,
    data,
    config
  );
  return response.data;
};

// Delete user
const deleteUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `${data._id}`, config);
  return response.data;
};

//Export user data
const exportUserData = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `export/${id}`, config);
  return response.data;
};

const usersService = {
  getAllUsers,
  deleteUser,
  changePassword,
  exportUserData,
};

export default usersService;
