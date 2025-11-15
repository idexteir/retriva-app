// app/(tabs)/home.jsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Retriva</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/auth/login")}
      >
        <Text style={styles.btnText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 25,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
});
