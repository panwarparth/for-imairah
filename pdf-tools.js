// 🧑‍💻 IT Portal for Miru ❤️ — Final Version (with fallback download)
async function splitPDF() {
  const fileInput = document.getElementById('pdfFile');
  const pagesInput = document.getElementById('pagesInput').value.trim();
  const status = document.getElementById('status');

  if (!fileInput.files.length) return status.textContent = 'Please upload a PDF first 📄';
  if (!pagesInput) return status.textContent = 'Enter pages like 1-3 or 2,5 ❤️';

  status.textContent = '✂️ Cutting pages... please wait';

  try {
    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdf = await PDFLib.PDFDocument.create();
    const total = pdfDoc.getPageCount();

    const pages = [];
    pagesInput.split(',').forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [a, b] = part.split('-').map(Number);
        for (let i = a; i <= b; i++) if (i >= 1 && i <= total) pages.push(i);
      } else {
        const n = parseInt(part);
        if (n >= 1 && n <= total) pages.push(n);
      }
    });

    if (!pages.length) return status.textContent = 'No valid pages found 😅';

    for (const n of pages) {
      const [pg] = await newPdf.copyPages(pdfDoc, [n - 1]);
      newPdf.addPage(pg);
    }

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // ✅ Safe cross-browser download
    const doSave = window.saveAs || ((b, name) => {
      const url = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    });

    doSave(blob, 'Imairah_Cutie_Pages.pdf');
    status.textContent = `✅ Done! Downloading ${pages.length} page${pages.length>1?'s':''} ❤️`;
  } catch (err) {
    console.error(err);
    status.textContent = 'Something went wrong 😅';
  }
}
