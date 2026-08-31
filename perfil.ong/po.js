// BANCO DE DADOS FICTÍCIO DAS ONGS
const ongsFicticias = [
    {
        id: 1,
        nome: "ARBUSTO",
        causa: "Meio Ambiente",
        descricao: "Atuamos na preservação de florestas nativas e reflorestamento urbano.",
        cidade: "Lorena",
        estado: "SP",
        endereco: "Rua do Bosque, 120",
        email: "contato@arbusto.org",
        telefone: "(12) 99888-7766",
        chavePix: "contato@arbusto.org",
        redes: "@ong.arbusto",
        foto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300",
        capa: ""
    },
    {
        id: 2,
        nome: "UPA - União Protetora dos Animais",
        causa: "Animais",
        descricao: "Resgate, tratamento e adoção responsável de cães e gatos em situação de rua.",
        cidade: "Lorena",
        estado: "SP",
        endereco: "Av. Pe. Joao Rabelo, 45",
        email: "contato@upa.org.br",
        telefone: "(12) 99777-6655",
        chavePix: "11166626196",
        redes: "@upa.lorena",
        foto: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300",
        capa: ""
    },
    {
        id: 3,
        nome: "Instituto Sementes do Amanhã",
        causa: "Crianças",
        descricao: "Apoio educacional e social para crianças da comunidade.",
        cidade: "Guaratinguetá",
        estado: "SP",
        endereco: "Rua das Flores, 88",
        email: "contato@sementes.org",
        telefone: "(12) 99666-5544",
        chavePix: "contato@sementes.org",
        redes: "@sementes.amanha",
        foto: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300",
        capa: ""
    },
    {
        id: 4,
        nome: "Mãos Refeitas",
        causa: "Alimentação",
        descricao: "Distribuição de refeições e cestas básicas para famílias em vulnerabilidade.",
        cidade: "Aparecida",
        estado: "SP",
        endereco: "Praça Central, 10",
        email: "contato@maosrefeitas.org",
        telefone: "(12) 99555-4433",
        chavePix: "contato@maosrefeitas.org",
        redes: "@maosrefeitas",
        foto: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300",
        capa: ""
    }
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
    // 1. Pega o ID da ONG vindo da URL (ex: perfil.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const ongId = parseInt(urlParams.get('id')) || 2; // Padrão é UPA (ID 2)

    // 2. Busca dados da ONG
    let ong = ongsFicticias.find(o => o.id === ongId) || ongsFicticias[1];

    // 3. Mescla com dados salvos no localStorage (se a ONG tiver editado o perfil no painel)
    const dadosEditados = JSON.parse(localStorage.getItem('ongPerfilData'));
    if (dadosEditados) {
        ong = {
            ...ong,
            nome: dadosEditados.nome || ong.nome,
            descricao: dadosEditados.descricao || ong.descricao,
            causa: dadosEditados.causa || ong.causa,
            cidade: dadosEditados.cidade ? `${dadosEditados.cidade} - ${dadosEditados.estado || 'SP'}` : ong.cidade,
            endereco: dadosEditados.endereco || ong.endereco,
            email: dadosEditados.email || ong.email,
            telefone: dadosEditados.telefone || ong.telefone,
            chavePix: dadosEditados.chavePix || ong.chavePix,
            redes: dadosEditados.site || ong.redes,
            foto: dadosEditados.logoUrl || ong.foto,
            capa: dadosEditados.capaUrl || ong.capa,
            galeria: dadosEditados.galeria || []
        };
    }

    // 4. Preenche os campos do perfil
    if (document.getElementById('ongNome')) document.getElementById('ongNome').textContent = ong.nome;
    if (document.getElementById('ongCidade')) document.getElementById('ongCidade').textContent = ong.cidade;
    if (document.getElementById('ongCausa')) document.getElementById('ongCausa').textContent = ong.causa;
    if (document.getElementById('ongDescricao')) document.getElementById('ongDescricao').textContent = ong.descricao;
    if (document.getElementById('ongEndereco')) document.getElementById('ongEndereco').textContent = ong.endereco;
    if (document.getElementById('ongEmail')) document.getElementById('ongEmail').textContent = ong.email;
    if (document.getElementById('ongTelefone')) document.getElementById('ongTelefone').textContent = ong.telefone;
    if (document.getElementById('ongRedes')) document.getElementById('ongRedes').textContent = ong.redes;

    if (document.getElementById('ongFoto') && ong.foto) {
        document.getElementById('ongFoto').src = ong.foto;
    }
    if (document.getElementById('ongCapa') && ong.capa) {
        document.getElementById('ongCapa').src = ong.capa;
        document.getElementById('ongCapa').style.display = 'block';
    }

    // 5. Renderiza Galeria
    renderizarGaleria(ong.galeria);

    // 6. Renderiza conteúdos das abas
    renderizarCampanhasDoPerfil(ong.id);
    renderizarVoluntariadosDoPerfil();
    renderizarTransparenciaDoPerfil();

    // 7. Configura o clique das Abas
    configurarSistemaDeAbas();
});

