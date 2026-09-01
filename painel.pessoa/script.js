document.addEventListener('DOMContentLoaded', () => {
    // 1. Troca de Abas
    const menuPills = document.querySelectorAll('.menu-pill');
    const tabPanes = document.querySelectorAll('.tab-pane');

    menuPills.forEach(pill => {
        pill.addEventListener('click', () => {
            menuPills.forEach(p => p.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            pill.classList.add('active');
            const targetTab = pill.getAttribute('data-tab');
            const activePane = document.getElementById(targetTab);
            if (activePane) activePane.classList.add('active');
        });
    });

    // 2. Renderização de dados dinâmicos do Usuário
    carregarMinhasDoacoes();
    carregarMinhasCaronas();
    carregarMeusVoluntariados();
});

// Funções para carregar e listar os itens cadastrados

function carregarMinhasDoacoes() {
    const container = document.querySelector('#minhas-doacoes .card-box');
    const doacoes = JSON.parse(localStorage.getItem('minhasDoacoes')) || [];

    if (doacoes.length === 0) return; // Mantém o estado vazio padrão

    let html = `
        <h2 class="card-title">Minhas Doações</h2>
        <p class="card-email">Histórico de itens e contribuições efetuadas por você.</p>
        <div class="list-items">
    `;

    doacoes.forEach(item => {
        html += `
            <div class="item-card">
                <h3>${item.titulo || item.item}</h3>
                <p><strong>Categoria:</strong> ${item.categoria || 'Geral'}</p>
                <p><strong>Status:</strong> <span class="badge">${item.status || 'Pendente'}</span></p>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function carregarMinhasCaronas() {
    const container = document.querySelector('#minhas-caronas .card-box');
    const caronas = JSON.parse(localStorage.getItem('minhasCaronas')) || [];

    if (caronas.length === 0) return;

    let html = `
        <h2 class="card-title">Minhas Caronas Solidárias</h2>
        <p class="card-email">Caronas que você ofereceu ou solicitou para entregas.</p>
        <div class="list-items">
    `;

    caronas.forEach(item => {
        html += `
            <div class="item-card">
                <h3>${item.origem} ➔ ${item.destino}</h3>
                <p><strong>Data/Hora:</strong> ${item.dataHora || 'A combinar'}</p>
                <p><strong>Vagas/Capacidade:</strong> ${item.vagas || '1'}</p>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function carregarMeusVoluntariados() {
    const container = document.querySelector('#meus-voluntariados .card-box');
    const voluntariados = JSON.parse(localStorage.getItem('meusVoluntariados')) || [];

    if (voluntariados.length === 0) return;

    let html = `
        <h2 class="card-title">Meus Voluntariados</h2>
        <p class="card-email">Ações e eventos em que você se inscreveu para participar.</p>
        <div class="list-items">
    `;

    voluntariados.forEach(item => {
        html += `
            <div class="item-card">
                <h3>${item.tituloAcao || item.nomeOng}</h3>
                <p><strong>Função:</strong> ${item.funcao || 'Voluntário'}</p>
                <p><strong>Data:</strong> ${item.data || 'A definir'}</p>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}