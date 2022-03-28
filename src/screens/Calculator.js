import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

//import icon
import { Entypo, Feather } from "@expo/vector-icons";

export default function App() {
  //init state
  const [darkMode, setDarkMode] = useState(false);
  const [inputNumber, setinputNumber] = useState("");
  const [resultHistory, setresultHistory] = useState("");

  const buttons = ["C", "delete", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", 0, "="];

  //create calculate function
  function calculator() {
    let result = eval(inputNumber).toString();
    setinputNumber(result);
    return;
  }

  //create input function
  function handleInput(buttonPressed) {
    if (buttonPressed === "+" || buttonPressed === "-" || buttonPressed === "*" || buttonPressed === "/") {
      setinputNumber(inputNumber + buttonPressed);
      return;
    }
    switch (buttonPressed) {
      case "delete":
        setinputNumber(inputNumber.substring(0, inputNumber.length - 1));
        return;
      case "C":
        setresultHistory("");
        setinputNumber("");
        return;
      case "=":
        setresultHistory(inputNumber + "=");
        calculator();
        return;
    }
    setinputNumber(inputNumber + buttonPressed);
  }

  //create style here
  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#ffc0cb" : "#ffc0cb",
      maxWidth: "100%",
      minHeight: "35%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    resultText: {
      maxHeight: 45,
      color: "#800000",
      margin: 15,
      fontSize: 35,
    },
    historyNumber: {
      color: darkMode ? "#7c7c7c" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
      alignSelf: "flex-end",
    },
    themeButton: {
      alignSelf: "flex-start",
      bottom: "5%",
      margin: 15,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: "100%",
      height: "35%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    button: {
      borderColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "24%",
      minHeight: "54%",
      flex: 2,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 28,
    },
  });

  return (
    <View>
      <StatusBar style="auto" />
      {/* create darkmode button, input result, and history */}
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? "light-up" : "moon"} size={24} color={darkMode ? "white" : "black"} onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))} />
        </TouchableOpacity>
        <Text style={styles.historyNumber}>{`${resultHistory} ${inputNumber}`}</Text>
        <Text style={styles.resultText}>{inputNumber}</Text>
      </View>

      {/* create number button, operator button, delete button, and clear button */}
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === "=" || button === "/" || button === "*" || button === "-" || button === "+" ? (
            <TouchableOpacity key={button} style={[styles.button, { backgroundColor: "#f08080" }]} onPress={() => handleInput(button)}>
              <Text style={[styles.textButton, { color: "white", fontSize: 28 }]}>{button}</Text>
            </TouchableOpacity>
          ) : button === 0 ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: typeof button === "number" ? (darkMode ? "#303946" : "#fff") : darkMode === true ? "#414853" : "#ededed", minWidth: "74%" }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : button === "delete" ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: button === "number" ? (darkMode ? "#303946" : "#fff") : darkMode === true ? "#414853" : "#ededed", minWidth: "37%" }]}
              onPress={() => handleInput(button)}
            >
              <Feather name="delete" size={29} style={styles.textButton} />
              {/* <Text style={styles.textButton}>{button}</Text> */}
            </TouchableOpacity>
          ) : button === "C" ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: typeof button === "number" ? (darkMode ? "#303946" : "#fff") : darkMode === true ? "#414853" : "#ededed", minWidth: "36%" }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: typeof button === "number" ? (darkMode ? "#303946" : "#fff") : darkMode === true ? "#414853" : "#ededed" }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
