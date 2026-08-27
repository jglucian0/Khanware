const baseSelectors = [
    `[data-testid="exercise-check-answer"]`,
    `[data-testid="exercise-next-question"]`,
    `._1wi2tma4`,
    `._g9riz5o`,
    `._10goqnzn`
];

let khanwareDominates = true;

// Bypass na proteção do React 16+ para inputs convencionais
const dispatchReactEvent = (element, value) => {
    const prototype = Object.getPrototypeOf(element);
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set
        || Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

    if (setter) setter.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
};

// Engana a engine do MathQuill simulando a digitação humana
const simulateMathQuill = (textarea, key) => {
    textarea.focus();
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: key, bubbles: true, cancelable: true }));
    textarea.dispatchEvent(new KeyboardEvent('keypress', { key: key, bubbles: true, cancelable: true }));
    textarea.value = key;
    textarea.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    textarea.dispatchEvent(new KeyboardEvent('keyup', { key: key, bubbles: true, cancelable: true }));
};

const fillDummyData = () => {
    // 1. Inputs Matemáticos (MathQuill)
    document.querySelectorAll('.mq-textarea textarea').forEach(ta => {
        simulateMathQuill(ta, "0");
    });

    // 2. Inputs Textuais e Numéricos Genéricos
    document.querySelectorAll('input[type="text"]:not([class*="mq"]), input[type="number"]').forEach(input => {
        dispatchReactEvent(input, "0");
    });

    // 3. Múltipla Escolha
    const firstRadio = document.querySelector('input[type="radio"], input[type="checkbox"], [role="radio"]');
    if (firstRadio && !firstRadio.checked) firstRadio.click();
};

(async () => {
    while (khanwareDominates) {
        if (features.autoAnswer) {
            fillDummyData();

            // Aguarda o ciclo de renderização do React habilitar o botão
            await delay(150);

            for (const selector of baseSelectors) {
                const btn = document.querySelector(selector);
                if (btn && !btn.disabled) {
                    btn.click();

                    const btnText = document.querySelector(selector + "> div")?.innerText;
                    if (btnText === "Mostrar resumo" || btnText === "Show summary") {
                        sendToast("🎉 Submissão forçada concluída!", 3000);
                        playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                    }
                }
            }
        }
        await delay((featureConfigs.autoAnswerDelay || 3) * 800);
    }
})();