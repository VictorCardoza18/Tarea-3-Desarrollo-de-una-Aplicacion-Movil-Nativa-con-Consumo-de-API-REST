# 📌 Aplicación de Gestión de Tareas

Esta es una aplicación móvil desarrollada en **Android Studio** utilizando **Jetpack Compose**, **Retrofit** y **StateFlow**. Se conecta a un backend RESTful para gestionar tareas, permitiendo listar tareas.

## 📂 Estructura del Proyecto

### 1️⃣ **MainActivity** (Punto de entrada de la app)

El `MainActivity` configura la UI principal con **Material3** y una **barra superior**:
```kotlin
Scaffold(
    modifier = Modifier.fillMaxSize(),
    topBar = {
        TopAppBar(title = { Text("Tareas") })
    }
) { innerPadding ->
    TaskListScreenWrapper(modifier = Modifier.padding(innerPadding))
}
```
También inicializa `Retrofit` y el `ViewModel` en `TaskListScreenWrapper`.

---
### 2️⃣ **Modelo de Datos (`Task`)**

Representa una tarea con **título, descripción y fecha**:
```kotlin
data class Task(
    val id: Int? = null,
    val title: String,
    val description: String,
    val date: String
)
```

---
### 3️⃣ **Interfaz de la API (`TaskApi`)**

Define las operaciones REST usando Retrofit:
```kotlin
@GET("tasks")
suspend fun getTasks(): List<Task>

@POST("tasks")
suspend fun createTask(@Body task: Task): Task
```
Otras funciones permiten obtener, actualizar y eliminar tareas.

---
### 4️⃣ **Repositorio (`TaskRepository`)**

Encapsula las llamadas a la API para desacoplar la fuente de datos:
```kotlin
class TaskRepository(private val api: TaskApi) {
    suspend fun getTasks(): List<Task> = api.getTasks()
    suspend fun createTask(task: Task): Task = api.createTask(task)
}
```

---
### 5️⃣ **`TaskViewModel` (Gestor de Estado)**

Usa `StateFlow` para actualizar la UI de forma reactiva:
```kotlin
private val _tasks = MutableStateFlow<List<Task>>(emptyList())
val tasks: StateFlow<List<Task>> = _tasks
```
Carga las tareas en segundo plano:
```kotlin
fun loadTasks() {
    viewModelScope.launch {
        _tasks.value = repository.getTasks()
    }
}
```

Manejo de tareas:
```kotlin
fun createTask(task: Task) {
    viewModelScope.launch {
        repository.createTask(task)
        loadTasks()
    }
}
```
Incluye una **Factory** para su creación con `ViewModelProvider`.

---
### 6️⃣ **Interfaz de Usuario (`TaskListScreen`)**

Muestra la lista de tareas usando `LazyColumn`:
```kotlin
LazyColumn {
    items(tasks) { task -> TaskItem(task = task) }
}
```
Cada tarea se renderiza con `Card`:
```kotlin
Card {
    Column {
        Text(text = task.title, style = MaterialTheme.typography.headlineSmall)
    }
}
```

---
## 🚀 **Resumen**
✅ Arquitectura basada en MVVM.  
✅ UI reactiva con **Jetpack Compose**.  
✅ Llamadas a API con **Retrofit** y `suspend fun`.  
✅ Manejo de estado con **StateFlow**.  
✅ Diseño desacoplado con `Repository` y `ViewModel`.  

Esta aplicación es escalable y fácil de mantener. 🎯

