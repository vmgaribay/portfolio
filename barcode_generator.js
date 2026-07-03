//Barcode Generator
function barcodeGenerator() {
  const input = document.getElementById("codeInput");
    if (!input) return;

  const select = document.getElementById("barcodeType");
  const status = document.getElementById("barcode-status");
  const barcodeSvg = document.getElementById("barcode");
  const form = document.querySelector("form");


  function setStatus(message, isError = false) {
    status.textContent = message;
    status.style.color = isError ? "#ef3838ff" : "inherit";
  }


  function generateBarcode() {
    const code = input.value.trim();
    const type = select.value;
    
    if (!code) {
      document.getElementById("barcode").innerHTML = "";
      setStatus("Enter a value in the box above to generate a barcode. Default type is UPC.", false);

      return;
    }
    
    try {
      JsBarcode("#barcode", code, {
        format: type,
        width: 3,
        height: 100,
        displayValue: true
      });
    setStatus(``, false);
    } catch (error) {
      barcodeSvg.innerHTML = "";
      setStatus(`Invalid input for ${type}: ${error.message}`, true);
    }
  }

    form?.addEventListener("submit", (event) => {
    event.preventDefault();
    generateBarcode();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      generateBarcode();
    }
  });


  input.addEventListener("input", generateBarcode);
  select.addEventListener("change", generateBarcode);
  

    input.value = "";
    generateBarcode();
}
window.addEventListener("DOMContentLoaded", barcodeGenerator);
