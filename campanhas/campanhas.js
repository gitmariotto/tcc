// BANCO DE DADOS FICTÍCIO DAS ONGS
const ongsFicticias = [
    { id: 1, nome: "ARBUSTO", cidade: "Lorena" },
    { id: 2, nome: "UPA", cidade: "Lorena" },
    { id: 3, nome: "Instituto Sementes do Amanhã", cidade: "Guaratinguetá" },
    { id: 4, nome: "Mãos Refeitas", cidade: "Aparecida" }
];

// BANCO DE DADOS FICTÍCIO DAS CAMPANHAS
const campanhasFicticias = [
    {
        id: 101,
        ongId: 2,
        causa: "Animais",
        titulo: "Arrecadação de rações",
        descricao: "Estamos com estoque crítico para os animais resgatados no abrigo municipal.",
        itens: "Ração para cães adultos e filhotes, sachês para gatos",
        meta: "100 itens",
        prazo: "Até 24/08/2026"
    },
    {
        id: 102,
        ongId: 1,
        causa: "Meio ambiente",
        titulo: "Mudas para Reflorestamento",
        descricao: "Arrecadação de mudas nativas para plantio na margem do Rio Paraíba.",
        itens: "Mudas de ipê, capitinga e adubo orgânico",
        meta: "50 mudas",
        prazo: "Até 15/09/2026"
    },
    {
        id: 103,
        ongId: 3,
        causa: "Crianças",
        titulo: "Kits de Material Escolar",
        descricao: "Ajude nossas crianças a continuarem os estudos no próximo semestre.",
        itens: "Cadernos universitários, lápis de cor e mochilas",
        meta: "80 kits",
        prazo: "Até 30/08/2026"
    },
    {
        id: 104,
        ongId: 4,
        causa: "Alimentação",
        titulo: "Cesta Básica Comunitária",
        descricao: "Preparo de marmitas diárias para a população em vulnerabilidade.",
        itens: "Arroz, feijão, óleo e macarrão",
        meta: "200 kg de alimentos",
        prazo: "Até 10/09/2026"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const campanhasGrid = document.getElementById('campanhasGrid');
    const filterChips = document.querySelectorAll('.chip');

    let causaSelecionada = 'Todas';

    function renderizarCampanhas() {
        if (!campanhasGrid) return;

        campanhasGrid.innerHTML = '';

        const filtradas = campanhasFicticias.filter(camp => {
            if (causaSelecionada === 'Todas') return true;
            return camp.causa.toLowerCase() === causaSelecionada.toLowerCase();
        });

        if (filtradas.length === 0) {
            campanhasGrid.innerHTML = `
        <div class="empty-state">
          <h3>Nenhuma campanha encontrada</h3>
          <p>Não há campanhas abertas para esta causa no momento.</p>
        </div>
      `;
            return;
        }

        filtradas.forEach(camp => {
            const ong = ongsFicticias.find(o => o.id === camp.ongId) || { id: camp.ongId, nome: "ONG", cidade: "Lorena" };

            const cardHTML = `
        <article class="campanha-card">
          <div>
            <span class="campanha-causa-badge">${camp.causa}</span>
            <h3 class="campanha-titulo">${camp.titulo}</h3>
            <p class="campanha-ong">${ong.nome} · ${ong.cidade}</p>
            <p class="campanha-descricao">${camp.descricao}</p>
            
            <div class="itens-box">
              <strong>Itens:</strong> ${camp.itens}
            </div>

            <p class="meta-info"><strong>Meta:</strong> ${camp.meta}</p>
            <p class="prazo-info">${camp.prazo}</p>
          </div>

          <div class="card-actions">
            <button class="btn-doar" onclick="doarParaCampanha(${camp.id})">Doar</button>
            <a href="../perfil.ong/po.html?id=${camp.ongId}" class="btn-ver-ong">Ver ONG</a>
          </div>
        </article>
      `;

            campanhasGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            causaSelecionada = chip.getAttribute('data-causa') || 'Todas';
            renderizarCampanhas();
        });
    });

    renderizarCampanhas();
});

// REDIRECIONA PARA A TELA DE CADASTRO PASSANDO O ID DA CAMPANHA
function doarParaCampanha(id) {
    window.location.href = `../cadastro.campanha/cc.html?campanhaId=${id}`;
}