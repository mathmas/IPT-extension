const TARGET_ID = "id_label";
const CHECK_INTERVAL_MS = 500;
const SUPPLIER_SELECTOR = "#ProviderSelectSection .item"

const IGNORED_VALUES = [
    "FOURNISSEURS DIVERS"
];

function checkAndFillField() {
    const targetField = document.getElementById(TARGET_ID);
    
    if (!targetField) {
        return;
    }

    if (document.activeElement === targetField) {
        return;
    }

    const sourceElement = document.querySelector(SUPPLIER_SELECTOR);

    if (!sourceElement || sourceElement.innerText.trim() === "") {
        return; 
    }

    let supplierName = sourceElement.innerText.trim().replace(/\s+/g, ' ');

    if (supplierName.includes(":")) {
        const parts = supplierName.split(":");
        parts.shift();
        supplierName = parts.join(":").trim(); 
    }

    if (IGNORED_VALUES.includes(supplierName.toUpperCase())) {
        return;
    }

    const currentValue = targetField.value.trim();

    if (currentValue.toUpperCase().includes(supplierName.toUpperCase())) {
        return; 
    }

    let newValue = "";

    if (currentValue === "") {
        newValue = `${supplierName} - FACT`;
    } else {
        newValue = `${supplierName} - ${currentValue}`;
    }

    targetField.value = newValue;

    targetField.dispatchEvent(new Event('input', { bubbles: true }));
    targetField.dispatchEvent(new Event('change', { bubbles: true }));
    
    targetField.style.transition = "border-left 0.2s ease";
    targetField.style.borderLeft = "6px solid #2ecc71";

    setTimeout(() => {
        targetField.style.borderLeft = "";
    }, 1000);

    console.log(`[AutoFiller] Successfully filled empty field: #${TARGET_ID}`);
}

setInterval(checkAndFillField, CHECK_INTERVAL_MS);