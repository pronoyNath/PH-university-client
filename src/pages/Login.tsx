import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
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
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastID = toast.loading("logging in");
    try {
      const res = await login({
        id: data?.userId,
        password: data?.password,
      }).unwrap();
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
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput label={"Id: "} name={"userId"} type={"text"} />
        <PHInput label="password: " name={"password"} type={"text"} />
        <Button htmlType="submit">Log in</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
