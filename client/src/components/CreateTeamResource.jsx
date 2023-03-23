import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createToTeam, reset } from "../features/resources/resourceSlice";
import Spinner from "./Spinner";
import {
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Header from "./Header";

function CreateUserResource() {
  //Props
  const [formData, setFormData] = useState({
    text: "",
    team: "",
  });
  const { text, team } = formData;
  const { user } = useSelector((state) => state.auth);
  const { isLoadingResource } = useSelector((state) => state.resource);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Options
  const options = [
    { value: "GERSD", label: "German Speaking Service Desk" },
    { value: "ENGSD", label: "English Speaking Service Desk" },
    { value: "CSSD", label: "Customer Support Service Desk" },
    { value: "ITHD", label: "German Speaking IT Help Desk" },
  ];
  // useEffect
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  });
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
    if (team === "") return toast.error("Please fill all fields");
    const data = {
      text,
      team,
    };
    if (data.team === "" || data.text === "")
      return toast.error("Please fill in all fields");
    dispatch(createToTeam(data));
    dispatch(reset());
    toast.success("Resource created successfully");
    setFormData({
      text: "",
      team: "",
    });
  };

  if (isLoadingResource) return <Spinner />;
  return (
    <>
      {user && <Header user={user} />}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <Typography variant="h2" className="mx-auto text-center" color="blue">
            Create
          </Typography>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Create a resource for selected team.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 mb-0 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
          >
            <div>
              <div className="relative">
                {/* <input
                  type="text"
                  name="text"
                  id="text"
                  value={text}
                  onChange={onChange}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter resource name"
                /> */}
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

            <div>
              <div className="relative">
                {/* <select
                  defaultValue={"DEFAULT"}
                  name="team"
                  id="team"
                  onChange={onChange}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                >
                  <option value="DEFAULT" disabled>
                    --Select a team--
                  </option>
                  <option name="team" value="ENGSD">
                    ENGSD
                  </option>
                  <option name="team" value="GERSD">
                    GERSD
                  </option>
                </select> */}
                <Select
                  value={team}
                  label="Select a team"
                  id="team"
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      team: e,
                    }));
                  }}
                >
                  {options.map((option) => {
                    return (
                      <Option
                        name={option.label}
                        key={option.label}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>

            <Button type="submit" ripple={true} className="w-full">
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUserResource;
