import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Logo from "../assets/Logo_Arvato_Systems_Original_RGB.png";
import { Button, Input } from "@material-tailwind/react";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //For logo
  const [windowSize, setWindowSize] = useState(getWindowSize());
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  //UseEffect
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //On Change event
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // On Submit event

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

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
                <img src={Logo} alt="" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Access-Check
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                A simple access check app to never get your account locked out
                again.
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
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className="col-span-6">
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button size="lg" type="submit">
                  Login
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don`t have an account? &nbsp;
                  <a
                    href="/register"
                    className="text-gray-700 font-bold underline"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Login;
