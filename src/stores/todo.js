import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])
  const filter = ref('all')
  
  const filteredTasks = computed(() => {
    const auth = useAuthStore()
    const userTasks = tasks.value.filter(t => t.userId === auth.user?.id)
    
    switch (filter.value) {
      case 'completed': return userTasks.filter(t => t.completed)
      case 'active': return userTasks.filter(t => !t.completed)
      default: return userTasks
    }
  })
  
  function addTask(text) {
    const auth = useAuthStore()
    const task = {
      id: Date.now(),
      text,
      completed: false,
      userId: auth.user.id
    }
    tasks.value.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  
  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  
  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }
  }
  
  return { tasks, filter, filteredTasks, addTask, deleteTask, toggleTask }
})