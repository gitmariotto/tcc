// DADOS FICTÍCIOS DAS ONGS
const ongsFicticias = [
    {
        id: 1,
        nome: "ARBUSTO",
        cidade: "Lorena",
        causa: "Meio ambiente",
        foto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&auto=format&fit=crop&q=80",
        descricao: "Atuamos no reflorestamento de áreas urbanas e na conscientização ecológica comunitária no Vale do Paraíba.",
        endereco: "Avenida Clélio Luís, Lorena",
        email: "contato@arbusto.org",
        telefone: "(12) 98297-6786",
        redes: "@arbusto_ong"
    },
    {
        id: 2,
        nome: "UPA",
        cidade: "Lorena",
        causa: "Animais",
        foto: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&auto=format&fit=crop&q=80",
        descricao: "União Protetora dos Animais. Resgatamos, tratamos e promovemos a adoção responsável de cães e gatos em situação de rua.",
        endereco: "Rua das Flores, 120 - Lorena",
        email: "contato@upalorena.org",
        telefone: "(12) 99123-4567",
        redes: "@upa_lorena"
    },
    {
        id: 3,
        nome: "Instituto Sementes do Amanhã",
        cidade: "Guaratinguetá",
        causa: "Crianças",
        foto: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&auto=format&fit=crop&q=80",
        descricao: "Oferecemos reforço escolar, refeições diárias e oficinas culturais para crianças em situação de vulnerabilidade social.",
        endereco: "Praça da Matriz, 45 - Guaratinguetá",
        email: "contato@sementes.org",
        telefone: "(12) 98877-6655",
        redes: "@sementesdoamanha"
    },
    {
        id: 4,
        nome: "Mãos Refeitas",
        cidade: "Aparecida",
        causa: "Alimentação",
        foto: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&auto=format&fit=crop&q=80",
        descricao: "Cozinha comunitária dedicada à preparação e distribuição de marmitas saudáveis para famílias de baixa renda.",
        endereco: "Av. Getúlio Vargas, 210 - Aparecida",
        email: "ajuda@maosrefeitas.org",
        telefone: "(12) 99765-4321",
        redes: "@maosrefeitas"
    }
];

// Salva o ID da ONG e redireciona para o perfil
function verInstituicao(id) {
    localStorage.setItem('ongSelecionadaId', id);
    window.location.href = '../perfil.ong/po.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const ongsGrid = document.getElementById('ongsGrid');
    const searchInput = document.getElementById('searchInput');
    const filterChips = document.querySelectorAll('.chip');

    let causaSelecionada = 'Todas';
    let termoBusca = '';

    function renderizarONGs() {
        ongsGrid.innerHTML = '';

        const ongsFiltradas = ongsFicticias.filter(ong => {
            const atendeCausa = causaSelecionada === 'Todas' || ong.causa === causaSelecionada;
            const atendeBusca = ong.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                ong.cidade.toLowerCase().includes(termoBusca.toLowerCase());
            return atendeCausa && atendeBusca;
        });

        if (ongsFiltradas.length === 0) {
            ongsGrid.innerHTML = `
        <div class="empty-state">
          <h3 class="empty-state-title">Nenhuma instituição encontrada</h3>
          <p class="empty-state-text">Não encontramos nenhuma ONG cadastrada com os filtros selecionados.</p>
        </div>
      `;
        } else {
            ongsFiltradas.forEach(ong => {
                const cardHTML = `
          <article class="ong-card">
            <div>
              <div class="ong-card-header">
                <img src="${ong.foto}" alt="Foto da ONG ${ong.nome}" class="ong-avatar">
                <div class="ong-info-main">
                  <h3 class="ong-name">${ong.nome}</h3>
                  <span class="ong-location">📍 ${ong.cidade}</span>
                  <span class="ong-causa-badge">${ong.causa}</span>
                </div>
              </div>
              <p class="ong-description">${ong.descricao}</p>
            </div>
            <button onclick="verInstituicao(${ong.id})" class="btn-view-ong">Ver instituição</button>
          </article>
        `;
                ongsGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            termoBusca = e.target.value;
            renderizarONGs();
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            causaSelecionada = chip.getAttribute('data-causa');
            renderizarONGs();
        });
    });

    renderizarONGs();
});