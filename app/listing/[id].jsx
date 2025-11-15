import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function ListingDetails() {
  const { id } = useLocalSearchParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fullscreen modal state
  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  async function loadDetails() {
    const { data, error } = await supabase
      .from("listings")
      .select(`
        id,
        title,
        description,
        type,
        location_text,
        price_range_text,
        listing_images (
          image_url,
          order_index
        )
      `)
      .eq("id", id)
      .single();

    if (error) console.log(error);
    setListing(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDetails();
  }, []);

  if (loading || !listing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const mainImage =
    listing.listing_images?.[0]?.image_url ??
    "https://via.placeholder.com/500";

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        {/* IMAGE THUMBNAIL */}
        <TouchableOpacity onPress={() => setFullscreenVisible(true)}>
          <Image
            source={{ uri: mainImage }}
            style={{
              width: "100%",
              height: 230,
              resizeMode: "cover",
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          />
        </TouchableOpacity>

        {/* CONTENT */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {listing.title}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 16, color: "#666" }}>
            {listing.location_text}
          </Text>

          <Text style={{ marginTop: 16, fontSize: 15, lineHeight: 22 }}>
            {listing.description}
          </Text>
        </View>
      </ScrollView>

      {/* FULLSCREEN MODAL */}
      <Modal
        visible={fullscreenVisible}
        transparent={true}
        animationType="fade"
      >
        <Pressable
          onPress={() => setFullscreenVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.95)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: mainImage }}
            style={{
              width: "95%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </Pressable>
      </Modal>
    </>
  );
}
