import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "./src/store/store";

export default function Index() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
