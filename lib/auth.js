import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { supabase } from "./supabase";
import { debugLog } from "./debug";

WebBrowser.maybeCompleteAuthSession();

export async function loginWithGoogle() {
  try {
    const redirectUri = Google.makeRedirectUri({
      scheme: "retriva",
    });

    const auth = Google.useAuthRequest({
      expoClientId: "YOUR_GOOGLE_CLIENT_ID",
      iosClientId: "YOUR_GOOGLE_IOS_ID",
      androidClientId: "YOUR_GOOGLE_ANDROID_ID",
      redirectUri,
    });

    return auth;
  } catch (error) {
    debugLog("Google login error", error);
  }
}
