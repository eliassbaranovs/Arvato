import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/users/usersSlice";
import { Input, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import PasswordChecklist from "react-password-checklist";

export default function ChangePasswordModal(props) {
  // Props
  const member = props.member;
  const dispatch = useDispatch();
  const [passwordValid, setPasswordValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isError, isSuccess } = useSelector((state) => state.users);
  // Form Data
  const [formData, setFormData] = useState({
    _id: member._id,
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;
  // On Change Event
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // On Submit Event
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error("Passwords do not match");
    } else if (!passwordValid) {
      return toast.error("Password is not valid");
    }
    dispatch(changePassword(formData));
    if (isError) toast.error("Error changing password");
    if (isSuccess) toast.success("Password changed successfully");
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
          Change password
        </Button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full  bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen">
              <div className="relative w-full max-w-lg mx-auto p-6 bg-white rounded-md shadow-lg">
                <div className="mx-auto max-w-lg mt-4">
                  <p className="text-xl font-medium text-gray-800 text-center">
                    Change password for user account ({member.name})?
                  </p>

                  <form
                    onSubmit={onSubmit}
                    className="mt-2 space-y-4 rounded-lg p-2  sm:p-6 lg:p-8"
                  >
                    <div>
                      <div className="relative">
                        <Input
                          label="New password"
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={onChange}
                          className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="text" className="sr-only">
                        Resource name
                      </label>

                      <div className="relative mb-4">
                        <Input
                          label="Confirm password"
                          type="password"
                          name="password2"
                          id="password2"
                          value={password2}
                          onChange={onChange}
                          className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                        />
                      </div>
                      <PasswordChecklist
                        rules={[
                          "minLength",
                          "specialChar",
                          "number",
                          "capital",
                          "match",
                        ]}
                        minLength={5}
                        value={password}
                        valueAgain={password2}
                        onChange={(isValid) => {
                          if (isValid) {
                            setPasswordValid(true);
                          }
                        }}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Change password
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
