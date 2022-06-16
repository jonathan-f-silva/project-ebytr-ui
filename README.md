# Ebytr ToDo UI

Parte do frontend do app Ebytr (UI), que usa React Vite e Chakra UI.

## Rodando localmente em modo de desenvolvimento

É necessário ter [Docker](https://docs.docker.com/get-docker/) instalado na máquina e a [imagem Ebytr ToDo API](https://github.com/jonathan-f-silva/project-ebytr-api) rodando na porta 3001.

- Clone o repositório
```shell
git clone https://github.com/jonathan-f-silva/project-ebytr-ui
```

- Para iniciar
```shell
docker compose up -d
```

- Agora é possível fazer alterações em tempo real na pasta `src` e acessar a UI em http://localhost:3000


## Variáveis de ambiente

- `VITE_API_URL` - URL da API (backend)

```sh
VITE_API_URL=http://localhost:3001
```
