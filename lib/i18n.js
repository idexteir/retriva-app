import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "../localization/en.json";
import ar from "../localization/ar.json";

export const i18n = new I18n({ en, ar });
i18n.enableFallback = true;

const locale = Localization.locale || "en";
i18n.locale = locale.startsWith("ar") ? "ar" : "en";
