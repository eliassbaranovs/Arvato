import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserResources from "./UserResources";
import Header from "./Header";
import { useEffect } from "react";
import {
  getSelectedUserResource,
  reset,
} from "../features/resources/resourceSlice";
import Spinner from "./Spinner";

function SelectedUserResources() {
  //Props
  const { user } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { member } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memberId = member._id;
  const { isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
    if (user) {
      dispatch(getSelectedUserResource(memberId));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user, memberId]);

  //Spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header user={user} />
      <div className="flex flex-col content-center items-center">
        <UserInfo member={member} />
        <UserResources member={member} />
      </div>
    </>
  );
}

export default SelectedUserResources;
