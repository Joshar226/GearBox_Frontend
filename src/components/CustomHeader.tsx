import { Colors } from "@/utils/contants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader() {
  const router = useRouter();
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.logoText}>GearBox</Text>
      </View>

      <TouchableOpacity onPress={() => router.push("/settings")}>
        <MaterialIcons name="settings" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    borderBottomWidth: 4,
    borderBottomColor: Colors.border,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.bodyText,
  },
});
