import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import trashIcon from '../assets/icons/trash/trash.png'
import penEditIcon from '../assets/icons/penEdit/penEdit.png'
import { Task } from './TasksList';

interface Handles {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}



interface TaskItemProps {
  task: Task,
  index: number
  handles: Handles
}

export function TaskItem({ task, index, handles }: TaskItemProps) {
  const { editTask, removeTask, toggleTaskDone } = handles

  const textInputRef = useRef<TextInput>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setTitle(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask(task.id, title)
    setIsEditing(false)
  }

  function handleRemoveTask() {
    setIsEditing(true)
    removeTask(task.id)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleCancelEditing()}
          >
            <Icon
              name="x"
              size={24}
              color="#B2B2B2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleStartEditing()}
          >
            <Image source={penEditIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          onPress={() => handleRemoveTask()}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  iconDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }
})