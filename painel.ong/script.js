// DADOS FICTÍCIOS PADRÃO (Usados apenas se o localStorage estiver vazio na primeira execução)
const dadosIniciaisVoluntariados = [
    {
        id: 201,
        titulo: "Feira de Adoção e Cuidados",
        data: "15/07/2026, 14:23",
        duracao: "4h",
        vagasTotal: 8,
        inscritos: ["Maria Silva"], // Guarda a lista/nome de quem se inscreveu
        descricao: "Ajuda na organização do espaço e suporte aos animais durante a feira de doação.",
        ongNome: "União Protetora dos Animais",
        ongSigla: "UPA"
    }
];

// Inicializa ou recupera os voluntariados do localStorage
function obterVoluntariadosSalvos() {
    const salvos = localStorage.getItem('siteVoluntariadosData');
    if (!salvos) {
        localStorage.setItem('siteVoluntariadosData', JSON.stringify(dadosIniciaisVoluntariados));
        return dadosIniciaisVoluntariados;
    }
    return JSON.parse(salvos);
}

// Salva voluntariados de volta no localStorage
function salvarVoluntariados(lista) {
    localStorage.setItem('siteVoluntariadosData', JSON.stringify(lista));
}

const ongDados = {
    nomeCompleto: "União Protetora dos Animais",
    sigla: "UPA",
    descricao: "Acompanhe suas campanhas, voluntariados, doações a caminho e confirme os recebimentos.",
    estatisticas: {
        campanhasCriadas: 1,
        aguardandoTransporte: 0,
        entregasConcluidas: 4
    },
    campanhas: [
        {
            id: 101,
            titulo: "Campanha Ração para Cães Resgatados",
            categoria: "Alimentação",
            descricao: "Arrecadação de ração para os cães resgatados da abrigo.",
            itens: "Ração seca para cães adultos e filhotes",
            dataLimite: "",
            metaVal: "100",
            meta: "100 itens",
            status: "Ativa"
        }
    ],
    doacoes: [
        { id: 301, item: "3 pacote de ração", status: "Em transporte", observacao: "vegergregeg" },
        { id: 302, item: "3 pacote de ração", status: "Entregue", observacao: "ewherhhhwe" },
        { id: 303, item: "ração", status: "Entregue", observacao: "hegwhbshs" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    // 1. CARREGAR IDENTIFICAÇÃO E DADOS DA ONG
    const dadosSalvos = JSON.parse(localStorage.getItem('ongPerfilData'));
    const nomeExibicao = dadosSalvos && dadosSalvos.nome ? dadosSalvos.nome : ongDados.nomeCompleto;
    const siglaExibicao = ongDados.sigla;

    const elSidebarName = document.getElementById('sidebarOngName');
    const elMainName = document.getElementById('mainOngName');

    if (elSidebarName) elSidebarName.textContent = siglaExibicao;
    if (elMainName) elMainName.textContent = `${nomeExibicao} (${siglaExibicao})`;

    // Preenche Estatísticas
    const listaVoluntariados = obterVoluntariadosSalvos();
    if (document.getElementById('statCampanhas')) document.getElementById('statCampanhas').textContent = ongDados.campanhas.length;
    if (document.getElementById('statVoluntariados')) document.getElementById('statVoluntariados').textContent = listaVoluntariados.length;
    if (document.getElementById('statTransporte')) document.getElementById('statTransporte').textContent = ongDados.estatisticas.aguardandoTransporte;
    if (document.getElementById('statConcluidas')) document.getElementById('statConcluidas').textContent = ongDados.estatisticas.entregasConcluidas;

    atualizarBadges();

    // 2. RENDERIZAÇÃO DE CONTEÚDO
    renderizarCampanhas();
    renderizarVoluntariados();
    renderizarDoacoes();

    // 3. GERENCIADOR DE ABAS DA SIDEBAR
    const navButtons = document.querySelectorAll('.sidebar-nav .nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            const activeTab = document.getElementById(targetTab);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });

    // 4. CONTROLE DO MODAL DE NOVO VOLUNTARIADO
    const modalVoluntariado = document.getElementById('modalVoluntariado');
    const btnsAbrirVoluntariado = document.querySelectorAll('.btn-abrir-voluntariado');
    const btnCloseModalVoluntariado = document.getElementById('btnCloseModal');
    const formVoluntariado = document.getElementById('formNovoVoluntariado');

    btnsAbrirVoluntariado.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalVoluntariado) modalVoluntariado.classList.add('active');
        });
    });

    if (btnCloseModalVoluntariado) {
        btnCloseModalVoluntariado.addEventListener('click', () => {
            if (modalVoluntariado) modalVoluntariado.classList.remove('active');
        });
    }

    // 5. CONTROLE DO MODAL DE NOVA CAMPANHA (ADICIONADO)
    const modalCampanha = document.getElementById('modalCampanha');
    const btnsAbrirCampanha = document.querySelectorAll('.btn-abrir-campanha');
    const btnCloseModalCampanha = document.getElementById('btnCloseModalCampanha');
    const formCampanha = document.getElementById('formNovaCampanha');

    btnsAbrirCampanha.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalCampanha) modalCampanha.classList.add('active');
        });
    });

    if (btnCloseModalCampanha) {
        btnCloseModalCampanha.addEventListener('click', () => {
            if (modalCampanha) modalCampanha.classList.remove('active');
        });
    }

    // FECHAR MODAIS CLICANDO NO FUNDO ESCURO
    window.addEventListener('click', (e) => {
        if (modalVoluntariado && e.target === modalVoluntariado) {
            modalVoluntariado.classList.remove('active');
        }
        if (modalCampanha && e.target === modalCampanha) {
            modalCampanha.classList.remove('active');
        }
    });

    // 6. PUBLICAR NOVO VOLUNTARIADO
    if (formVoluntariado) {
        formVoluntariado.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(formVoluntariado);
            
            const dataInput = formData.get('dataHora');
            let dataFormatada = "Data a definir";
            if (dataInput) {
                const d = new Date(dataInput);
                dataFormatada = d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
            }

            const novoVoluntariado = {
                id: Date.now(),
                titulo: formData.get('titulo'),
                data: dataFormatada,
                duracao: formData.get('duracao') ? `${formData.get('duracao')}h` : "N/I",
                vagasTotal: parseInt(formData.get('vagas')) || 0,
                inscritos: [], 
                descricao: formData.get('descricao') || '',
                ongNome: nomeExibicao,
                ongSigla: siglaExibicao
            };

            const listaAtual = obterVoluntariadosSalvos();
            listaAtual.push(novoVoluntariado);
            salvarVoluntariados(listaAtual);

            renderizarVoluntariados();
            atualizarBadges();

            if (document.getElementById('statVoluntariados')) {
                document.getElementById('statVoluntariados').textContent = listaAtual.length;
            }

            alert('Voluntariado publicado com sucesso em todas as páginas do site!');
            if (modalVoluntariado) modalVoluntariado.classList.remove('active');
            formVoluntariado.reset();
        });
    }

    // 7. PUBLICAR NOVA CAMPANHA (ADICIONADO)
    if (formCampanha) {
        formCampanha.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(formCampanha);
            const metaVal = formData.get('meta') || '100';

            const novaCampanha = {
                id: Date.now(),
                titulo: formData.get('titulo'),
                categoria: formData.get('categoria'),
                descricao: formData.get('descricao'),
                itens: formData.get('itens') || 'Itens diversos',
                dataLimite: '',
                metaVal: metaVal,
                meta: `${metaVal} itens`,
                status: 'Ativa'
            };

            ongDados.campanhas.push(novaCampanha);
            renderizarCampanhas();
            atualizarBadges();

            alert('Campanha criada com sucesso!');
            if (modalCampanha) modalCampanha.classList.remove('active');
            formCampanha.reset();
        });
    }

    // 8. REDIRECIONAMENTOS DE NAVEGAÇÃO
    const btnEditarPerfil = document.querySelector('.btn-editar-perfil-publico');
    const btnVerPagina = document.querySelector('.btn-ver-pagina-publica');

    if (btnEditarPerfil) {
        btnEditarPerfil.addEventListener('click', () => {
            window.location.href = 'editar-perfil-ong/index.html';
        });
    }

    if (btnVerPagina) {
        btnVerPagina.addEventListener('click', () => {
            window.location.href = '../pagina.ong/index.html';
        });
    }

});

