import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/authSlice";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  // const handleChanges = (e) => {
  //   setLoginValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  //axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  const handleEye = () => {
    setEyeOpen((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="w-1/2 h-screen flex flex-col p-20 bg-slate-100">
        <h1 className="text-xl text-slate-900 font-semibold">Aoura Group</h1>
        <div className="w-full flex justify-center">
          <div className="w-full flex flex-col mt-[120px] max-w-[550px]">
            <div className="w-full flex flex-col mb-10">
              <h1 className="text-3xl font-semibold mb-4">Login</h1>
              <p className="text-slate-900 text-base">
                Welcome Back! Please enter your details
              </p>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} method="post">
              {isError && <p className="text-red-600 text-xs">{message}</p>}
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                  placeholder="Username"
                  name="username"
                  id=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="flex items-center">
                  <input
                    type={eyeOpen ? "text" : "password"}
                    className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                    placeholder="Password"
                    name="password"
                    id=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p
                    className="ml-[-20px] cursor-pointer text-xl"
                    onClick={handleEye}
                  >
                    {!eyeOpen ? <IoEye /> : <IoEyeOff />}
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 bg-slate-900 rounded-md p-4 text-center flex items-center justify-center"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative w-1/2 h-screen flex justify-center items-center flex-col bg-sky-500">
        <h1 className="text-9xl text-white font-bold">.Aoura:</h1>
      </div>
    </div>
  );
}

export default LoginPage;
