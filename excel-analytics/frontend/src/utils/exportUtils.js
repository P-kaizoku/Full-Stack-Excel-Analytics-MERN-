import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export async function exportToPNG(elementId) {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  canvas.toBlob((blob) => saveAs(blob, "chart.png"));
}

export async function exportToPDF(elementId) {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 10, 10);
  pdf.save("chart.pdf");
}