// ==========================================================
// FUNÇÕES AUXILIARES DE RENDERIZAÇÃO E GERENCIAMENTO
// ==========================================================

function atualizarBadges() {
    const listaVol = obterVoluntariadosSalvos();
    if (document.getElementById('badgeCampanhas')) document.getElementById('badgeCampanhas').textContent = ongDados.campanhas.length;
    if (document.getElementById('badgeVoluntariado')) document.getElementById('badgeVoluntariado').textContent = listaVol.length;
    if (document.getElementById('statCampanhas')) document.getElementById('statCampanhas').textContent = ongDados.campanhas.length;
}

function renderizarCampanhas() {
    const campanhasContainer = document.getElementById('campanhasContainer');
    if (!campanhasContainer) return;

    if (ongDados.campanhas.length === 0) {
        campanhasContainer.innerHTML = '<p style="color:#777;">Nenhuma campanha criada ainda.</p>';
        return;
    }

    campanhasContainer.innerHTML = ongDados.campanhas.map(c => `
        <div class="card-campanha-painel" id="campanha-card-${c.id}">
            <div class="campanha-header-info">
                <div class="campanha-title-badge">
                    <h3 class="campanha-titulo">${c.titulo}</h3>
                    <span class="badge-status ${c.status.toLowerCase()}">${c.status}</span>
                </div>
                <p class="campanha-desc">${c.descricao || ''}</p>
                <div class="campanha-meta-info">
                    <p><strong>Itens:</strong> ${c.itens || 'Não especificado'}</p>
                    <p><strong>Meta:</strong> ${c.meta || 'Sem meta'}</p>
                </div>

                <div class="campanha-actions-top">
                    <button type="button" class="btn-editar-campanha" onclick="toggleEditarCampanha(${c.id})">
                        Editar campanha
                    </button>
                </div>
            </div>

            <div id="edit-box-${c.id}" class="box-editar-campanha" style="display: none;">
                <div class="edit-top-buttons">
                    <button type="button" class="btn-cancelar-edit" onclick="toggleEditarCampanha(${c.id})">Cancelar edição</button>
                    <button type="button" class="btn-pausar-edit" onclick="pausarCampanha(${c.id})">${c.status === 'Pausada' ? 'Reativar' : 'Pausar'}</button>
                    <button type="button" class="btn-excluir-edit" onclick="excluirCampanha(${c.id})">Excluir</button>
                </div>

                <form class="form-editar-campanha" onsubmit="salvarEdicaoCampanha(event, ${c.id})">
                    <h3 class="edit-form-title">Editar campanha</h3>

                    <div class="form-row-2">
                        <div class="form-group">
                            <label>Nome da campanha</label>
                            <input type="text" id="edit-nome-${c.id}" value="${c.titulo}" required>
                        </div>
                        <div class="form-group">
                            <label>Categoria (causa)</label>
                            <select id="edit-categoria-${c.id}">
                                <option value="Alimentação" ${c.categoria === 'Alimentação' ? 'selected' : ''}>Alimentação</option>
                                <option value="Saúde" ${c.categoria === 'Saúde' ? 'selected' : ''}>Saúde</option>
                                <option value="Abrigo" ${c.categoria === 'Abrigo' ? 'selected' : ''}>Abrigo</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea id="edit-desc-${c.id}" rows="3">${c.descricao || ''}</textarea>
                    </div>

                    <div class="form-row-2">
                        <div class="form-group">
                            <label>Itens necessários</label>
                            <input type="text" id="edit-itens-${c.id}" value="${c.itens || ''}">
                        </div>
                        <div class="form-group">
                            <label>Data limite (opcional)</label>
                            <input type="date" id="edit-data-${c.id}" value="${c.dataLimite || ''}">
                        </div>
                    </div>

                    <div class="box-meta-check">
                        <label class="checkbox-container">
                            <input type="checkbox" id="edit-has-meta-${c.id}" ${c.meta !== 'Sem meta' ? 'checked' : ''}>
                            <span>Esta campanha tem uma meta de quantidade de itens</span>
                        </label>
                        <div class="form-group margin-top-sm">
                            <label>Meta (quantidade de itens)</label>
                            <input type="text" id="edit-meta-${c.id}" value="${c.metaVal || '100'}">
                        </div>
                    </div>

                    <div class="form-actions-bottom">
                        <button type="submit" class="btn-salvar-alteracoes">Salvar alterações</button>
                    </div>
                </form>
            </div>
        </div>
    `).join('');
}

