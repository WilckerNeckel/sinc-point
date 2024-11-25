# SincPoint

SincPoint é um simulador de relógios lógicos que utiliza o Algoritmo de Berkeley para sincronização de relógios. Com essa aplicação, você pode adicionar computadores com horários distintos e sincronizá-los automaticamente para que fiquem todos alinhados com base em um cálculo de tempo médio.

## Funcionalidades

- Adicionar computadores com IPs e horários personalizados.
- Exibir o horário atual de cada computador na interface.
- Sincronizar os horários utilizando o **Algoritmo de Berkeley**, ajustando as diferenças de tempo entre os computadores.
- Interface interativa e responsiva para uma experiência amigável em qualquer dispositivo.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface.
- **Material-UI**: Estilização de componentes e layout responsivo.
- **Day.js**: Manipulação de datas e horas.
- **Vite**: Ferramenta de build rápida e eficiente.

## Como Funciona

1. **Adicionar Computadores**:
   - Insira um IP e um horário personalizado para cada computador.
   - Cada computador é exibido como um card na interface.

2. **Sincronizar Horários**:
   - Clique no botão **Sincronizar**.
   - O Algoritmo de Berkeley calcula o tempo médio entre todos os relógios e ajusta os horários de cada computador automaticamente.

3. **Interface Dinâmica**:
   - Os ajustes de tempo são exibidos em cada computador por alguns segundos após a sincronização.

## Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse a aplicação no navegador em: [http://localhost:5173](http://localhost:5173)

## Link para Deploy

Você pode acessar a aplicação hospedada pelo link abaixo:

[**SincPoint - Simulador de Relógios Lógicos**](https://seu-link-deploy-aqui.com)

## Estrutura do Projeto

- **/src**
  - **components**: Componentes reutilizáveis como ComputerCard, ServerClock, e ComputerGrid.
  - **contexts**: Contextos globais como notificações.
  - **assets**: Imagens e ícones utilizados na aplicação.
  - **App.jsx**: Ponto principal da aplicação.

## Algoritmo de Berkeley

O Algoritmo de Berkeley é utilizado para sincronização de relógios em sistemas distribuídos. O servidor central calcula o tempo médio com base nos tempos enviados pelos clientes e ajusta os relógios de forma proporcional.

Na aplicação, a implementação funciona da seguinte forma:

1. Os tempos de cada computador são enviados ao servidor.
2. O servidor calcula a diferença entre os relógios e o tempo médio.
3. Cada computador recebe um ajuste proporcional para sincronização.


