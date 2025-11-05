// 🧑‍💻 Imairah’s IT Guy Portal — Working Instant Download Version
async function splitPDF() {
  const fileInput = document.getElementById('pdfFile');
  const pagesInput = document.getElementById('pagesInput').value.trim();
  const status = document.getElementById('status');

  if (!fileInput.files.length) {
    status.textContent = 'Please upload a PDF first 📄';
    return;
  }

  if (!pagesInput) {
    status.textContent = 'Please enter page numbers like 1-3 or 2,5 ❤️';
    return;
  }

  try {
    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdf = await PDFLib.PDFDocument.create();
    const totalPages = pdfDoc.getPageCount();

    const pages = [];
    pagesInput.split(',').forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          if (!isNaN(i) && i > 0 && i <= totalPages) pages.push(i);
        }
      } else {
        const num = parseInt(part);
        if (!isNaN(num) && num > 0 && num <= totalPages) pages.push(num);
      }
    });

    if (pages.length === 0) {
      status.textContent = "No valid pages found 😅";
      return;
    }

    for (const num of pages) {
      const [page] = await newPdf.copyPages(pdfDoc, [num - 1]);
      newPdf.addPage(page);
    }

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Imairah_Cutie_Pages.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    status.textContent = `✨ Done! Your split PDF is ready ❤️ (${pages.length} page${pages.length>1?'s':''})`;
  } catch (err) {
    console.error(err);
    status.textContent = "Oops, something went wrong 😅";
  }
}
