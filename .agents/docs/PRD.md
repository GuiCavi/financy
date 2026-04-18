# Documento de Requisitos de Produto (PRD) - Sistema de Gestão Financeira Pessoal

## 1. Visão Geral do Produto
O objetivo deste produto é oferecer uma solução centralizada e intuitiva para que indivíduos possam organizar sua vida financeira. O sistema permite o registro de movimentações, a classificação dessas movimentações por grupos de interesse e o acompanhamento do fluxo de caixa pessoal através de uma interface visual organizada.

## 2. Público-Alvo e Privacidade
O sistema é destinado a qualquer pessoa que deseje controle sobre suas finanças. A regra fundamental de negócio é a privacidade absoluta: um usuário tem visibilidade e poder de gestão exclusivamente sobre as informações que ele mesmo criou, garantindo que os dados financeiros sejam acessíveis apenas ao proprietário da conta.

## 3. Funcionalidades do Usuário

### 3.1. Gestão de Acesso e Perfil
- Criação de Identidade: O interessado deve ser capaz de criar uma conta no sistema para iniciar sua organização.
- Identificação Segura (Login): Acesso protegido para garantir que cada usuário entre em seu próprio ambiente financeiro.
- Personalização de Perfil: Como funcionalidade opcional para tornar a experiência mais próxima, o usuário pode adicionar uma imagem de identificação ao seu perfil.

### 3.2. Organização por Grupos (Categorias)
Para facilitar o entendimento de onde o dinheiro é gasto ou recebido, o sistema permite:
- Criação e Manutenção: O usuário pode definir nomes para seus grupos financeiros (ex: "Alimentação", "Salário", "Lazer"), além de poder alterá-los ou removê-los conforme sua necessidade.
- Catálogo de Grupos: Uma visualização clara de todos os grupos criados para organizar as movimentações.

### 3.3. Controle de Movimentações (Transações)
Este é o núcleo do sistema, permitindo o registro histórico financeiro:
- Registro de Entrada e Saída: Adicionar novas movimentações financeiras com descrição e valores.
- Ajuste de Registros: Capacidade de corrigir informações em movimentações já lançadas anteriormente.
- Exclusão de Registros: Remover movimentações que não devem mais constar no histórico.
- Painel de Histórico: Visualização de todas as movimentações realizadas de forma listada e organizada.

## 4. Experiência de Uso e Interface

### 4.1. Estrutura do Ambiente
O sistema é composto por 6 telas principais, organizadas para que a navegação seja fluida e lógica.
- Tela de Entrada: Destinada à identificação ou criação de conta para novos usuários.
- Painel de Controle (Dashboard): A tela principal após o acesso, que exibe um resumo da situação financeira e o acesso rápido às ferramentas de gestão.

### 4.2. Facilidade de Preenchimento
Para evitar que o usuário perca o foco da tela principal, o sistema utiliza janelas sobrepostas (modais) para o preenchimento de formulários de criação de movimentações ou grupos, mantendo a navegação ágil.

### 4.3. Identidade Visual
O sistema deve apresentar uma aparência profissional e coerente, seguindo um guia de estilos rigoroso que define cores, fontes e o comportamento visual dos elementos para garantir uma experiência agradável ao usuário.

## 5. Requisitos de Qualidade e Funcionamento
- Consistência de Dados: Toda alteração feita (edição ou exclusão) deve ser refletida imediatamente em todas as visões do sistema.
- Independência de Ambiente: O sistema deve ser capaz de funcionar perfeitamente em computadores locais, garantindo que as informações salvas persistam entre as sessões de uso.