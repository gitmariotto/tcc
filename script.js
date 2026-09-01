document.addEventListener('DOMContentLoaded', () => {
    const createActionBtn = document.getElementById('createActionBtn');
    const campaignsContainer = document.getElementById('campaignsContainer');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const chipBtns = document.querySelectorAll('.chip-btn');

    let currentCategory = 'Todos';
    let currentSearchTerm = '';

    // Lógica do botão Criar Ação
    if (createActionBtn) {
        createActionBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (isLoggedIn) {
                window.location.href = './criar-acao/selecionar.html';
            } else {
                window.location.href = './login/login.html';
            }
        });
    }

    // Função para carregar as campanhas do localStorage
    function getCampaigns() {
        const stored = localStorage.getItem('campanhas');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Erro ao ler campanhas do localStorage:', e);
            }
        }
        return [];
    }

    // Renderiza as campanhas na tela
    function renderCampaigns() {
        if (!campaignsContainer) return;

        const allCampaigns = getCampaigns();

        // Filtro por categoria e busca por palavra-chave
        const filtered = allCampaigns.filter(item => {
            const matchesCategory = currentCategory === 'Todos' ||
                (item.categoria && item.categoria.toLowerCase() === currentCategory.toLowerCase());

            const term = currentSearchTerm.toLowerCase();
            const matchesSearch = !term ||
                (item.titulo && item.titulo.toLowerCase().includes(term)) ||
                (item.descricao && item.descricao.toLowerCase().includes(term)) ||
                (item.ong && item.ong.toLowerCase().includes(term)) ||
                (item.item && item.item.toLowerCase().includes(term));

            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            campaignsContainer.innerHTML = `
                <div class="empty-campaigns">
                    <p>Nenhuma campanha encontrada no momento.</p>
                </div>
            `;
            return;
        }

        campaignsContainer.innerHTML = filtered.map(campanha => {
            const imagem = campanha.imagem || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=600&auto=format&fit=crop&q=80';
            const categoria = campanha.categoria || 'Geral';
            const titulo = campanha.titulo || 'Campanha sem título';
            const descricao = campanha.descricao || 'Sem descrição informada.';
            const ong = campanha.ong ? `<span class="campaign-ong">Por ${campanha.ong}</span>` : '';

            return `
                <article class="campaign-card">
                    <div class="campaign-image-wrapper">
                        <img src="${imagem}" alt="${titulo}" class="campaign-image">
                        <span class="campaign-badge">${categoria}</span>
                    </div>
                    <div class="campaign-content">
                        ${ong}
                        <h3 class="campaign-title">${titulo}</h3>
                        <p class="campaign-description">${descricao}</p>
                        <a href="campanhas/campanhas.html?id=${campanha.id || ''}" class="btn-campaign">Ajudar agora</a>
                    </div>
                </article>
            `;
        }).join('');
    }

    // Eventos de filtro por Chip
    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chipBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category') || 'Todos';
            renderCampaigns();
        });
    });

    // Evento de busca no formulário
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            currentSearchTerm = searchInput ? searchInput.value.trim() : '';
            renderCampaigns();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentSearchTerm = searchInput.value.trim();
            renderCampaigns();
        });
    }

    // Executa a renderização ao carregar
    renderCampaigns();
});