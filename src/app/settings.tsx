import { GlobalStyles } from "@/utils/contants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Application from "expo-application";
import * as FileSystem from "expo-file-system/legacy";
import * as LocalAuthentication from "expo-local-authentication";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function settings() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // States
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [biometryEnabled, setBiometryEnabled] = useState(false);
  const [appVersion, setAppVersion] = useState("1.0.0");

  // App version
  useEffect(() => {
    if (Application.nativeApplicationVersion) {
      setAppVersion(Application.nativeApplicationVersion);
    }
  }, []);

  // Notifications
  const handleToggleNotifications = async (value: boolean) => {
    if (value) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "No se pudieron habilitar las notificaciones.",
        );
        setNotificationsEnabled(false);
        return;
      }
      setNotificationsEnabled(true);
    }
    setNotificationsEnabled(value);
  };

  // Security
  const handleToggleBiometry = async (value: boolean) => {
    if (value) {
      const hasHardawe = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardawe) {
        Alert.alert(
          "No compatible",
          "Este dispositivo no soporta autenticación biométrica.",
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          "Sin configurar",
          "No hay huellas o rostros registrados en el dispositivo.",
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentícate para activar la seguridad",
      });
      if (result.success) {
        setBiometryEnabled(true);
      }
    } else {
      setBiometryEnabled(false);
    }
  };

  // Data
  const handleExportData = async () => {
    try {
      const dummyData = JSON.stringify(
        { app: "GearBox", backupDate: new Date(), data: [] },
        null,
        2,
      );
      const fileUri = FileSystem.documentDirectory + "backup.json";
      await FileSystem.writeAsStringAsync(fileUri, dummyData);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("Error", "No se pudo exportar el respaldo de datos.");
    }
  };

  const handleClearCache = async () => {
    Alert.alert(
      "Limpiar caché",
      "¿Estás seguro de que deseas borrar los archivos temporales?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: () => Alert.alert("Éxito", "Caché limpiada correctamente."),
        },
      ],
    );
  };

  // Language
  const toggleLanguage = () => {
    const nextLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nextLang);
  };

  return (
    <ScrollView style={[GlobalStyles.backgroundView, GlobalStyles.container]}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={GlobalStyles.title}>{t("settings")}</Text>
      </View>

      {/* PERSONAL */}
      <View style={[styles.settingContainer, { gap: 14 }]}>
        <Text style={GlobalStyles.subtitle}>{t("personal-information")}</Text>

        <View style={[styles.itemLabel, { paddingBottom: 0 }]}>
          <MaterialIcons name="person" size={24} color={"#fff"} />
          <TextInput placeholder={t("your-name")} style={{ paddingTop: 0 }} />
        </View>

        <View style={styles.itemLabel}>
          <MaterialIcons name="email" size={24} color={"#fff"} />
          <TextInput placeholder={t("your-email")} style={{ paddingTop: 0 }} />
        </View>

        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.textButton}>{t("save-changes")}</Text>
        </TouchableOpacity>
      </View>

      {/* PREFERENCES */}

      {/* Moneda Principal */}

      {/* Unidades de Distancia:  */}

      {/* Language */}
      <View style={styles.settingContainer}>
        <Text style={GlobalStyles.subtitle}>{t("language")}</Text>
        <TouchableOpacity
          style={[
            styles.itemContainer,
            { borderBottomWidth: 2, borderColor: "#fff" },
          ]}
          onPress={toggleLanguage}
        >
          <View style={styles.itemLabel}>
            <MaterialIcons name="language" size={24} color={"#fff"} />
            <Text style={GlobalStyles.text}>Idioma / Language</Text>
          </View>
          <Text
            style={[GlobalStyles.subtitle, { textDecorationLine: "underline" }]}
          >
            {i18n.language.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.settingContainer}>
        <Text style={GlobalStyles.subtitle}>{t("notifications")}</Text>

        <View style={styles.itemContainer}>
          <View style={styles.itemLabel}>
            <MaterialIcons name="notifications" size={24} color={"#fff"} />
            <Text style={GlobalStyles.text}>{t("activate-notifications")}</Text>
          </View>

          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
          />
        </View>
      </View>

      {/* SECURITY AND PRIVACY */}
      <View style={styles.settingContainer}>
        <Text style={GlobalStyles.subtitle}>{t("security-and-privacy")}</Text>

        <View style={styles.itemContainer}>
          <View style={styles.itemLabel}>
            <MaterialIcons name="fingerprint" size={24} color={"#fff"} />
            <Text style={GlobalStyles.text}>{t("biometric-lock")}</Text>
          </View>

          <Switch
            value={biometryEnabled}
            onValueChange={handleToggleBiometry}
          />
        </View>
      </View>

      {/* DATA */}
      <View style={[styles.settingContainer, { gap: 14 }]}>
        <Text style={GlobalStyles.subtitle}>{t("data-and-storage")}</Text>
        <TouchableOpacity
          style={[
            styles.itemContainer,
            { borderBottomWidth: 2, borderColor: "#fff" },
          ]}
          onPress={handleExportData}
        >
          <View style={styles.itemLabel}>
            <MaterialIcons name="cloud-upload" size={24} color={"#fff"} />
            <Text style={GlobalStyles.text}>{t("export-backup-data")}</Text>
          </View>
          <MaterialIcons name="cloud-upload" size={24} color={"#fff"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.itemContainer,
            { borderBottomWidth: 2, borderColor: "#fff" },
          ]}
          onPress={handleClearCache}
        >
          <View style={styles.itemLabel}>
            <MaterialIcons name="delete" size={24} color={"#d13434"} />
            <Text style={[GlobalStyles.text, { color: "#d13434" }]}>
              {t("clear-cache")}
            </Text>
          </View>
          <MaterialIcons name="delete" size={24} color={"#d13434"} />
        </TouchableOpacity>
      </View>

      {/* APP INFO */}
      <View style={styles.settingContainer}>
        <Text style={GlobalStyles.subtitle}>{t("app-information")}</Text>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemLabel}>
            <MaterialIcons name="info-outline" size={24} color={"#fff"} />
            <Text style={GlobalStyles.text}>{t("version")}</Text>
          </View>
          <Text style={[GlobalStyles.subtitle]}>{appVersion}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    marginTop: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLabel: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 5,
  },
});
