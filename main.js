const btn = document.querySelector("#btnConverter");

btn.addEventListener("click", () => {
  const input = document.querySelector("#minha-imagem");

  if (!input.files[0]) return;

  const file = input.files[0];
  const url = URL.createObjectURL(input.files[0]);
  const img = new Image();

  const nomeSemExtensao = file.name.replace(/\.[^/.]+$/, "");
  const nomeFinalPDF = `${nomeSemExtensao}.pdf`;

  img.onload = () => {
    html2pdf()
    .from(`<img src="${url}" style="width: 100%;, height: auto;" />`, "string")
    .set({
      filename: nomeFinalPDF,
      html2canvas: { useCORS: true, allowTaint: true, scale: 2 },
    })
    .save();
  }

  img.src = url;


});
