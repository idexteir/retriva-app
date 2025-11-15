// components/TabBarIcon.jsx
import { Ionicons } from "@expo/vector-icons";

export default function TabBarIcon({ name, color, size = 26 }) {
  return <Ionicons name={name} size={size} color={color} />;
}
