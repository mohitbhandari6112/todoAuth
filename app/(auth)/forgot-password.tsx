import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useLazyGetUsersQuery } from "../src/services/authApi";
import { User } from "../src/types/user";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [getUsers, { isLoading }] = useLazyGetUsersQuery();

  const handleForgotPassword = async () => {
    setMessage("");

    if (!email) {
      setMessage("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Enter valid email");
      return;
    }

    try {
      const users: User[] = await getUsers().unwrap();

      const existingUser = users.find((user) => user.email === email);

      if (!existingUser) {
        setMessage("Email not found");
        return;
      }

      setMessage("Password reset link sent (mock)");
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Forgot Password</Text>

      {message ? (
        <Text style={{ marginVertical: 8, color: "red" }}>{message}</Text>
      ) : null}

      <TextInput
        label="Enter your email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleForgotPassword}
        loading={isLoading}
        style={styles.button}
      >
        Send Reset Link
      </Button>

      <Button onPress={() => router.push("/login")}>Back to Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});
