const baseSelectors = [
    `[data-testid="exercise-check-answer"]`,
    `[data-testid="exercise-next-question"]`,
    `._1wi2tma4`,
    `._g9riz5o`,
    `._10goqnzn`
];

let khanwareDominates = true;

const fillDummyData = () => {
    // 1. MathQuill e Inputs Genéricos via API nativa do navegador
    const textInputs = document.querySelectorAll('.mq-textarea textarea, input[type="text"]:not([class*="mq"]), input[type="number"]');

    textInputs.forEach(input => {
        // Evita re-inserções desnecessárias que gerariam loops de eventos
        if (!input.value) {
            input.focus();
            // O execCommand injeta o texto gerando o InputEvent nativo perfeito
            document.execCommand('insertText', false, '0');
        }
    });

    // 2. Múltipla Escolha
    console.log("testee")
    const firstRadio = document.querySelector('input[type="radio"], input[type="checkbox"], [role="radio"]');
    if (firstRadio && !firstRadio.checked) {
        firstRadio.click();
    }
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