function toggleEditarCampanha(id) {
    const editBox = document.getElementById(`edit-box-${id}`);
    if (editBox) {
        const estaVisivel = editBox.style.display === 'block';
        editBox.style.display = estaVisivel ? 'none' : 'block';
    }
}

function salvarEdicaoCampanha(e, id) {
    e.preventDefault();
    const campanha = ongDados.campanhas.find(c => c.id === id);
    if (!campanha) return;

    campanha.titulo = document.getElementById(`edit-nome-${id}`).value;
    campanha.categoria = document.getElementById(`edit-categoria-${id}`).value;
    campanha.descricao = document.getElementById(`edit-desc-${id}`).value;
    campanha.itens = document.getElementById(`edit-itens-${id}`).value;
    campanha.dataLimite = document.getElementById(`edit-data-${id}`).value;
    
    const hasMeta = document.getElementById(`edit-has-meta-${id}`).checked;
    const metaVal = document.getElementById(`edit-meta-${id}`).value;
    campanha.metaVal = metaVal;
    campanha.meta = hasMeta ? `${metaVal} itens` : 'Sem meta';

    renderizarCampanhas();
}

function pausarCampanha(id) {
    const campanha = ongDados.campanhas.find(c => c.id === id);
    if (campanha) {
        campanha.status = campanha.status === 'Pausada' ? 'Ativa' : 'Pausada';
        renderizarCampanhas();
    }
}

