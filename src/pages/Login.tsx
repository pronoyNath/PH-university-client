import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0002",
  //     password: "admin123",
  //   },
  // });
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastID = toast.loading("logging in");
    // try {
    //   const res = await login(data).unwrap();
    //   const user = verifyToken(res?.data?.accessToken) as TUser;
    //   console.log("res", res);
    //   dispatch(setUser({ user, token: res.data.accessToken }));
    //   if (res?.success) {
    //     toast.success("Loged in succesfully", { id: toastID, duration: 2000 });
    //     navigate(`/${user?.role}/dashboard`);
    //   }
    // } catch (err) {
    //   toast.error("something went wrong!", { id: toastID, duration: 2000 });
    //   console.log(err);
    // }
  };
  return (
    <PHForm onSubmit={onSubmit}>
      <div>
        <PHInput label={"Id: "} name={"userId"} type={"text"} />
      </div>
      <div>
        <PHInput label="password" name={"password"} type={"text"} />
      </div>
      <Button htmlType="submit">Log in</Button>
    </PHForm>
  );
};

export default Login;
