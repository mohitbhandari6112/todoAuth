import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import {
  useLazyGetUsersQuery,
  useSignupMutation,
} from "../src/services/authApi";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [signup] = useSignupMutation();
  const [getUsers, { isLoading }] = useLazyGetUsersQuery();

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter valid email");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }

    try {
      const users = await getUsers().unwrap();

      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        setError("Email already registered");
        return;
      }
      await signup({ name, email, password }).unwrap();

      router.replace("/login");
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Sign Up</Text>

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
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSignup}
        loading={isLoading}
        style={styles.button}
      >
        Sign Up
      </Button>
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
