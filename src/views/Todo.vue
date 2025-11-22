<template>
  <div class="todo-container">
    <div class="todo-card">
      <h1>Мои задачи:</h1>
      
      <div class="controls">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask" 
          placeholder="Введите задачу и нажмите enter"
          class="task-input"
        >
        <select v-model="todoStore.filter" class="filter-select">
          <option value="all">Все⚪</option>
          <option value="active">Активные❌</option>
          <option value="completed">Завершенные✔️</option>
        </select>
      </div>
      
      <div class="tasks-list">
        <div 
          v-for="task in todoStore.filteredTasks" 
          :key="task.id" 
          class="task-item"
          :class="{ completed: task.completed }"
        >
          <input 
            type="checkbox" 
            :checked="task.completed"
            @change="todoStore.toggleTask(task.id)"
            class="task-checkbox"
          >
          <span class="task-text">{{ task.text }}</span>
          <button @click="todoStore.deleteTask(task.id)" class="delete-btn">×</button>
        </div>
        
        <p v-if="todoStore.filteredTasks.length === 0" class="empty-message">
          Заметок нет... Нужно добавить.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const newTask = ref('')
const todoStore = useTodoStore()

const addTask = () => {
  if (newTask.value.trim()) {
    todoStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.controls {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.task-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-select {
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
}

.tasks-list {
  margin-top: 2rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  border-bottom: 1px solid #f1f3f4;
  transition: background 0.3s ease;
}

.task-item:hover {
  background: #f8f9fa;
}

.task-item.completed {
  opacity: 0.7;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-text {
  flex: 1;
  font-size: 1rem;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-message {
  text-align: center;
  color: #888;
  padding: 2rem;
  font-style: italic;
}
</style>