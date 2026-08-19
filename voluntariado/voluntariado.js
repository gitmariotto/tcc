// BANCO DE DADOS FICTÍCIO DAS ONGS
const ongsFicticias = [
  { id: 1, nome: "ARBUSTO", cidade: "Lorena" },
  { id: 2, nome: "UPA", cidade: "Lorena" },
  { id: 3, nome: "Instituto Sementes do Amanhã", cidade: "Guaratinguetá" },
  { id: 4, nome: "Mãos Refeitas", cidade: "Aparecida" }
];

// BANCO DE DADOS FICTÍCIO DAS MISSÕES DE VOLUNTARIADO
const missoesFicticias = [
  {
    id: 1,
    ongId: 2,
    categoria: "Animais",
    titulo: "Mutirão de limpeza do abrigo",
    descricao: "Auxílio na organização do espaço, recepção de visitantes e cuidado com os animais durante o evento.",
    data: "23/08/2026",
    horario: "08:00 às 12:00",
    duracao: "4h de duração",
    local: "Lorena/SP",
    vagas: "7 vaga(s) restante(s)"
  },
  {
    id: 2,
    ongId: 4,
    categoria: "Alimentação",
    titulo: "Organização de Cestas Básicas",
    descricao: "Triagem e montagem de cestas de alimentos para distribuição a famílias cadastradas no programa comunitário.",
    data: "20/08/2026",
    horario: "09:00 às 12:00",
    duracao: "3h de duração",
    local: "Aparecida/SP",
    vagas: "3 vaga(s) restante(s)"
  },
  {
    id: 3,
    ongId: 3,
    categoria: "Educação",
    titulo: "Reforço Escolar Comunitário",
    descricao: "Acompanhamento e apoio a crianças do ensino fundamental em tarefas de matemática e leitura.",
    data: "25/08/2026",
    horario: "14:30 às 16:30",
    duracao: "2h de duração",
    local: "Guaratinguetá/SP",
    vagas: "5 vaga(s) restante(s)"
  }
];

let missaoSelecionada = null;

document.addEventListener('DOMContentLoaded', () => {
  const missoesGrid = document.getElementById('missoesGrid');
  const inputBusca = document.getElementById('inputBusca');
  const filterPills = document.querySelectorAll('.pill');
  const btnConfirmarInscricao = document.getElementById('btnConfirmarInscricao');

  let categoriaAtiva = "todas";

  function renderizarMissoes() {
    if (!missoesGrid) return;

    missoesGrid.innerHTML = '';
    const termoBusca = inputBusca ? inputBusca.value.toLowerCase().trim() : '';

    const missoesFiltradas = missoesFicticias.filter(m => {
      const ong = ongsFicticias.find(o => o.id === m.ongId) || { nome: "", cidade: "" };

      const atendeCategoria = categoriaAtiva === "todas" || m.categoria.toLowerCase() === categoriaAtiva.toLowerCase();
      const atendeBusca = m.titulo.toLowerCase().includes(termoBusca) ||
        ong.nome.toLowerCase().includes(termoBusca) ||
        m.local.toLowerCase().includes(termoBusca);

      return atendeCategoria && atendeBusca;
    });

    if (missoesFiltradas.length === 0) {
      missoesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 20px; border: 1px solid rgba(0,0,0,0.08);">
          <h3>Nenhuma missão encontrada</h3>
          <p style="font-size: 0.9rem; color: #777; margin-top: 0.5rem;">Tente buscar por outro termo ou selecione uma categoria diferente.</p>
        </div>
      `;
      return;
    }

    missoesFiltradas.forEach(m => {
      const ong = ongsFicticias.find(o => o.id === m.ongId) || { id: m.ongId, nome: "ONG", cidade: "Lorena" };

      const cardHTML = `
        <article class="missao-card">
          <div>
            <span class="missao-categoria">${m.categoria}</span>
            <h3 class="missao-titulo">${m.titulo}</h3>
            <p class="missao-ong">${ong.nome} · ${ong.cidade}</p>
            <p class="missao-descricao">${m.descricao}</p>

            <div class="missao-detalhes">
              <div class="detalhe-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${m.data} (${m.horario})</span>
              </div>

              <div class="detalhe-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${m.duracao}</span>
              </div>

              <div class="detalhe-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${m.local}</span>
              </div>

              <div class="detalhe-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 1 0 7.75"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>${m.vagas}</span>
              </div>
            </div>
          </div>

          <div class="missao-actions">
            <button class="btn-participar" onclick="abrirModalInscricao(${m.id})">Quero participar</button>
            <a href="../perfil.ong/po.html?id=${m.ongId}" class="btn-ver-ong">Ver ONG</a>
          </div>
        </article>
      `;

      missoesGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  // EVENTOS DE FILTRO
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      categoriaAtiva = pill.getAttribute('data-categoria') || 'todas';
      renderizarMissoes();
    });
  });

  // BUSCA EM TEMPO REAL
  if (inputBusca) {
    inputBusca.addEventListener('input', renderizarMissoes);
  }

  // BOTÃO CONFIRMAR NO MODAL
  if (btnConfirmarInscricao) {
    btnConfirmarInscricao.addEventListener('click', () => {
      document.getElementById('modalStepConfirm').classList.add('hidden');
      document.getElementById('modalStepSuccess').classList.remove('hidden');
    });
  }

  renderizarMissoes();
});

// ABRIR MODAL
function abrirModalInscricao(id) {
  const missao = missoesFicticias.find(m => m.id === id);
  if (!missao) return;

  const ong = ongsFicticias.find(o => o.id === missao.ongId) || { nome: "ONG", cidade: "" };
  missaoSelecionada = missao;

  // Preenche dados da Etapa 1
  document.getElementById('modalTitulo').textContent = missao.titulo;
  document.getElementById('modalOng').textContent = `${ong.nome} • ${ong.cidade}`;
  document.getElementById('modalData').textContent = missao.data;
  document.getElementById('modalHorario').textContent = missao.horario;
  document.getElementById('modalLocal').textContent = missao.local;

  // Preenche dados da Etapa 2 (Sucesso)
  document.getElementById('modalSuccessOng').textContent = ong.nome;

  // Reseta para o passo 1
  document.getElementById('modalStepConfirm').classList.remove('hidden');
  document.getElementById('modalStepSuccess').classList.add('hidden');

  // Exibe o modal
  document.getElementById('modalConfirmacao').classList.add('active');
}

// FECHAR MODAL
function fecharModal() {
  document.getElementById('modalConfirmacao').classList.remove('active');
}