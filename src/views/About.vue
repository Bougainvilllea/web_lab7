<template>
  <div class="about">
    <div class="card">
      <h1>Немного о To-Do листе:</h1>
      
      <div class="features">
        <h2>Фичи:</h2>
        <ul>
          <li>🥟 Удаление/добавление задач</li>
          <li>🥟 Возможность пометки выполенного</li>
          <li>🥟 Фильтрация задач</li>
          <li>🥟 Аккаунт пользователя</li>
          <li>🥟 Хранение данных</li>
        </ul>
      </div>
      
      <div class="tech">
        <h2>Выполенно при помощи:</h2>
        <p>Vue 3, Pinia, Vue Router</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.features, .tech {
  margin: 20px 0;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>