// SISTEMA DE TROCA DE ABAS
function configurarSistemaDeAbas() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove a classe 'active' de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona 'active' no botão clicado
            button.classList.add('active');

            // Ativa o container correspondente
            if (targetTab === 'campanhas') {
                const el = document.getElementById('tabCampanhas');
                if (el) el.classList.add('active');
            } else if (targetTab === 'voluntariado') {
                const el = document.getElementById('tabVoluntariado');
                if (el) el.classList.add('active');
            } else if (targetTab === 'transparencia') {
                const el = document.getElementById('tabTransparencia');
                if (el) el.classList.add('active');
            }
        });
    });
}

function renderizarGaleria(galeria) {
    const containerGaleria = document.getElementById('galeriaOngContainer');
    if (!containerGaleria || !galeria || galeria.length === 0) return;

    containerGaleria.innerHTML = galeria.map(src => `
        <div style="border-radius: 12px; overflow: hidden; height: 120px; margin-bottom: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <img src="${src}" alt="Foto da Galeria" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    `).join('');
}

function renderizarCampanhasDoPerfil(ongId) {
    const containerCampanhas = document.getElementById('campanhasOngContainer');
    if (!containerCampanhas) return;

    const campanhasDaOng = campanhasFicticias.filter(c => c.ongId === ongId);

    if (campanhasDaOng.length === 0) {
        containerCampanhas.innerHTML = `<p class="empty-msg" style="color: #777;">Nenhuma campanha ativa no momento para esta ONG.</p>`;
        return;
    }

    let htmlCards = '';
    campanhasDaOng.forEach(c => {
        htmlCards += `
        <div style="background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <span style="color: #B85633; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${c.causa}</span>
            <h3 style="font-family: 'DM Serif Display', serif; color: #163B29; font-size: 1.4rem; margin: 0.3rem 0;">${c.titulo}</h3>
            <p style="font-size: 0.9rem; color: #555; margin-bottom: 1rem;">${c.descricao}</p>
            
            <div style="background-color: #F2EFE9; padding: 0.8rem 1rem; border-radius: 10px; font-size: 0.875rem; color: #1A1A1A; margin-bottom: 0.8rem;">
                <strong>Itens necessários:</strong> ${c.itens}
            </div>

            <p style="font-size: 0.85rem; color: #1A1A1A;"><strong>Meta:</strong> ${c.meta} | <strong>Prazo:</strong> ${c.prazo}</p>
        </div>
        `;
    });

    containerCampanhas.innerHTML = htmlCards;
}

