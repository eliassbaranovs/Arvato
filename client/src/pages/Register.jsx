import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordChecklist from "react-password-checklist";

import { register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Logo from "../assets/Logo_Arvato_Systems_Original_RGB.png";
import { Input, Button, Select, Option } from "@material-tailwind/react";

function Register() {
  const [passwordValid, setPasswordValid] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    team: "",
  });
  const { name, email, password, password2, team } = formData;
  // @@@@@@@@@@@@
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful");
      navigate("/");
    } else if (isError) {
      toast.error(message);
    }
  }, [isError, isSuccess, message, navigate]);
  //Options
  const options = [
    { value: "GERSD", label: "German Speaking Service Desk" },
    { value: "ENGSD", label: "English Speaking Service Desk" },
    { value: "CSSD", label: "Customer Support Service Desk" },
    { value: "ITHD", label: "German Speaking IT Help Desk" },
  ];

  //On Change
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //On Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!passwordValid) {
      return toast.error("Password is not valid");
    } else if (password !== password2) {
      return toast.error("Passwords do not match");
    } else if (passwordValid) {
      const userData = {
        name,
        email,
        password,
        team,
      };
      dispatch(register(userData));
    }
  };

  //Loading spinner
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Access Check App
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Simple application to track your access to different resources.
            </p>
          </div>
        </section>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <img src={Logo} alt="Company logo" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Access Check App
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Simple application to track your last logins in different
                resources.
              </p>
            </div>
            {windowSize.innerWidth > 960 ? (
              <img className="mx-auto w-80" src={Logo} alt="Company logo" />
            ) : (
              <></>
            )}
            <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <Input
                  label="Full Name"
                  onChange={onChange}
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                />
              </div>

              <div className="col-span-6">
                <Input
                  label="Email address"
                  onChange={onChange}
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                />
              </div>
              <div className="col-span-6">
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

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Password"
                  onChange={onChange}
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Confirm Password"
                  onChange={onChange}
                  required
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                />
              </div>
              <div className="col-span-6">
                <PasswordChecklist
                  className=""
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

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button size="lg" type="submit">
                  Create an account
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account? &nbsp;
                  <a
                    href="/login"
                    className="text-gray-700 font-bold underline"
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Register;
