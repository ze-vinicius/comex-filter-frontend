# Comex filter
Projeto criado para o Laboratório de Contas 
Regionais da Amazônia (LACAM) com o intuito de filtrar e 
auxiliar o economista a extrair informaçoes dos dados
disponíveis na base de dados do 
[Comercio Exterior Brasileiro](http://www.mdic.gov.br/index.php/comercio-exterior/estatisticas-de-comercio-exterior/base-de-dados-do-comercio-exterior-brasileiro-arquivos-para-download)

# Features
- Selecionar a base de dados a ser buscada (Importação ou exportação) 
- Selecionar as unidades regionais a serem filtradas
  - Por enquanto está dividido apenas por municípios
- O ano de referência.
  - Listado apenas 2017, que é a base de dados cadastrada.
- Modo de agregação.
  - Totalmente desagregado (requisita os dados na menor unidade e sem agregações)
  - Total exportado de cada produto de determinado(s) municípios
  - Total exportado de cada produto daquela região
  - Total exportado de cada produto de determinado(s) municípios, separados por país (origem ou destino)
  - Total exportado de cada produto daquela região, separados por país (origem ou destino)

# Autor
- José Vinícius - [GitHub](https://gist.github.com/jbsaraiva)

# Tecnologias
- React js
- Typescript