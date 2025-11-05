async function splitPDF() {
  const fileInput = document.getElementById('pdfFile');
  const pagesInput = document.getElementById('pagesInput').value.trim();
  const status = document.getElementById('status');
  if (!fileInput.files.length) return status.textContent = 'Please upload a PDF first 📄';
  if (!pagesInput) return status.textContent = 'Enter pages like 1-3 or 2,5 ❤️';

  try {
    const file = fileInput.files[0];
    const buffer = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(buffer);
    const newPdf = await PDFLib.PDFDocument.create();
    const total = pdf.getPageCount();
    const pages = [];

    pagesInput.split(',').forEach(p => {
      p = p.trim();
      if (p.includes('-')) {
        const [a, b] = p.split('-').map(Number);
        for (let i = a; i <= b; i++) if (i <= total) pages.push(i);
      } else {
        const n = parseInt(p);
        if (n > 0 && n <= total) pages.push(n);
      }
    });

    for (const num of pages) {
      const [page] = await newPdf.copyPages(pdf, [num - 1]);
      newPdf.addPage(page);
    }

    const blob = new Blob([await newPdf.save()], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Imairah_Cutie_Pages.pdf";
    link.click();
    status.textContent = "✨ Done! Your split PDF is ready ❤️";
  } catch {
    status.textContent = "Oops! Check your page numbers 😅";
  }
}
