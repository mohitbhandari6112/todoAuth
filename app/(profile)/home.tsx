import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Welcome</Text>
      <Text>This is your home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
