const data = {
  cabang: "Nama Cabang",
  alamat: "Alamat Cabang",
  nama: "Nama Murid",
  idMurid: "123456789",
  nomorInvoice: "",
  kupon: "",
  harga: 0,
  diskon: 0,
};

export function createInvoice(invoice, path, doc) {
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  // generateFooter(doc);
}

function generateHeader(doc) {
  const pageWidth = doc.page.width;
  const imageWidth = 150;
  const imageHeight = 100;
  const imageX = pageWidth - doc.page.margins.right - imageWidth;
  const imageY = doc.page.margins.top;

  doc
    .fillColor("#444444")
    .fontSize(10)
    .text("Nama Cabang.", doc.page.margins.left, 90, { align: "left" })
    .text(
      "Jl. Yos Sudarso No. 5 RT 02, Taba Jemekeh, Lubuklinggau - 31625 ",
      doc.page.margins.left,
      105,
      { align: "left" }
    )
    .image("sempoa-logo.png", imageX, imageY, {
      width: imageWidth,
      height: imageHeight,
    })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .font("Helvetica-Bold")
    .text("Nama Murid", 300, customerInformationTop)
    .font("Helvetica")
    .text("Nomor Murid", 300, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 242);
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 280;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "No Kupon", "Keterangan", "Harga");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  generateTableRow(
    doc,
    invoiceTableTop + 30,
    "121212121212",
    "Iuran Bulanan 6-2023",
    formatCurrency(50000)
  );

  generateHr(doc, invoiceTableTop + 50);

  generateTableRow(
    doc,
    invoiceTableTop + 60,
    "",
    "Diskon",
    formatCurrency(10000)
  );
  generateHr(doc, invoiceTableTop + 80);

  const totalHarga = formatCurrency(hitungTotalHarga(invoice));

  const subtotalPosition = invoiceTableTop + 90;
  generateTableRow(doc, subtotalPosition, "", "Subtotal", totalHarga);
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Catatan : Setiap Training Centre beroperasional dan memiliki kepemilikan secara mandiri",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(doc, y, item, description, unitCost) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 195, y)
    .text(unitCost, 350, y, { width: 180, align: "center" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function hitungTotalHarga(invoice) {
  let totalHarga = 0;

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    totalHarga += item.harga;
  }

  return totalHarga;
}

function formatCurrency(angka) {
  let rupiah = "";
  const angkaString = angka.toString();

  let counter = 0;
  for (let i = angkaString.length - 1; i >= 0; i--) {
    rupiah = angkaString[i] + rupiah;
    counter++;
    if (counter % 3 === 0 && i !== 0) {
      rupiah = "." + rupiah;
    }
  }

  return "Rp " + rupiah;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
