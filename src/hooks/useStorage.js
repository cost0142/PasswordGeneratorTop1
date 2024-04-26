import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

const useStorage = () => {
  const getItems = async key => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (error) {
      console.log("Error fetching", error);
      return [];
    }
  };

  const saveItems = async (key, item) => {
    try {
      let passwords = await getItems(key);
      passwords.push(item);

      await AsyncStorage.setItem(key, JSON.stringify(passwords)); // Correct method name from saveItem to setItem
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwords = await getItems(key);
      let filteredPasswords = passwords.filter(password => password !== item);
      await AsyncStorage.setItem(key, JSON.stringify(filteredPasswords)); // Correct method name from saveItem to setItem
      return filteredPasswords;
    } catch (error) {
      console.log("Error removing", error);
    }
  };
  console.log("useStorage hook file is loaded");

  return { getItems, saveItems, removeItem };
};

export default useStorage;
