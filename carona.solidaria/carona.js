const caronasIniciais = [
  {
    id: 1,
    categoria: "Animais",
    item: "3 pacote de ração",
    descricao: "Ração para cães adultos de porte médio, sacos fechados.",
    volume: "3 pacote",
    cidadeRetirada: "Lorena/SP",
    cidadeEntrega: "Lorena",
    ongNome: "UPA",
    status: "Aguardando transporte",
    doadorNome: "Nicoly Marioto",
    enderecoRetirada: "rua albano josé, 109 – Olaria — Lorena/SP",
    telefoneDoador: "Telefone não informado",
    enderecoOng: "Rua José do Cedro — Lorena",
    telefoneOng: "12982976786",
    aceita: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const caronasGrid = document.getElementById('caronasGrid');
  const modalAceitar = document.getElementById('modalAceitar');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnConfirmarCarona = document.getElementById('btnConfirmarCarona');
  const toastNotification = document.getElementById('toastNotification');

  let caronaSelecionada = null;

  function renderizarCaronas() {
    if (!caronasGrid) return;
    caronasGrid.innerHTML = '';

    caronasIniciais.forEach(carona => {
      const cardHTML = `
                <article class="carona-card">
                    <div class="card-content">
                        <div class="card-header-row">
                            <span class="categoria-tag">${carona.categoria}</span>
                            <span class="status-badge">${carona.status}</span>
                        </div>

                        <h3 class="item-titulo">${carona.item}</h3>
                        <p class="item-descricao">${carona.descricao}</p>
                        <p class="volume-info"><strong>Volume:</strong> ${carona.volume}</p>

                        <div class="locais-box">
                            <div class="local-item">
                                <svg class="local-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>Retirada em ${carona.cidadeRetirada}</span>
                            </div>

                            <div class="local-item">
                                <svg class="local-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                                <span>Entrega: <span class="ong-link">${carona.ongNome}</span> — ${carona.cidadeEntrega}</span>
                            </div>
                        </div>

                        <p class="aviso-endereco">
                            O endereço completo e o contato do doador são liberados só para quem aceitar a entrega.
                        </p>
                    </div>

                    ${carona.aceita ? `
                        <button class="btn-ver-dados" onclick="abrirModalAceitar(${carona.id})">
                            Ver dados da retirada
                        </button>
                    ` : `
                        <button class="btn-aceitar" onclick="abrirModalAceitar(${carona.id})">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                            Aceitar entrega
                        </button>
                    `}
                </article>
            `;

      caronasGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  window.abrirModalAceitar = function (id) {
    caronaSelecionada = caronasIniciais.find(c => c.id === id);
    if (!caronaSelecionada) return;

    document.getElementById('modalItemNome').textContent = caronaSelecionada.item;
    document.getElementById('modalDoadorNome').textContent = caronaSelecionada.doadorNome;
    document.getElementById('modalTelefoneDoador').textContent = caronaSelecionada.telefoneDoador;
    document.getElementById('modalEnderecoRetirada').textContent = caronaSelecionada.enderecoRetirada;
    document.getElementById('modalVolume').textContent = caronaSelecionada.volume;

    document.getElementById('modalOngNome').textContent = caronaSelecionada.ongNome;
    document.getElementById('modalEnderecoOng').textContent = caronaSelecionada.enderecoOng;
    document.getElementById('modalTelefoneOng').textContent = caronaSelecionada.telefoneOng;

    modalAceitar.classList.add('active');
  };

  btnCloseModal.addEventListener('click', () => modalAceitar.classList.remove('active'));

  modalAceitar.addEventListener('click', (e) => {
    if (e.target === modalAceitar) modalAceitar.classList.remove('active');
  });

  btnConfirmarCarona.addEventListener('click', () => {
    if (!caronaSelecionada) return;

    caronaSelecionada.aceita = true;
    modalAceitar.classList.remove('active');

    renderizarCaronas();

    // Exibe o aviso no rodapé (Toast)
    toastNotification.classList.add('active');
    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 4000);
  });

  renderizarCaronas();
});