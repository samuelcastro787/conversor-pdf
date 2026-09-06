# Conversor de Imagem para PDF

Projeto simples que converte uma imagem (JPG, PNG, etc.) em um arquivo PDF, direto no navegador, sem precisar de backend.

## Funcionalidades

- Seleção de imagem por clique ou arrastando o arquivo (drag and drop)
- Geração do PDF com o mesmo nome da imagem original
- PDF gerado com o tamanho proporcional à imagem (sem distorcer)
- Feedback visual durante a geração do PDF e em caso de erro

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) — biblioteca usada para gerar o PDF

## Conceitos aplicados

- Manipulação de DOM
- Eventos (click, change, drag and drop)
- Funções
- Condicionais
- Expressões regulares (para tratar o nome do arquivo com `replace`)

## Como usar

1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` no navegador
3. Selecione ou arraste uma imagem
4. Clique em "Gerar PDF"

## Possíveis melhorias futuras

- Suporte para múltiplas imagens em um único PDF
- Validação mais robusta do tipo de arquivo
- Suporte para conversão de outros tipos de arquivo além de imagens