// TabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./pages/Home/Index";
import { Passwords } from "./pages/Passwords/Index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "account-lock" : "account-lock-outline";
          } else if (route.name === "Passwords") {
            iconName = focused ? "lock" : "safe-square-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={33} color={color} />
          );
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Passwords"
        component={Passwords}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}
