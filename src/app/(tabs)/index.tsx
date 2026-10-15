import { GlobalStyles } from "@/utils/contants";
import { Image, StyleSheet, View } from "react-native";

export default function index() {
  return (
    <View style={GlobalStyles.backgroundView}>
      <View style={styles.vehicleContainer}>
        <Image
          source={require("@/assets/images/car.png")}
          style={styles.vehicleImage}
        />
        <Image
          source={require("@/assets/images/motorcycle.png")}
          style={styles.vehicleImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vehicleContainer: {
    flexDirection: "row",
    marginLeft: "15%",
    marginTop: 30,
    gap: 30,
  },

  vehicleImage: {
    width: 250,
    height: 250,
  },
});
