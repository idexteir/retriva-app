// app/(tabs)/_layout.jsx
import { Tabs } from "expo-router";
import { Image } from "react-native";

function TabIcon({ name }) {
  return (
    <Image
      source={name}
      style={{
        width: 32,
        height: 32,
        resizeMode: "contain",
        tintColor: "#000",
      }}
    />
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 75,               // 👈 bigger tab bar
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <TabIcon name={require("../../assets/icons/home.png")} />
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: () => (
            <TabIcon name={require("../../assets/icons/activity.png")} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: () => (
            <TabIcon name={require("../../assets/icons/favorite.png")} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => (
            <TabIcon name={require("../../assets/icons/profile.png")} />
          ),
        }}
      />
    </Tabs>
  );
}
