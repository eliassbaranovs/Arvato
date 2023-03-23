import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

import {
  getResources,
  updateResourceCheckInStatus,
} from "../features/resources/resourceSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoadingResource, isError, message, resources, actionDone } =
    useSelector((state) => state.resource);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch(getResources());
    }
  }, [dispatch, isError, message, user, navigate, actionDone]);

  //Check-in resource
  const checkIn = (e) => {
    e.preventDefault();
    const data = {
      date: format(new Date(), "dd/MM/yyyy"),
      resourceId: e.target.value,
    };
    dispatch(updateResourceCheckInStatus(data));
    if (actionDone) {
      dispatch(getResources());
    }
  };

  //Spinner
  if (isLoadingResource) {
    return <Spinner />;
  }
  return (
    <>
      {user && <Header user={user} />}
      <div className="overflow-x-auto rounded-lg border max-w-3/4  border-gray-200 m-8 ">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Created at
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Last check-in
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {resources.length > 0 ? (
              <>
                {resources.map((resource) => (
                  <tr key={resource._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {resource.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {resource.createdAt}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {resource.date ? resource.date : "Not checked-in"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <Button
                        variant="text"
                        onClick={checkIn}
                        value={resource._id}
                      >
                        Check-in
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  No resources found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
