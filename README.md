# Sistema-De-Votaciones

## Requisitos previos

- Node.js (versión 18 o superior)
- MySQL (versión 8.0 o superior)
- npm o yarn

## Instalación y configuración

### 1. Clonar el repositorio

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar base de datos localmente

### 4. Configurar variables de entorno
Configurar archivo `.env` en la raíz del proyecto:
```env
DB_NAME=sistema_de_votaciones
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
```

### 5. Ejecutar el proyecto
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## API Endpoints

### Votantes (Voters)

#### Registrar votante
```bash
# curl
curl -X POST http://localhost:3000/voters \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@email.com"}'
```

#### Obtener todos los votantes
```bash
# curl
curl http://localhost:3000/voters
```

#### Obtener votante por ID
```bash
# curl
curl http://localhost:3000/voters/1
```

#### Eliminar votante
```bash
# curl
curl -X DELETE http://localhost:3000/voters/1
```

### Candidatos (Candidates)

#### Registrar candidato
```bash
# curl
curl -X POST http://localhost:3000/candidates \
  -H "Content-Type: application/json" \
  -d '{"name": "María González", "party": "Partido 1"}'
```

#### Obtener todos los candidatos
```bash
# curl
curl http://localhost:3000/candidates
```

#### Obtener candidato por ID
```bash
# curl
curl http://localhost:3000/candidates/1
```

#### Eliminar candidato
```bash
# curl
curl -X DELETE http://localhost:3000/candidates/1
```

### Votos (Votes)

#### Emitir voto
```bash
# curl
curl -X POST http://localhost:3000/votes \
  -H "Content-Type: application/json" \
  -d '{"voter_id": 1, "candidate_id": 1}'
```

#### Obtener todos los votos
```bash
# curl
curl http://localhost:3000/votes
```

#### Obtener estadísticas de votación
```bash
# curl
curl http://localhost:3000/votes/statistics
```

## Ejemplos con Postman

### 1. Registrar votante
- **Método**: POST
- **URL**: `http://localhost:3000/voters`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "name": "Ana Martínez",
  "email": "ana@email.com"
}
```

### 2. Registrar candidato
- **Método**: POST
- **URL**: `http://localhost:3000/candidates`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "name": "Carlos Rodríguez",
  "party": "Partido Conservador"
}
```

### 3. Emitir voto
- **Método**: POST
- **URL**: `http://localhost:3000/votes`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "voter_id": 1,
  "candidate_id": 1
}
```

### 4. Obtener estadísticas
- **Método**: GET
- **URL**: `http://localhost:3000/votes/statistics`

### Captura de estadísticas generadas

La siguiente imagen muestra un ejemplo de las estadísticas generadas por el sistema, donde se pueden visualizar los resultados de votación en tiempo real con la distribución de votos por candidato:

![statistics.png](statistics.png)

*Esta captura muestra el endpoint `/votes/statistics` en acción, mostrando los resultados de votación en tiempo real con información del candidato, conteo de votos y porcentajes.*
