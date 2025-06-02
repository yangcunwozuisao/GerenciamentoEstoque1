# Sistema de Gerenciamento de Estoque na AWS

Este projeto apresenta uma solução de backend containerizado para um **sistema de gerenciamento de estoque**, desenvolvida na disciplina **Serviços em Nuvem** sob orientação do professor **Joaqui Pessoa Filho**, por **Danile Zou e Danilo Ye**. O sistema foi implantado na AWS utilizando serviços como **ECS Fargate**, **Amazon RDS**, **API Gateway** e **AWS Lambda**.

## Objetivo

Desenvolver e implantar uma aplicação escalável e segura para **controlar o estoque de produtos**, com funcionalidades de cadastro, consulta, atualização e remoção de itens, além da geração de relatórios dinâmicos via API.

## Arquitetura Utilizada

A arquitetura da solução segue boas práticas da AWS, com separação entre as camadas, sub-redes privadas, uso de serviços gerenciados e uma função serverless desacoplada para análise de dados.

### Componentes:

- **API REST** hospedada em **ECS Fargate**
- **Banco de Dados** MySQL via **Amazon RDS** (sem IP público)
- **API Gateway** como ponto de entrada seguro
- **AWS Lambda** para rota de relatório `/report`
- **CloudWatch Logs** para monitoramento

## 🛠 Tecnologias e Serviços

- **Node.js + Express** (backend da API)
- **Amazon ECS (Fargate)**
- **Amazon RDS (MySQL)**
- **Amazon API Gateway**
- **AWS Lambda**
- **Amazon CloudWatch**
- **Amazon ECR**
- **VPC, NAT Gateway, Sub-redes privadas e públicas**

## Funcionalidades

### API de Estoque

| Rota             | Método | Descrição                        |
|------------------|--------|----------------------------------|
| `/items`         | GET    | Lista todos os produtos          |
| `/items`         | POST   | Adiciona um novo item ao estoque |
| `/items/{id}`    | PUT    | Atualiza dados de um item        |
| `/items/{id}`    | DELETE | Remove um item do estoque        |

### Relatórios

| Rota       | Método | Descrição                                       |
|------------|--------|-------------------------------------------------|
| `/report`  | GET    | Retorna estatísticas como total de itens, média de estoque, etc. |

A rota `/report` é tratada por uma função **AWS Lambda**, que consome a API de forma indireta via HTTP, sem acesso direto ao banco.

## Segurança e Escopo

- Recursos sensíveis estão isolados em **sub-redes privadas**
- A comunicação entre serviços é protegida por **Security Groups**
- O banco de dados não é acessível externamente
- Apenas o **API Gateway** expõe a aplicação ao público

## Diagrama da Arquitetura

![Diagrama da Arquitetura](img/diagrama_arq.png)

## Demonstração em Vídeo

> Acesse a demonstração completa com operações CRUD, execução da função `/report` e visualização de recursos no console AWS.  
> **Link para o vídeo:** [disponível aqui]

## Logs e Monitoramento

- **CloudWatch Logs** habilitado para ECS e Lambda
- Monitoração de chamadas, erros e tempo de resposta
- Possibilidade de integração com **AWS X-Ray** (não incluído nesta versão)

## Autor

**Daniel Zou**  
**Danilo Ye**  
*Aluno – Sistemas de Informação*  
**Disciplina:** Serviços em Nuvem  
**Professor:** Joaquim Pessoa Filho

---

