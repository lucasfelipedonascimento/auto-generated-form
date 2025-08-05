# Auto-Generated Forms

- Este projeto é uma aplicação web para criar formulários personalizados de maneira dinâmica. Ele utiliza tecnologias modernas como React, Next.js e React Hook Form para oferecer uma experiência interativa e eficiente.

## Funcionalidades

- Criação de Formulários Dinâmicos: Adicione campos personalizados com diferentes tipos (input ou select) e configure dependências entre os campos.

- Validação de Campos: Configure validações obrigatórias para os campos do formulário.

- Envio de Formulários: Submeta os formulários criados para um endpoint configurado.

- Gerenciamento de Formulários: Acesse formulários previamente cadastrados.

## Estrutura do Projeto

├── app/
│ ├── new-form/
│ │ ├── components/
│ │ │ ├── dynamic-form.tsx
│ │ │ ├── register-field.tsx
│ │ ├── page.tsx
│ ├── old-form/
│ │ ├── page.tsx
├── components/
│ ├── ui/
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ ├── label.tsx
│ │ ├── select.tsx
├── constants/
│ ├── routes.ts
├── lib/
├── public/
├── types/
│ ├── Field.ts
├── .env.example
├── next.config.ts
├── package.json
├── README.md
├── tsconfig.json

## Tecnologias Utilizadas

- React: Biblioteca para construção de interfaces de usuário.

- Next.js: Framework para aplicações React com suporte a renderização no servidor e geração estática.

- React Hook Form: Gerenciamento de formulários com validação integrada.

- Axios: Cliente HTTP para comunicação com a API.

- Tailwind CSS: Framework de estilização para criar interfaces responsivas e modernas.

## Como Executar o Projeto

1. Clone o repositório:

```sh
git clone <url-do-repositorio>
cd auto-generated-forms
```

2. Instale as dependências:

```sh
npm install
```

3. Configure as variáveis de ambiente:

- Copie o arquivo .env.example para .env e configure os valores necessários, como API_URL.

  - **OBS**: É necessário também clonar o repositório da api que se encontra no link: https://github.com/lucasfelipedonascimento/auto-generated-form-api

4. Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

5. Acesse a aplicação em http://localhost:3000.

## Endpoints da API

- POST /forms: Envia os dados do formulário criado.

  - Body:

  ```json
  {
    "name": "Nome do Formulário",
    "questions": [
      {
        "label": "Pergunta 1",
        "type": "input",
        "options": null,
        "conditions": null,
        "response": "Resposta do usuário"
      }
    ]
  }
  ```

  - GET /forms: Busca os formulários criados.

  ```json
  {
    "forms": [
      {
        "id": "c7326d47-522f-4fe1-9bb9-822e137ccf53",
        "nome": "gtgtg",
        "questions": [
          {
            "id": "b5f7c4d1-b54b-4df2-9bcf-ddc0f05e1210",
            "label": "gtgtg",
            "type": "input",
            "response": "gtgtg"
          }
        ]
      }
    ]
  }
  ```

  - GET /forms/:id: Busca um formulário pelo id

  ```json
  {
    "form": {
      "id": "c7326d47-522f-4fe1-9bb9-822e137ccf53",
      "nome": "gtgtg",
      "questions": [
        {
          "id": "b5f7c4d1-b54b-4df2-9bcf-ddc0f05e1210",
          "label": "gtgtg",
          "type": "input",
          "response": "gtgtg"
        }
      ]
    }
  }
  ```
