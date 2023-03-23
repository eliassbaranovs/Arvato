import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../features/users/usersSlice";
import Spinner from "./Spinner";
import Header from "./Header";

function TeamMembers() {
  //Props
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Teams

  const teams = [
    { value: "GERSD", name: "German Speaking Service Desk" },
    { value: "ENGSD", name: "English Speaking Service Desk" },
    { value: "CSSD", name: "Customer Support Service Desk" },
    { value: "ITHD", name: "German Speaking IT Help Desk" },
  ];
  // useEffect
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
    dispatch(getAllUsers());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Header user={user} />

      <div>
        <Typography variant="h2" className="mx-auto text-center" color="blue">
          Team Members
        </Typography>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Manage user profile and resources.
        </p>
      </div>

      {teams.map((team) => {
        return (
          <div
            id="team-members"
            className="flex flex-col container max-w-2xl mt-10 mb-4 mx-auto items-center justify-center bg-white  rounded-lg shadow "
          >
            <Typography
              variant="h4"
              className="mx-auto text-center"
              color="blue"
            >
              {team.name}
            </Typography>
            {users.map((member) => {
              if (member.team === team.value) {
                return (
                  <ul key={member._id} className=" divide-y w-full">
                    <li>
                      <div className="select-none cursor-pointer hover:bg-gray-50 flex   items-center p-4">
                        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4"></div>
                        <div className="flex-1 pl-1 mr-16">
                          <div className="font-medium ">{member.name}</div>
                          <div className="text-gray-600">{member.email}</div>
                        </div>

                        <Link
                          to="/team-members/SelectedUserResources"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/team-members/user-resources", {
                              state: { member },
                            });
                          }}
                        >
                          <Button>User Profile</Button>
                        </Link>
                      </div>
                    </li>
                  </ul>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </>
  );
}

export default TeamMembers;
