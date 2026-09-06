const btn = document.querySelector("#converter");
const arquivoInput = document.querySelector("#arquivo");
const fileNameDiv = document.querySelector("#file-name");
const dropZone = document.querySelector("#drop-zone");

let arquivoSelecionado = null;

function atualizarArquivo(file) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    fileNameDiv.textContent = "Selecione um arquivo de imagem válido.";
    fileNameDiv.classList.add("error");
    arquivoSelecionado = null;
    return;
  }

  arquivoSelecionado = file;
  fileNameDiv.classList.remove("error");
  fileNameDiv.textContent = `Selecionado: ${file.name}`;
}

arquivoInput.addEventListener("change", () => {
  atualizarArquivo(arquivoInput.files[0]);
});


["dragenter", "dragover"].forEach(evento => {
  dropZone.addEventListener(evento, (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach(evento => {
  dropZone.addEventListener(evento, (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
  });
});

dropZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  if (file) {
    arquivoInput.files = e.dataTransfer.files;
    atualizarArquivo(file);
  }
});


btn.addEventListener("click", () => {
  if (!arquivoSelecionado) {
    fileNameDiv.textContent = "Selecione uma imagem antes de continuar.";
    fileNameDiv.classList.add("error");
    return;
  }

  const file = arquivoSelecionado;
  const url = URL.createObjectURL(file);
  const img = new Image();

  const nomeSemExtensao = file.name.replace(/\.[^/.]+$/, "");
  const nomeFinalPDF = `${nomeSemExtensao}.pdf`;

  const textoOriginalBtn = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Gerando PDF...";

  img.onload = () => {

    const larguraPolegadas = img.naturalWidth / 96;
    const alturaPolegadas = img.naturalHeight / 96;

    html2pdf()
      .from(`<img src="${url}" style="width: 100%; height: auto; display: block;">`, "string")
      .set({
        filename: nomeFinalPDF,
        html2canvas: { useCORS: true, allowTaint: true, scale: 2 },
        jsPDF: {
          unit: "in",
          format: [larguraPolegadas, alturaPolegadas],
          orientation: larguraPolegadas > alturaPolegadas ? "landscape" : "portrait"
        }
      })
      .save()
      .then(() => {
        URL.revokeObjectURL(url);
        btn.disabled = false;
        btn.textContent = textoOriginalBtn;
      })
      .catch(() => {
        URL.revokeObjectURL(url);
        btn.disabled = false;
        btn.textContent = textoOriginalBtn;
        fileNameDiv.textContent = "Erro ao gerar o PDF. Tente novamente.";
        fileNameDiv.classList.add("error");
      });
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    btn.disabled = false;
    btn.textContent = textoOriginalBtn;
    fileNameDiv.textContent = "Não foi possível carregar essa imagem.";
    fileNameDiv.classList.add("error");
  };

  img.src = url;
});