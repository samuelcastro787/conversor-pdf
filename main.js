const btn = document.querySelector("#converter");
const arquivoInput = document.querySelector("#arquivo");
const fileNameDiv = document.querySelector("#file-name");

// Atualiza a tela com o nome do arquivo quando selecionado
arquivoInput.addEventListener("change", () => {
  if (arquivoInput.files[0]) {
    fileNameDiv.textContent = `Selecionado: ${arquivoInput.files[0].name}`;
  } else {
    fileNameDiv.textContent = "";
  }
});

btn.addEventListener("click", () => {
  if (!arquivoInput.files[0]) return;

  const file = arquivoInput.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();

  const nomeSemExtensao = file.name.replace(/\.[^/.]+$/, "");
  const nomeFinalPDF = `${nomeSemExtensao}.pdf`;

  img.onload = () => {
    html2pdf()
      .from(`<img src="${url}" style="width: 100%; height: auto; display: block;">`, "string")
      .set({
        filename: nomeFinalPDF,
        html2canvas: { useCORS: true, allowTaint: true, scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .save();
  };

  img.src = url;
});