function renderizarVoluntariadosDoPerfil() {
    const container = document.getElementById('voluntariadosOngContainer');
    if (!container) return;

    const todosVoluntariados = JSON.parse(localStorage.getItem('siteVoluntariadosData')) || [];

    if (todosVoluntariados.length === 0) {
        container.innerHTML = '<p class="empty-msg" style="color: #777;">Nenhum voluntariado disponível no momento.</p>';
        return;
    }

    container.innerHTML = todosVoluntariados.map(v => {
        const numInscritos = v.inscritos ? v.inscritos.length : 0;
        const esgotado = numInscritos >= v.vagasTotal;

        return `
            <div style="background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div>
                    <h4 style="font-size: 1.2rem; font-weight: 600; color: #163B29; margin-bottom: 0.3rem;">${v.titulo}</h4>
                    <span style="font-size: 0.82rem; color: #777; display: block; margin-bottom: 0.5rem;">Data: ${v.data} · Duração: ${v.duracao}</span>
                    <p style="font-size: 0.9rem; color: #555; margin-bottom: 1rem;">${v.descricao}</p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem;">
                    <span style="font-size: 0.88rem; font-weight: 600; color: #163B29;">${numInscritos} de ${v.vagasTotal} vagas preenchidas</span>
                    <button onclick="inscreverVoluntarioPublico(${v.id})" 
                            style="background-color: ${esgotado ? '#ccc' : '#B85633'}; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 99px; font-weight: 600; cursor: ${esgotado ? 'not-allowed' : 'pointer'};"
                            ${esgotado ? 'disabled' : ''}>
                        ${esgotado ? 'Vagas Esgotadas' : 'Quero me inscrever'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ---------------- TRANSPARÊNCIA (RECEBIMENTOS CONFIRMADOS) ----------------
function renderizarTransparenciaDoPerfil() {
    const container = document.getElementById('transparenciaOngContainer');
    if (!container) return;

    const listaTransparencia = JSON.parse(localStorage.getItem('siteTransparenciaData')) || [];

    if (listaTransparencia.length === 0) {
        container.innerHTML = '<p class="empty-msg" style="color: #777;">Nenhuma confirmação de doação publicada ainda.</p>';
        return;
    }

    container.innerHTML = listaTransparencia.map(t => `
        <div style="background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span style="background: #E8F5E9; color: #2E7D32; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
                    ✓ Doação Recebida
                </span>
                <span style="font-size: 0.8rem; color: #888;">${t.data || ''}</span>
            </div>

            <h4 style="font-size: 1.15rem; font-weight: 600; color: #163B29; margin-bottom: 0.4rem;">
                ${t.item}
            </h4>

            <p style="font-size: 0.92rem; color: #444; line-height: 1.45; margin-bottom: ${t.foto ? '1rem' : '0'};">
                "${t.mensagem}"
            </p>

            ${t.foto ? `
                <div style="width: 100%; max-height: 280px; border-radius: 12px; overflow: hidden; margin-top: 0.8rem; background: #f0f0f0;">
                    <img src="${t.foto}" alt="Comprovante de entrega / foto da doação" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
            ` : ''}
        </div>
    `).join('');
}

function inscreverVoluntarioPublico(id) {
    const nome = prompt("Digite seu nome completo para se inscrever neste voluntariado:");

    if (nome && nome.trim() !== "") {
        let voluntariados = JSON.parse(localStorage.getItem('siteVoluntariadosData')) || [];
        const index = voluntariados.findIndex(v => v.id === id);

        if (index !== -1) {
            if (!voluntariados[index].inscritos) {
                voluntariados[index].inscritos = [];
            }

            if (voluntariados[index].inscritos.length >= voluntariados[index].vagasTotal) {
                alert("As vagas para este voluntariado foram preenchidas!");
                return;
            }

            voluntariados[index].inscritos.push(nome.trim());
            localStorage.setItem('siteVoluntariadosData', JSON.stringify(voluntariados));

            alert(`Inscrição realizada com sucesso, ${nome.trim()}! Seu nome foi enviado para o painel da ONG.`);
            renderizarVoluntariadosDoPerfil();
        }
    }
}