import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setCredentials } from "../src/features/authSlice";
import { useLazyGetUsersQuery } from "../src/services/authApi";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [getUsers, { isLoading }] = useLazyGetUsersQuery();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter valid email");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }

    try {
      const users = await getUsers().unwrap();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!foundUser) {
        setError("Invalid credentials");
        return;
      }

      dispatch(
        setCredentials({
          user: foundUser,
          token: foundUser.id,
        }),
      );

      router.replace("/");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

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
        onPress={handleLogin}
        loading={isLoading}
        style={styles.button}
      >
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/forgot-password")}
        style={styles.forgotpw}
      >
        Forgot Password?
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/signup")}
        style={styles.link}
      >
        Don’t have an account? Sign Up
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
  link: {
    marginTop: 10,
    alignSelf: "center",
  },
  forgotpw: {
    marginTop: 4,
    alignSelf: "flex-end",
  },
});
