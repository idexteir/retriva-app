// app/_layout.jsx
import { Stack } from "expo-router";
import { View, Image } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ffffff",
          height: 110, // BIGGER HEADER
        },
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
              paddingLeft: 16,
            }}
          >
            <Image
              source={require("../assets/icons/logo.png")}
              style={{
                width: 180,      // bigger width
                height: 70,      // bigger height
                resizeMode: "contain",
              }}
            />
          </View>
        ),
        headerTitleAlign: "center",
      }}
    />
  );
}
