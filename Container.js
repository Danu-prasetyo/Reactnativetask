import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import Calculator from "./src/screens/Calculator";
import TodoList from "./src/screens/TodoList";

const Tab = createBottomTabNavigator();

export default function Container() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Calculator"
        screenOptions={({ route }) => ({
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f08080" },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Calculator") {
              iconName = focused ? "calculator" : "calculator-outline";
            } else if (route.name === "TodoList") {
              iconName = focused ? "clipboard" : "clipboard-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#b22222",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="TodoList" component={TodoList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
