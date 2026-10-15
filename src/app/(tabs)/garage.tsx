import { GlobalStyles } from "@/utils/contants";
import { Text, View } from "react-native";

const STORAGE_KEY = "@user-language";

export default function garage() {
  return (
    <View style={GlobalStyles.backgroundView}>
      <Text>My Garage</Text>
    </View>
  );
}
