// app/(tabs)/home.jsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Resorts", value: "resort" },
  { label: "Apartments", value: "apartment" },
  { label: "Chalets", value: "chalet" },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  async function loadListings(type = "all") {
    setLoading(true);

    let query = supabase
      .from("listings")
      .select(
        `
        id,
        title,
        type,
        location_text,
        price_range_text,
        listing_images (
          image_url
        )
      `
      )
      .eq("status", "active");

    if (type !== "all") query.eq("type", type);

    const { data, error } = await query;

    if (error) {
      console.log("Supabase error:", error);
      setLoading(false);
      return;
    }

    const formatted = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      location_text: item.location_text,
      price_range_text: item.price_range_text,
      images: item.listing_images?.map((img) => img.image_url) ?? [],
    }));

    setListings(formatted);
    setLoading(false);
  }

  useEffect(() => {
    loadListings(activeFilter);
  }, [activeFilter]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "48%",
        marginBottom: 16,
      }}
      onPress={() => router.push(`/listing/${item.id}`)}
    >
      <Image
        source={{
          uri: item.images?.[0] ?? "https://via.placeholder.com/400",
        }}
        style={{
          width: "100%",
          height: 150,
          borderRadius: 12,
          backgroundColor: "#eee",
        }}
      />

      <Text
        style={{
          marginTop: 6,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {item.title}
      </Text>

      <Text style={{ fontSize: 13, color: "#666" }}>
        {item.location_text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* FILTERS */}
      <View style={{ flexDirection: "row", marginBottom: 14 }}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.value}
            onPress={() => setActiveFilter(f.value)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor:
                activeFilter === f.value ? "black" : "#ddd",
            }}
          >
            <Text
              style={{
                color: activeFilter === f.value ? "white" : "black",
                fontWeight: "500",
              }}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTINGS */}
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 40 }}
          color="black"
        />
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => loadListings(activeFilter)}
              colors={["#000"]}
              tintColor="#000"
            />
          }
        />
      )}
    </View>
  );
}
