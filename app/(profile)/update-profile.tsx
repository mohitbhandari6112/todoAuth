import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../src/services/authApi";
import { RootState } from "../src/store/store";

export default function UpdateProfile() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading: isFetching } = useGetProfileQuery(token!, {
    skip: !token,
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleUpdate = async () => {
    setError("");

    if (!token) return;

    if (!name || !email) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    try {
      await updateProfile({
        id: token,
        data: { name, email },
      }).unwrap();

      router.back();
    } catch {
      setError("Update failed");
    }
  };

  if (!token) {
    router.replace("/login");
    return null;
  }

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Update Profile</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <Button
        mode="contained"
        onPress={handleUpdate}
        loading={isLoading}
        style={styles.button}
      >
        Save Changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: { marginVertical: 8 },
  button: { marginTop: 16 },
  error: { color: "red", marginBottom: 10 },
});
