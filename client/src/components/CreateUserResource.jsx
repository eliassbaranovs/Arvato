import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUsers, reset } from "../features/users/usersSlice";
import { createUserResource } from "../features/resources/resourceSlice";
import {
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Spinner from "./Spinner";

import Header from "./Header";
function CreateUserResource() {
  //Props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    text: "",
    selectedUser: "",
  });
  const { text, selectedUser } = formData;
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, users } = useSelector(
    (state) => state.users
  );
  const { isLoadingResource } = useSelector((state) => state.resource);

  //useEffect
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(getAllUsers());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, user]);

  //On Change event
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //On Submit event
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      text,
      selectedUser,
    };
    if (data.selectedUser === "" || data.text === "")
      return toast.error("Please fill in all fields");
    dispatch(createUserResource(data));
    toast.success("Resource created successfully");
    dispatch(reset());
    setFormData({
      text: "",
    });
  };
  // If user not found, redirect to not found!
  if ((user && user.role !== "admin") || !user) {
    navigate("/");
  }
  if (isLoading || isLoadingResource) return <Spinner />;
  return (
    <>
      {user && <Header user={user} />}
      <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <Typography variant="h2" className="mx-auto text-center" color="blue">
            Create User Resource
          </Typography>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Create a resource for specified user.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 mb-0 space-y-4  p-4  sm:p-6 lg:p-8"
          >
            <div>
              <label htmlFor="text" className="sr-only">
                Resource name
              </label>

              <div className="relative">
                <Input
                  label="Resource"
                  type="text"
                  name="text"
                  id="text"
                  value={text}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="relative"></div>
            <div>
              <label htmlFor="selectedUser" className="sr-only">
                Select user
              </label>

              <div className="relative">
                {/* <select
                  defaultValue={"DEFAULT"}
                  name="selectedUser"
                  id="selectedUser"
                  onChange={onChange}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                >
                  <option value="DEFAULT" disabled>
                    --Select User--
                  </option>
                  {users &&
                    users.map((user) => {
                      return (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      );
                    })}
                </select> */}
                <Select
                  value={selectedUser}
                  label="Select a user"
                  id="selectedUser"
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      selectedUser: e,
                    }));
                  }}
                >
                  {users &&
                    users.map((user) => {
                      return (
                        <Option key={user._id} value={user._id}>
                          {user.name}
                        </Option>
                      );
                    })}
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create resource
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUserResource;
