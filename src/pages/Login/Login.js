import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Login({ route, navigation }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [passwordExists, setPasswordExists] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showResetButton, setShowResetButton] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  useEffect(() => {
    const checkPasswordSet = async () => {
      const storedPassword = await AsyncStorage.getItem("userPassword");
      setPasswordExists(!!storedPassword);
      setCreateMode(!storedPassword);
    };

    checkPasswordSet();
  }, []);

  console.log(passwordVisibility);

  useFocusEffect(
    React.useCallback(() => {
      // Verifica se o parâmetro resetPassword foi passado e é true
      if (route.params?.resetPassword) {
        setPassword("");
        setPasswordVisibility(true);
      }
      // Adiciona outras lógicas de inicialização aqui se necessário
    }, [route.params?.resetPassword]) // Dependências para reagir às mudanças nos parâmetros
  );

  function handleLogin() {
    AsyncStorage.getItem("userPassword").then((storedPassword) => {
      if (password === storedPassword) {
        navigation.navigate("Main", { screen: "Home" });
      } else {
        updateAttemptCount();
        alert("Incorrect password. Try again.");
      }
    });
  }

  function handleCreatePassword() {
    if (newPassword.length <= 16) {
      AsyncStorage.setItem("userPassword", newPassword).then(() => {
        setCreateMode(false);
        setIsChangingPassword(false);
        setPassword(newPassword);
        alert("Password created/changed successfully. Use it to log in.");
      });
    } else {
      alert("The password must have a maximum of 16 characters.");
    }
  }

  function cancelChange() {
    setCreateMode(false);
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
  }

  function confirmCancelChange() {
    if (newPassword.length > 0) {
      Alert.alert(
        "Cancel Password Change",
        "Are you sure you want to cancel the password change? All changes will be lost.",
        [
          { text: "Continue Change", style: "cancel" },
          { text: "Cancel Change", onPress: () => cancelChange() }
        ]
      );
    } else {
      cancelChange();
    }
  }

  function initiateChangePassword() {
    if (attemptCount < 3) {
      AsyncStorage.getItem("userPassword").then((storedPassword) => {
        if (currentPassword === storedPassword) {
          setCreateMode(true);
        } else {
          updateAttemptCount();
          alert("Incorrect current password.");
        }
      });
    }
  }

  function updateAttemptCount() {
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);
    if (newAttemptCount >= 3) {
      setShowResetButton(true);
    }
  }

  function resetAppData() {
    Alert.alert(
      "Reset the App",
      "Are you sure you want to delete all data from the App?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () =>
            AsyncStorage.clear().then(() => {
              setPassword("");
              setNewPassword("");
              setCurrentPassword("");
              setPasswordExists(false);
              setCreateMode(true);
              setIsChangingPassword(false);
              setAttemptCount(0);
              setShowResetButton(false);
              navigation.navigate("Login");
            })
        }
      ]
    );
  }

  function handlePressChangePassword() {
    setIsChangingPassword(true);
    setCreateMode(false);
    setCurrentPassword("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        {createMode ? (
          <>
            <Text style={{ fontSize: 28 }}>
              {isChangingPassword ? "Change Password:" : "Create Password:"}
            </Text>
            {/* // hygor-------------------------- */}
            <View style={[styles.inputContainer, {}]}>
              <TextInput
                placeholder="New password (16 characters)"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={passwordVisibility}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                <Ionicons
                  name={passwordVisibility ? "eye-off" : "eye"}
                  size={28}
                  color="grey"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleCreatePassword}
              style={{
                backgroundColor: "blue",
                padding: 12,
                paddingRight: 35,
                paddingLeft: 35,
                borderRadius: 5
              }}
            >
              <Text style={{ color: "white", fontSize: 25 }}>Save</Text>
            </TouchableOpacity>

            {isChangingPassword && (
              <Button title="Cancel" onPress={cancelChange} />
            )}
          </>
        ) : (
          <>
            {isChangingPassword ? (
              <>
                <Text style={{ fontSize: 28 }}>Change Password:</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter current password to continue"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={passwordVisibility}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setPasswordVisibility(!passwordVisibility)}
                  >
                    <Ionicons
                      name={passwordVisibility ? "eye-off" : "eye"}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
                <Button
                  title="Confirm Current Password"
                  onPress={initiateChangePassword}
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setIsChangingPassword(false);
                    setCurrentPassword("");
                  }}
                />
              </>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={passwordVisibility}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setPasswordVisibility(!passwordVisibility)}
                  >
                    <Ionicons
                      name={passwordVisibility ? "eye-off" : "eye"}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
                {/* <Button title="Login" onPress={handleLogin} /> */}

                <TouchableOpacity
                  onPress={handleLogin}
                  style={{
                    backgroundColor: "blue",
                    padding: 12,
                    paddingRight: 35,
                    paddingLeft: 35,
                    borderRadius: 5,
                    marginBottom: 20
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
                </TouchableOpacity>
                {passwordExists && (
                  <Button
                    title="Change Password"
                    onPress={handlePressChangePassword}
                  />
                )}
                {showResetButton && (
                  <TouchableOpacity
                    onPress={resetAppData}
                    style={{
                      backgroundColor: "red",
                      padding: 12,
                      paddingRight: 35,
                      paddingLeft: 35,
                      borderRadius: 5,
                      marginTop: 20
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Reset the App
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100
  },
  innerContainer: {
    alignItems: "center",
    width: "100%"
  },
  inputContainer: {
    flexDirection: "row", // Alinha os filhos horizontalmente
    alignItems: "center", // Centraliza os filhos verticalmente na linha
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "white" // Alterado de vermelho para branco para visualização normal
  },
  input: {
    flex: 1,
    paddingRight: 45,
    height: 35,
    fontSize: 16
  },
  icon: {
    marginRight: 5
  },
  logo: {
    width: 100,
    height: 130,
    marginBottom: 20
  }
});