function excluirCampanha(id) {
    if (confirm("Tem certeza que deseja excluir esta campanha?")) {
        ongDados.campanhas = ongDados.campanhas.filter(c => c.id !== id);
        renderizarCampanhas();
        atualizarBadges();
    }
}

function renderizarVoluntariados() {
    const voluntariadosContainer = document.getElementById('voluntariadosContainer');
    const listaVoluntariados = obterVoluntariadosSalvos();

    if (voluntariadosContainer) {
        if (listaVoluntariados.length === 0) {
            voluntariadosContainer.innerHTML = '<p style="color:#777;">Nenhum voluntariado publicado ainda.</p>';
            return;
        }

        voluntariadosContainer.innerHTML = listaVoluntariados.map(v => {
            const inscritos = v.inscritos || [];
            const numInscritos = inscritos.length;

            return `
            <div class="vol-card card-voluntariado-painel">
                <div class="vol-content-left">
                    <div class="vol-info">
                        <h4 class="vol-name vol-titulo">${v.titulo}</h4>
                        <span class="vol-meta">${v.data} · ${v.duracao} · ${v.vagasTotal} vagas</span>
                        <p class="vol-desc">${v.descricao}</p>
                    </div>
                </div>

                <div class="vol-content-right">
                    <div class="vol-inscritos-box">
                        <div class="vol-inscritos-header">
                            <div class="vol-count">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B85633" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    <path d="M9 12h6"></path>
                                    <path d="M9 16h6"></path>
                                </svg>
                                <span>${numInscritos} de ${v.vagasTotal} vagas preenchidas</span>
                            </div>
                            <button type="button" class="btn-toggle-inscritos" onclick="toggleInscritos(this, ${v.id})">Ver inscritos</button>
                        </div>

                        <div id="lista-inscritos-${v.id}" class="lista-inscritos-content" style="display: none;">
                            ${renderizarCardsInscritos(inscritos)}
                        </div>
                    </div>

                    <div class="vol-actions">
                        <button class="btn-delete btn-excluir" onclick="excluirVoluntariado(${v.id})">Excluir</button>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
}

function renderizarCardsInscritos(inscritos) {
    if (!inscritos || inscritos.length === 0) {
        return `
            <div class="card-inscrito-item">
                <p style="color: #777; font-size: 0.88rem; margin: 0;">Nenhum inscrito no momento.</p>
            </div>
        `;
    }

    return inscritos.map(ins => {
        const nome = typeof ins === 'string' ? ins : ins.nome;
        const contato = (typeof ins === 'object' && ins.contato) ? ins.contato : 'Sem contato informado';
        const dataInscricao = (typeof ins === 'object' && ins.dataInscricao) ? ins.dataInscricao : 'Inscrito em ' + new Date().toLocaleDateString('pt-BR');

        return `
            <div class="card-inscrito-item">
                <h4 class="inscrito-nome">${nome}</h4>
                <p class="inscrito-contato">${contato}</p>
                <p class="inscrito-data">${dataInscricao}</p>
            </div>
        `;
    }).join('');
}

function toggleInscritos(btn, id) {
    const lista = document.getElementById(`lista-inscritos-${id}`);
    
    if (lista.style.display === 'none' || lista.style.display === '') {
        lista.style.display = 'block';
        btn.textContent = 'Ocultar inscritos';
        btn.classList.add('active');
    } else {
        lista.style.display = 'none';
        btn.textContent = 'Ver inscritos';
        btn.classList.remove('active');
    }
}

function renderizarDoacoes() {
    const doacoesContainer = document.getElementById('doacoesContainer');
    if (doacoesContainer) {
        doacoesContainer.innerHTML = ongDados.doacoes.map(d => `
            <div class="donation-card">
                <div class="don-header">
                    <h4 class="don-title">${d.item}</h4>
                    <span class="don-badge">${d.status}</span>
                </div>
                <p class="don-desc">${d.observacao}</p>
                <button class="btn-don-action" onclick="confirmarRecebimento(${d.id})">Confirmar recebimento</button>
            </div>
        `).join('');
    }
}

function excluirVoluntariado(id) {
    if (confirm('Tem certeza que deseja excluir este voluntariado? Ele será removido de todas as páginas do site.')) {
        let lista = obterVoluntariadosSalvos();
        lista = lista.filter(v => v.id !== id);
        salvarVoluntariados(lista);
        
        renderizarVoluntariados();
        atualizarBadges();

        if (document.getElementById('statVoluntariados')) {
            document.getElementById('statVoluntariados').textContent = lista.length;
        }
    }
}

function confirmarRecebimento(id) {
    alert(`Recebimento da doação ID ${id} confirmado com sucesso!`);
}