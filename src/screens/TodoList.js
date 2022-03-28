import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import Task from "../components/Task";

export default function TodoList() {
  const [taskItems, setTaskItems] = useState([]);
  const [task, setTask] = useState();

  //   useEffect(() => {
  //     getTask();
  //   }, []);

  //   useEffect(() => {
  //     saveTask(taskItems);
  //   }, [taskItems]);

  //   function handleAddTask() {
  //     Keyboard.dismiss();
  //     if (task == "") {
  //       Alert.alert("error", "Task tidak boleh kosong");
  //     } else {
  //       const newTask = {
  //         id: Math.random(),
  //         task: task,
  //         // completed: false,
  //       };
  //       setTaskItems([...taskItems, newTask]);
  //       setTask("");
  //     }
  //   }

  //   const saveTask = async (taskItems) => {
  //     try {
  //       const stringifyTaskItems = JSON.stringify(taskItems);
  //       await AsyncStorage.setItem("TaskItems", stringifyTaskItems);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getTask = async () => {
  //     try {
  //       const TaskItems = await AsyncStorage.getItem("TaskItems");
  //       if (TaskItems != null) {
  //         setTodos(JSON.parse(TaskItems));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.headerTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {/* Task item will appear here */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Add Task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={"Tambahkan task"} value={task} onChangeText={(text) => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 40,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
  },
});
