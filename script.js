// Aguarda que o DOM esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    
    // Inicializa os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- LÓGICA DO FILTRO DE TECNOLOGIAS ---
    const btnAll = document.getElementById('btn-all');
    const btnConservacao = document.getElementById('btn-conservacao');
    const btnMonitoramento = document.getElementById('btn-monitoramento');

    if (btnAll && btnConservacao && btnMonitoramento) {
        btnAll.addEventListener('click', () => filterTech('all'));
        btnConservacao.addEventListener('click', () => filterTech('conservacao'));
        btnMonitoramento.addEventListener('click', () => filterTech('monitoramento'));
    }

    function filterTech(category) {
        const cards = document.querySelectorAll('.tech-card');
        const buttons = ['all', 'conservacao', 'monitoramento'];
        
        // Gere os estados visuais ativos/inativos dos botões de filtro
        buttons.forEach(btn => {
            const element = document.getElementById(`btn-${btn}`);
            if (element) {
                if (btn === category) {
                    element.className = "px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white shadow-sm transition-colors";
                } else {
                    element.className = "px-4 py-2 text-sm font-medium rounded-lg bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors";
                }
            }
        });

        // Mostra ou esconde os cartões com base na categoria selecionada
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- LÓGICA DO SIMULADOR DE SHELF-LIFE ---
    const checkCoating = document.getElementById('check-coating');
    const checkEthylene = document.getElementById('check-ethylene');
    const checkIot = document.getElementById('check-iot');

    if (checkCoating && checkEthylene && checkIot) {
        checkCoating.addEventListener('change', calculateShelfLife);
        checkEthylene.addEventListener('change', calculateShelfLife);
        checkIot.addEventListener('change', calculateShelfLife);
    }

    function calculateShelfLife() {
        let baseDays = 7;
        const coating = checkCoating.checked;
        const ethylene = checkEthylene.checked;
        const iot = checkIot.checked;

        // Soma os dias adicionais conforme as tecnologias ativadas
        if (coating) baseDays += 3;
        if (ethylene) baseDays += 4;
        if (iot) baseDays += 5;

        // Atualiza os valores mostrados no ecrã
        const resultElement = document.getElementById('days-result');
        const msgElement = document.getElementById('status-message');

        if (resultElement && msgElement) {
            resultElement.innerText = `${baseDays} dias`;

            // Atualiza a mensagem de feedback contextual
            if (baseDays === 7) {
                msgElement.innerText = "Condições logísticas padrão de mercado.";
                msgElement.className = "text-xs text-slate-400";
            } else if (baseDays < 15) {
                msgElement.innerText = "Melhoria significativa na conservação!";
                msgElement.className = "text-xs text-teal-400";
            } else {
                msgElement.innerText = "Máxima eficiência logística atingida! Desperdício minimizado ao extremo.";
                msgElement.className = "text-xs text-emerald-400 font-medium";
            }
        }
    }
});s