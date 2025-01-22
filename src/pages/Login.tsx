import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0002",
      password: "admin123",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastID = toast.loading("logging in");
    // console.log("t", toastID);
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      console.log("res", res);
      dispatch(setUser({ user, token: res.data.accessToken }));
      if (res?.success) {
        toast.success("Loged in succesfully", { id: toastID, duration: 2000 });
        navigate(`/${user?.role}/dashboard`);
      }
    } catch (err) {
      toast.error("something went wrong!", { id: toastID, duration: 2000 });
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Log in</Button>
    </form>
  );
};

export default Login;
