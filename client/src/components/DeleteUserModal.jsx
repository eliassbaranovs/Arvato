import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, reset } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
export default function DeleteUserModal(props) {
  //Props
  const member = props.member;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { isError, isSuccess } = useSelector((state) => state.users);
  // On Submit Event
  const onDelete = () => {
    dispatch(deleteUser(member));
    dispatch(reset());
    if (isError) toast.error("Something went wrong!");
    if (isSuccess) toast.success("User deleted!");
    navigate("/team-members");
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          className="rounded-none"
          variant="text"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Delete user
        </Button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen">
              <div className="relative w-full max-w-lg mx-auto pb-6 bg-white rounded-md shadow-lg">
                <div className="p-4 flex items-center justify-center">
                  <div className="mt-2 text-center  sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800 text-center">
                      Delete user account ({member.name})?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      If account is deleted, data can not be recovered!
                    </p>
                    <div className="items-center gap-2 mt-3 flex justify-center">
                      <Button
                        onClick={() => {
                          setShowModal(false);
                          onDelete();
                        }}
                      >
                        Delete
                      </Button>
                      <Button onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
