import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/features/authSlice";
import { useGetProfileQuery } from "../src/services/authApi";
import { RootState } from "../src/store/store";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError } = useGetProfileQuery(token!, {
    skip: !token,
  });

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  if (!token) {
    router.replace("/login");
    return null;
  }

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>Failed to load profile</Text>;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Profile</Text>

      <Text style={{ marginTop: 10 }}>Name: {data?.name}</Text>
      <Text>Email: {data?.email}</Text>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push("/update-profile")}
      >
        Update Profile
      </Button>

      <Button mode="outlined" style={styles.button} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  button: { marginTop: 15 },
});
