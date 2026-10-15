import { StyleSheet } from "react-native";

export const Colors = {
  background: "#0F252A",
  border: "#1F5763",
  black: "#000",
  buttonColor: "#21A3C0",
  fuelIcon: "#770D0D",
  maintenanceIcon: "#DE6E1E",
  cleaningIcon: "#006FFF",
  bodyText: "#FFFFFF",
};

export const GlobalStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.bodyText,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.bodyText,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    color: Colors.bodyText,
  },
  backgroundView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    color: Colors.bodyText,
    textAlign: "center",
    fontWeight: "bold",
  },
});
