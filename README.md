# MongoDB - Trabalho final

## Lista de endpoints

### Mostrar todos os flashcards

```http
  GET /flashcards
```

### Mostrar todas as escolas

```http
  GET /escolas
```

### Mostrar todos as lições

```http
  GET /licoes
```

Observações: os resultados são ordenados em ordem crescente com base no campo identificador de cada entrada.

### Mostrar flashcard específico

```http
  GET /flashcards/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `number`   | **Obrigatório**. Identificador do flashcard, valor do campo `_id` no banco|


### Mostrar escola específica

```http
  GET /escolas/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `number`   | **Obrigatório**. Identificador da escola, valor do campo `_id` no banco|

### Mostrar lição específica

```http
  GET /licoes/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `number`   | **Obrigatório**. Identificador da lição, valor do campo `_id` no banco|


### Inserir flashcard

```http
  POST /flashcards
```
Parâmetros:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `frente`| `string`  | **Obrigatório**. Conteúdo da parte frontal do flashcard|
| `verso`| `string`   | **Obrigatório**. Conteúdo da parte posterior do flashcard|

Obs: enviar parâmetros no corpo da requisição no formato **raw-JSON**

### Atualizar um flashcard pelo ID

```http
  PUT /flashcards/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Identificador do flashcard, valor do campo `_id` no banco|

No corpo da requisição deverão ser passados os seguintes parâmetros a serem atualizados no formato **raw - JSON**:
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `frente`| `string`  | **Obrigatório**. Conteúdo da parte frontal do flashcard|
| `verso`| `string`   | **Obrigatório**. Conteúdo da parte posterior do flashcard|

Obs: Nenhum parâmetro é **Obrigatório**, os parâmetros não enviados não serão alterados.

### Remover um flashcard pelo ID

```http
  DELETE /flashcards/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Identificador do flashcard, valor do campo `_id` no banco|

### Inserir escola

```http
  POST /escolas
```
Parâmetros:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cidade`| `string`  | **Obrigatório**. Cidade onde a escola está localizada|
| `complemento`| `string`   | **Obrigatório**. Complemento do endereço da escola|
| `endereco`| `string`  | **Obrigatório**. Endereço onde a escola está localizada|
| `estado`| `string`   | **Obrigatório**. Estado onde a escola está localizada|
| `facebook`| `string`  | **Obrigatório**. Endereço da página web da escola no Facebook|
| `instagram`| `string`   | **Obrigatório**. Endereço da página web da escola no Instagram|
| `nome`| `string`  | **Obrigatório**. Nome completo da escola|
| `numero`| `string`   | **Obrigatório**. Número da localização da escola|
| `presencial`| `boolean`  | **Obrigatório**. Indica se a escola possui formato presencial de estudos|

Obs: enviar parâmetros no corpo da requisição no formato **raw - JSON**

### Atualizar uma escola pelo ID

```http
  PUT /escolas/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Identificador do flashcard, valor do campo `_id` no banco|

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cidade`| `string`  | Cidade onde a escola está localizada|
| `complemento`| `string`   | Complemento do endereço da escola|
| `endereco`| `string`  | Endereço onde a escola está localizada|
| `estado`| `string`   | Estado onde a escola está localizada|
| `facebook`| `string`  | Endereço da página web da escola no Facebook|
| `instagram`| `string`   | Endereço da página web da escola no Instagram|
| `nome`| `string`  |  Nome completo da escola|
| `numero`| `string`   | Número da localização da escola|
| `presencial`| `boolean`  | Indica se a escola possui formato presencial de estudos|

Obs: Nenhum parâmetro é **Obrigatório**, os parâmetros não enviados não serão alterados.

### Remover uma escola pelo ID

```http
  DELETE /escolas/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Identificador da escola, valor do campo `_id` no banco|
