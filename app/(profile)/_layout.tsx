import { Redirect, Stack, useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../src/store/store";

export default function ProtectedLayout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerRight: () => (
          <IconButton
            icon="account-circle"
            size={26}
            onPress={() => router.push("/profile")}
          />
        ),
      }}
    />
  );
}
