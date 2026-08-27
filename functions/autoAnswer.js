const baseSelectors = [
    `[data-testid="exercise-check-answer"]`,
    `[data-testid="exercise-next-question"]`,
    `._1wi2tma4`,
    `._g9riz5o`,
    `._10goqnzn`
];

let khanwareDominates = true;

const fillDummyData = () => {
    document.querySelectorAll('input[type="text"], input[type="number"], .math-input').forEach(input => {
        input.value = "0";
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const firstRadio = document.querySelector('input[type="radio"], input[type="checkbox"], [role="radio"]');
    if (firstRadio && !firstRadio.checked) {
        firstRadio.click();
    }
};

(async () => {
    while (khanwareDominates) {
        if (features.autoAnswer) {
            fillDummyData();

            for (const selector of baseSelectors) {
                const btn = document.querySelector(selector);
                if (btn && !btn.disabled) {
                    btn.click();

                    if (document.querySelector(selector + "> div")?.innerText === "Mostrar resumo") {
                        sendToast("🎉 Exercício concluído (com falhas)!", 3000);
                        playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                    }
                }
            }
        }
        await delay((featureConfigs.autoAnswerDelay || 3) * 800);
    }
})();