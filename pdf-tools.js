// 🧑‍💻 IT Guy Portal for Miru ❤️ (Instant-Download Fixed)
async function splitPDF() {
  const fileInput = document.getElementById('pdfFile');
  const pagesInput = document.getElementById('pagesInput').value.trim();
  const status = document.getElementById('status');

  // 🛑 Validate input
  if (!fileInput.files.length) return status.textContent = 'Please upload a PDF first 📄';
  if (!pagesInput) return status.textContent = 'Enter pages like 1-3 or 2,5 ❤️';

  try {
    // 🧾 Read uploaded PDF
    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdf = await PDFLib.PDFDocument.create();
    const totalPages = pdfDoc.getPageCount();

    // 🔢 Parse user input (supports 1-3,5,7-9)
    const pages = [];
    pagesInput.split(',').forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) if (i > 0 && i <= totalPages) pages.push(i);
      } else {
        const num = parseInt(part);
        if (!isNaN(num) && num > 0 && num <= totalPages) pages.push(num);
      }
    });

    if (!pages.length) return status.textContent = 'No valid pages found 😅';

    // 📄 Copy selected pages into new PDF
    for (const num of pages) {
      const [page] = await newPdf.copyPages(pdfDoc, [num - 1]);
      newPdf.addPage(page);
    }

    // 💾 Create downloadable blob
    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // 📥 Force instant download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Imairah_Cutie_Pages.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 🧹 Cleanup + message
    URL.revokeObjectURL(url);
    status.textContent = `✨ Done! Downloading your file (${pages.length} page${pages.length>1?'s':''}) ❤️`;
  } catch (error) {
    console.error(error);
    status.textContent = 'Something went wrong 😅 (check your page numbers)';
  }
}
