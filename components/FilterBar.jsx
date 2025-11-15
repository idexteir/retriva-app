import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const filters = ["All", "Apartment", "Villa", "Chalet"];

export default function FilterBar({ selected, onChange }) {
  return (
    <View style={styles.container}>
      {filters.map((f) => (
        <TouchableOpacity
          key={f}
          onPress={() => onChange(f)}
          style={[styles.btn, selected === f && styles.active]}
        >
          <Text style={selected === f ? styles.activeText : styles.text}>
            {f}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 10, paddingHorizontal: 16 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#eaeaea",
    borderRadius: 20,
    marginRight: 10,
  },
  active: { backgroundColor: "#246BFD" },
  text: { color: "#333" },
  activeText: { color: "#fff" },
});
