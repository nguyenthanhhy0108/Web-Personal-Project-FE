import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function classToPDF(className: string, direct: boolean) {
  const capture = document.querySelector(className);

  if (capture instanceof HTMLElement) {
    const canvas = await html2canvas(capture, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfWidth = pageWidth - 20;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const totalPages = Math.ceil(pdfHeight / pageHeight);
    const footerSpace = 20;

    for (let i = 0; i < totalPages; i++) {
      const startY = i * (pageHeight - footerSpace);
      const imgY = startY * -1;
      const imgHeight = Math.min(pageHeight - footerSpace, pdfHeight - startY);
      const scaleX = pdfWidth / canvas.width;
      const scaleY = imgHeight / canvas.height;
      const scale = Math.min(scaleX, scaleY);

      const newWidth = canvas.width * scale;
      const newHeight = canvas.height * scale;
      const x = (pageWidth - newWidth) / 2;

      doc.setFontSize(10);
      doc.addImage(imgData, 'PNG', x, imgY, newWidth, newHeight);
    }

    if (direct) {
      doc.save('receipt.pdf');
    }

    return doc.output('blob');
  } else {
    console.error(`Element not found for selector: ${className}`);
    return null;
  }
}
