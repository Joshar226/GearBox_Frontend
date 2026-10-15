import CustomHeader from "@/components/CustomHeader";
import { Colors } from "@/utils/contants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  function TabIcon({
    name,
    focused,
    color,
  }: {
    name: keyof typeof MaterialIcons.glyphMap;
    focused: boolean;
    color: string;
  }) {
    return (
      <View
        style={[styles.iconContainer, focused && styles.activeIconContainer]}
      >
        <MaterialIcons name={name} size={32} color={color} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 2,
        },
        header: () => <CustomHeader />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={"home"} focused={focused} color={color.toString()} />
          ),
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: "Garage",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={"directions-car"}
              focused={focused}
              color={color.toString()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={"history"}
              focused={focused}
              color={color.toString()}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 52,
    height: 33,
    borderRadius: 16, // Hace los bordes redondeados (píldora)
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconContainer: {
    backgroundColor: "#10515f",
  },
});
