import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = "TODOS";

export default function HomeTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  //load all todos initally
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setTodos(JSON.parse(data));
        }
      } catch (error) {
        console.log("Error loading todos:", error);
      }
    };

    loadTodos();
  }, []);

  //to save locally when todo changes
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.log("Error saving todos:", error);
      }
    };

    saveTodos();
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, title: title.trim() } : t,
        ),
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title: title.trim(),
          completed: false,
        },
      ]);
    }

    setTitle("");
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setTitle(todo.title);
    setEditingId(todo.id);
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">My Todos</Text>

      <TextInput
        label="Todo"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleAddOrUpdate}
        style={styles.button}
      >
        {editingId ? "Update Todo" : "Add Todo"}
      </Button>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text
                style={[styles.todoText, item.completed && styles.completed]}
              >
                {item.title}
              </Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="check"
                iconColor={item.completed ? "#4CAF50" : "gray"}
                onPress={() => toggleComplete(item.id)}
              />
              <IconButton icon="pencil" onPress={() => handleEdit(item)} />
              <IconButton
                icon="delete"
                iconColor="#F44336"
                onPress={() => handleDelete(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginBottom: 15,
  },
  card: {
    marginVertical: 6,
  },
  todoText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
