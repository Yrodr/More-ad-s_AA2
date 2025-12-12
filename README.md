# More(ad)s 

> Projeto desenvolvido para a disciplina de **Desenvolvimento de Software para Web 2**
> **Entrega AA2**

**Aluna:** Yara dos Santos Rodrigues  
**RA:** 821774

---

## Sobre o Projeto

O **More(ad)s** é uma plataforma criada para estimular o hábito da leitura diária. A proposta é transformar o ato de ler em um costume divertido e recompensador, conectando leitores e comunidades de leitura.

O objetivo principal é tornar a leitura uma prática regular, aproximando pessoas por meio da literatura e da gamificação.

---

## Novas Funcionalidades (Entrega AA2)

Nesta etapa, o projeto evoluiu de um protótipo estático para uma *Single Page Application* (SPA) funcional, integrando APIs externas e lógica avançada de frontend.

### 1. Integração com Google Books API
* Agora é possível pesquisar livros reais diretamente na página de **Livraria**.
* A aplicação consome a API do Google Books para buscar títulos, autores e capas.
* Usuários podem adicionar os livros encontrados à sua lista pessoal de "Minhas Leituras".

### 2. Cronômetro com Web Workers
* Para garantir a precisão da contagem do tempo de leitura sem travar a interface principal, o cronômetro foi implementado utilizando **Web Workers** (`timer.worker.js`).
* Isso permite que o processamento do tempo ocorra em uma thread separada, garantindo fluidez na aplicação.

### 3. Gamificação e Pontos
* **Ganhar Pontos:** O sistema calcula pontos automaticamente com base nos segundos/horas lidos.
* **Gastar Pontos:** A criação de novos **Clubes de Leitura** agora possui um "custo" em pontos, incentivando o usuário a ler mais para desbloquear funcionalidades.

### 4. Persistência de Dados (LocalStorage)
* Como o backend ainda não está conectado, toda a gestão de dados é feita via `localStorage`.
* Seus livros, progresso de leitura, pontos acumulados e clubes criados ficam salvos no navegador, permitindo que você feche e abra a página sem perder suas informações.

---

## Funcionalidades Principais

* **Minhas Leituras:** Gerencie os livros que você está lendo atualmente.
* **Livraria:** Busque novos títulos na nuvem (Google Books API).
* **Modo Leitura:** Cronometre seu tempo e ganhe recompensas.
* **Clubes de Leitura:** Crie ou participe de grupos (Requer 10 pontos para criar um novo clube).
* **Histórico:** Veja os livros concluídos e suas respectivas avaliações (estrelas).

---

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes ferramentas e bibliotecas:

* **React** (Interface do Usuário)
* **Vite** (Build Tool e Servidor de Desenvolvimento)
* **React Router DOM** (Navegação SPA)
* **Web Workers** (Processamento em segundo plano)
* **Google Books API** (Dados de livros externos)
* **LocalStorage** (Banco de dados local)
* **CSS3** (Estilização responsiva)
