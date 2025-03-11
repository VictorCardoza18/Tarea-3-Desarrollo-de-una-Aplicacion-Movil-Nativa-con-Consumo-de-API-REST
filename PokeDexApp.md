
# Aplicación Pokedex - Kotlin (Jetpack Compose)

## Descripción general

Esta aplicación es una **Pokedex** construida con **Kotlin** y **Jetpack Compose** para Android. Utiliza la **PokeAPI** para obtener datos sobre Pokémon, como sus nombres, imágenes y detalles. La aplicación permite a los usuarios ver una lista de Pokémon y navegar a la vista detallada de cada uno.

## Componentes clave

La aplicación está estructurada utilizando varios componentes y patrones arquitectónicos como **ViewModel**, **Retrofit** para llamadas a la API, y **Jetpack Compose** para la UI. A continuación se presenta un desglose de las partes importantes de la aplicación:

### 1. **MainActivity**

La **MainActivity** configura la estructura inicial de la aplicación, incluyendo la configuración de Retrofit, la creación de la interfaz de la API e inicializando la UI.

#### Partes clave:
- **Configuración de Retrofit**: Inicializa el cliente **Retrofit** para interactuar con **PokeAPI**.
- **Configuración de navegación**: La aplicación utiliza **Jetpack Navigation** para gestionar la navegación entre la lista de Pokémon y la vista detallada.
- **Configuración de la UI**: Llama al composable `PokedexApp` para configurar la UI y pasar la instancia de `pokeApi`.

```kotlin
val retrofit = Retrofit.Builder()
    .baseUrl("https://pokeapi.co/api/v2/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val pokeApi = retrofit.create(PokeApi::class.java)
```

### 2. **Interfaz PokeApi**

La interfaz **PokeApi** define los métodos utilizados para interactuar con la PokeAPI, obteniendo una lista de Pokémon y recuperando los detalles de un Pokémon individual.

#### Métodos clave:
- **getPokemonList**: Obtiene una lista de Pokémon con soporte de paginación.
- **getPokemonDetail**: Obtiene información detallada de un Pokémon específico basado en su ID.

```kotlin
@GET("pokemon/{id}")
suspend fun getPokemonDetail(@Path("id") id: Int): Pokemon
```

### 3. **Modelos de Datos**

Los modelos de datos se utilizan para representar la estructura de los datos devueltos por la PokeAPI.

- **PokemonListResponse**: Representa la respuesta del endpoint de lista de Pokémon de la API.
- **Pokemon**: Representa información detallada sobre un Pokémon específico.
- **Sprites**: Contiene la URL de la imagen del sprite del Pokémon.
- **Type, Move, Stat**: Estos modelos contienen información relacionada con los tipos de Pokémon, los movimientos y las estadísticas.

```kotlin
data class Pokemon(
    val id: Int,
    val name: String,
    val sprites: Sprites,
    val types: List<Type>,
    val weight: Int,
    val height: Int,
    val moves: List<Move>,
    val stats: List<Stat>
)
```

### 4. **PokemonViewModel**

El **PokemonViewModel** gestiona los datos de la aplicación y el estado de la UI. Obtiene los datos de la API y los almacena en variables `StateFlow`, que son observadas por la UI. Maneja dos funcionalidades principales: obtener la lista de Pokémon y obtener los detalles de un Pokémon.

#### Estados clave:
- **pokemonList**: Una lista de Pokémon obtenida de la API.
- **pokemonDetail**: Detalles de un Pokémon específico.
- **isLoading**: Indica si la aplicación está cargando datos desde la API.
- **error**: Almacena cualquier mensaje de error que pueda ocurrir durante las llamadas a la API.

```kotlin
class PokemonViewModel(private val pokeApi: PokeApi) : ViewModel() {
    private val _pokemonList = MutableStateFlow<List<PokemonListItem>>(emptyList())
    val pokemonList: StateFlow<List<PokemonListItem>> = _pokemonList
}
```

### 5. **PokemonViewModelFactory**

El **PokemonViewModelFactory** se utiliza para crear el **PokemonViewModel** con su dependencia requerida, **PokeApi**. Implementa la interfaz `ViewModelProvider.Factory` para proporcionar la creación personalizada del ViewModel.

```kotlin
class PokemonViewModelFactory(private val pokeApi: PokeApi) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(PokemonViewModel::class.java)) {
            return PokemonViewModel(pokeApi) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
```

### 6. **Componentes de UI**

La UI de la aplicación está construida usando **Jetpack Compose**. Los componentes principales son:

#### - **PokemonListScreen**: Muestra una lista de Pokémon. Utiliza un **LazyColumn** para mostrar la lista y permite a los usuarios hacer clic en un Pokémon para navegar a sus detalles.

```kotlin
LazyColumn(modifier = Modifier.fillMaxSize()) {
    items(pokemonList) { pokemon ->
        PokemonListItem(pokemon = pokemon) {
            val pokemonId = pokemon.url.substringAfter("pokemon/").substringBefore("/").toInt()
            navController.navigate("pokemonDetail/$pokemonId")
        }
    }
}
```

#### - **PokemonListItem**: Muestra los nombres de los Pokémon junto con sus imágenes. La imagen se carga utilizando la librería **Coil**.

```kotlin
AsyncImage(
    model = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$pokemonId.png",
    contentDescription = pokemon.name,
    modifier = Modifier.size(50.dp)
)
```

#### - **PokemonDetailScreen**: Muestra información detallada sobre un Pokémon específico, como sus estadísticas, movimientos y tipo.

### 7. **Manejo de Errores y Estado de Carga**

Mientras se obtienen los datos de la API, el **PokemonViewModel** gestiona el **estado de carga** y el **estado de error**. La UI muestra un **CircularProgressIndicator** mientras se cargan los datos y muestra cualquier mensaje de error si ocurre una excepción.

```kotlin
if (isLoading) {
    CircularProgressIndicator()
}
```

---

## Conclusión

Esta aplicación Pokedex demuestra un enfoque moderno en el desarrollo de Android utilizando **Jetpack Compose**, **ViewModel**, **Retrofit** y **StateFlow**. La arquitectura sigue una separación clara de responsabilidades, con el **ViewModel** gestionando la lógica de datos, **Compose** manejando la UI y **Retrofit** facilitando las interacciones con la API.

### Tecnologías utilizadas:
- **Kotlin**
- **Jetpack Compose**
- **Retrofit**
- **PokeAPI**
- **StateFlow & ViewModel**

Siéntete libre de explorar y personalizar esta aplicación para aprender más sobre Kotlin y el desarrollo para Android.
