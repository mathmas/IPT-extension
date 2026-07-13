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

    if (targetField.dataset.autoFilled === "true") {
        return;
    }

    const sourceElement = document.querySelector(SUPPLIER_SELECTOR);

    if (!sourceElement || sourceElement.innerText.trim() === "") {
        console.log("[AutoFiller] Target is empty, but source data was not found on this page.");
        return; 
    }

    const supplierName = sourceElement.innerText.trim().replace(/\s+/g, ' ');
    if (supplierName.includes(":")) {
        const parts = supplierName.split(":");
        parts.shift();
        supplierName = parts.join(":").trim(); 
    }

    if (IGNORED_VALUES.includes(supplierName.toUpperCase())) {
        console.log(`[AutoFiller] Found source text "${supplierName}", but it is ignored.`);
        return;
    }

    const currentValue = targetField.value.trim();
    let newValue = "";

    if (currentValue.toUpperCase().includes(supplierName.toUpperCase())) {
        console.log(`[AutoFiller] Le fournisseur "${supplierName}" est déjà présent dans le champ.`);
        targetField.dataset.autoFilled = "true";
        return; 
    }

    if (currentValue === "") {
        newValue = `${supplierName} - FACT`;
    } else {
        newValue = `${supplierName} - ${currentValue}`;
    }

    targetField.value = newValue;
    targetField.dataset.autoFilled = "true";

    targetField.dispatchEvent(new Event('input', { bubbles: true }));
    targetField.dispatchEvent(new Event('change', { bubbles: true }));
    
    console.log(`[AutoFiller] Successfully filled empty field: #${TARGET_ID}`);
}

setInterval(checkAndFillField, CHECK_INTERVAL_MS);