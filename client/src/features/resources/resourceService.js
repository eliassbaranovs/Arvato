import axios from "axios";

const API_URL = "/api/resources/";

// Get logged in user resources
const getResources = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get selected user resources
const getSelectedUserResource = async (memberId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + memberId, config);
  return response.data;
};

//Create new user resource
const createUserResource = async (resourceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, resourceData, config);
  return response.data;
};

// Create a resource to team
const createToTeam = async (resourceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "addtoteam",
    resourceData,
    config
  );
  return response.data;
};

// Update resource check-in status
const updateResourceCheckInStatus = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + data.resourceId, data, config);
  return response.data;
};
// Delete resource
const deleteResource = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + data._id, config);
  return response.data;
};

const resourceService = {
  getResources,
  createUserResource,
  createToTeam,
  updateResourceCheckInStatus,
  getSelectedUserResource,
  deleteResource,
};

export default resourceService;
