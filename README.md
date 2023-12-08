# MongoDB - Trabalho final

Testado utilizando MongoDBCompass e Postman.

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

No corpo da requisição deverão ser passados os seguintes parâmetros a serem atualizados no formato **raw - JSON**:

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

### Inserir lição

```http
  POST /licoes
```
Parâmetros:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `conteudo`| `string`  | **Obrigatório**. Conteúdo da lição|
| `descricao`| `string`   | **Obrigatório**. Descrição da lição|
| `nivel`| `string`  | **Obrigatório**. Nível em que a lição é cobrada na JLPT (N5-N1)|
| `titulo`| `string`   | **Obrigatório**. Título da lição|
| `frequencia`| `number`  | **Obrigatório**. Indicador de utilização da lição no idioma (0-10, sendo 0 para menos comum e 10 para mais comum)|

Obs: enviar parâmetros no corpo da requisição no formato **raw - JSON**

### Atualizar uma lição pelo ID

```http
  PUT /licoes/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Identificador da lição, valor do campo `_id` no banco|

No corpo da requisição deverão ser passados os seguintes parâmetros a serem atualizados no formato **raw - JSON**:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `conteudo`| `string`  | Conteúdo da lição|
| `descricao`| `string`   | Descrição da lição|
| `nivel`| `string`  | Nível em que a lição é cobrada na JLPT (N5-N1)|
| `titulo`| `string`   | Título da lição|
| `frequencia`| `number`  | Indicador de utilização da lição no idioma (0-10, sendo 0 para menos comum e 10 para mais comum)|

Obs: Nenhum parâmetro é **Obrigatório**, os parâmetros não enviados não serão alterados. Os campos de atualização devem ser enviados no formato **raw - JSON**.


### Remover uma lição pelo ID

```http
  DELETE /licoes/${id}
```
| Parâmetros   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`| `number`   | **Obrigatório**. Identificador da lição, valor do campo `_id` no banco|


### Encontrar a lição com utilização mais frequente no idioma

```http
  GET /licao-mais-frequente
```

### Encontrar a lição com utilização menos frequente no idioma

```http
  GET /licao-menos-frequente
```

### Encontrar escolas por cidade

```http
  GET /escolas_cidade
```

No corpo da requisição deverão ser passados os seguintes campos no formato **raw - JSON**:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cidade`| `string`  | **Obrigatório**. Cidade onde a escola está localizada|

### Encontrar lições com base na frequência de utilização (menos utilizada - mais utilizada)

```http
  GET /licoes-frequencia/
```

No corpo da requisição deverão ser passados os seguintes campos no formato **raw - JSON**:

| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `min`| `string`  | **Obrigatório**. Valor mínimo|
| `max`| `string`  | **Obrigatório**. Valor máximo|

Obs: a pesquisa retorna todas as lições com frequência >= min E <= max.
