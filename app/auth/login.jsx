import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { i18n } from "../../lib/i18n";
import { debugLog } from "../../lib/debug";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "741237315698-mnh0gfgic1ndj3h0glpcblvdpd99gagj.apps.googleusercontent.com",
    androidClientId: "741237315698-470ge79p6q26kkgjjonsulmhucm8fd14.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      supabase.auth
        .signInWithIdToken({
          provider: "google",
          token: authentication.idToken,
        })
        .then(async ({ data, error }) => {
          if (error) {
            debugLog("Supabase Google Login Error", error);
            return;
          }

          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

          if (profile?.role === "admin" || profile?.role === "manager") {
            router.replace("/admin/dashboard");
          } else {
            router.replace("/(tabs)/home");
          }
        });
    }
  }, [response]);

  return (
    <LinearGradient
      colors={["#141E30", "#243B55"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.imgur.com/Wk9H3ZL.png" }}
          style={styles.logo}
        />

        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>
            {i18n.t("login_google")}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    padding: 30,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    gap: 20,
  },
  logo: { width: 120, height: 120, borderRadius: 20 },
  btn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
  },
  btnText: { textAlign: "center", fontSize: 16, fontWeight: "600" },
});
