// 🧑‍💻 IT Guy Portal for Miru ❤️ — fully working download
async function splitPDF() {
  const fileInput = document.getElementById('pdfFile');
  const pagesInput = document.getElementById('pagesInput').value.trim();
  const status = document.getElementById('status');

  if (!fileInput.files.length) {
    status.textContent = 'Please upload a PDF first 📄';
    return;
  }
  if (!pagesInput) {
    status.textContent = 'Enter pages like 1-3 or 2,5 ❤️';
    return;
  }

  status.textContent = '✂️ Cutting pages... please wait';

  try {
    const file = fileInput.files[0];
    const buffer = await file.arrayBuffer();
    const src = await PDFLib.PDFDocument.load(buffer);
    const out = await PDFLib.PDFDocument.create();
    const total = src.getPageCount();

    // Parse input like "1-3,5"
    const pages = [];
    pagesInput.split(',').forEach(p => {
      p = p.trim();
      if (p.includes('-')) {
        const [a, b] = p.split('-').map(Number);
        for (let i = a; i <= b; i++) if (i >= 1 && i <= total) pages.push(i);
      } else {
        const n = parseInt(p);
        if (n >= 1 && n <= total) pages.push(n);
      }
    });
    if (!pages.length) {
      status.textContent = 'No valid pages found 😅';
      return;
    }

    // Copy pages
    for (const n of pages) {
      const [pg] = await out.copyPages(src, [n - 1]);
      out.addPage(pg);
    }

    const pdfBytes = await out.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Create a hidden <a> inside the user click scope
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Imairah_Cutie_Pages.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    status.textContent = `✅ Done! Downloading ${pages.length} page${pages.length>1?'s':''} ❤️`;
  } catch (err) {
    console.error(err);
    status.textContent = 'Something went wrong 😅';
  }
}
