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

    if (targetField.value.trim() === "") {
        
        const sourceElement = document.querySelector(SUPPLIER_SELECTOR);

        if (!sourceElement || sourceElement.innerText.trim() === "") {
            console.log("[AutoFiller] Target is empty, but source data was not found on this page.");
            return; 
        }

        const textToCopy = sourceElement.innerText.trim().replace(/\s+/g, ' ');

        if (IGNORED_VALUES.includes(textToCopy.toUpperCase())) {
            console.log(`[AutoFiller] Found source text "${textToCopy}", but it is ignored.`);
            return;
        }

        targetField.value = textToCopy;
        
        targetField.dispatchEvent(new Event('input', { bubbles: true }));
        targetField.dispatchEvent(new Event('change', { bubbles: true }));
        
        console.log(`[AutoFiller] Successfully filled empty field: #${TARGET_ID}`);
    }
}

setInterval(checkAndFillField, CHECK_INTERVAL_MS);