import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedUserResource } from "../features/resources/resourceSlice";
import { deleteResource } from "../features/resources/resourceSlice";
import { Button } from "@material-tailwind/react";

function UserResources(props) {
  //Props
  const [res, setRes] = useState([]);
  const member = props.member;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { resources } = useSelector((state) => state.resource);
  // UseEffect
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
    dispatch(getSelectedUserResource(member._id));
  }, [dispatch, member._id, res, navigate, user]);
  // If user not found, redirect to not found!

  return (
    <>
      <div className="overflow-x-auto rounded-lg border w-3/4  border-gray-200 m-8">
        <table className=" divide-y-2 w-full divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Last check-in
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {resources.length > 0 ? (
              <>
                {resources.map((resource) => (
                  <tr key={resource._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/3">
                      {resource.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-3/4">
                      {resource.date ? resource.date : "Not checked-in"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 w-full">
                      <Button
                        variant="text"
                        key={member._id}
                        onClick={() => {
                          setRes(
                            resources.filter((r) => r._id !== resource._id)
                          );

                          dispatch(deleteResource(resource));
                          dispatch(getSelectedUserResource(member._id));
                        }}
                        type="button"
                      >
                        Delete
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

export default UserResources;
