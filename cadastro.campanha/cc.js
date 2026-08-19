document.addEventListener('DOMContentLoaded', () => {
    // ELEMENTOS DO DOM
    const toggleCarona = document.getElementById('toggleCarona');
    const camposRetirada = document.getElementById('camposRetirada');
    const cidadeRetirada = document.getElementById('cidadeRetirada');
    const enderecoRetirada = document.getElementById('enderecoRetirada');
    const formDoacao = document.getElementById('formDoacao');

    const infoOngNome = document.getElementById('infoOngNome');
    const infoCampanhaTitulo = document.getElementById('infoCampanhaTitulo');

    // BANCOS DE DADOS SIMULADOS PARA EXIBIR O DESTINATÁRIO
    const ongsFicticias = [
        { id: 1, nome: "ARBUSTO" },
        { id: 2, nome: "UPA - União Protetora dos Animais" },
        { id: 3, nome: "Instituto Sementes do Amanhã" },
        { id: 4, nome: "Mãos Refeitas" }
    ];

    const campanhasFicticias = [
        { id: 101, ongId: 2, titulo: "Arrecadação de rações" },
        { id: 102, ongId: 1, titulo: "Mudas para Reflorestamento" },
        { id: 103, ongId: 3, titulo: "Kits de Material Escolar" },
        { id: 104, ongId: 4, titulo: "Cesta Básica Comunitária" }
    ];

    // 1. CARREGAR INFORMAÇÕES DA CAMPANHA/ONG DA URL
    function carregarInfoCampanha() {
        const urlParams = new URLSearchParams(window.location.search);
        const campanhaId = parseInt(urlParams.get('campanhaId'));

        if (campanhaId) {
            const campanha = campanhasFicticias.find(c => c.id === campanhaId);
            if (campanha) {
                const ong = ongsFicticias.find(o => o.id === campanha.ongId);
                infoOngNome.textContent = ong ? ong.nome : "ONG Parceira";
                infoCampanhaTitulo.textContent = `Campanha: ${campanha.titulo}`;
                return;
            }
        }

        // Caso não tenha ID na URL ou não encontre a campanha
        infoOngNome.textContent = "ONG Parceira";
        infoCampanhaTitulo.textContent = "Doação direta para instituição";
    }

    // 2. EXIBIR OU OCULTAR OS CAMPOS DE RETIRADA COM BASE NO TOGGLE
    function atualizarVisibilidadeRetirada() {
        if (toggleCarona.checked) {
            camposRetirada.style.display = 'block';
            cidadeRetirada.setAttribute('required', 'true');
            enderecoRetirada.setAttribute('required', 'true');
        } else {
            camposRetirada.style.display = 'none';
            cidadeRetirada.removeAttribute('required');
            enderecoRetirada.removeAttribute('required');
            cidadeRetirada.value = '';
            enderecoRetirada.value = '';
        }
    }

    // 3. EVENTO DE ENVIO DO FORMULÁRIO
    if (formDoacao) {
        formDoacao.addEventListener('submit', (e) => {
            e.preventDefault();

            const item = document.getElementById('itemDoacao').value;
            const precisaCarona = toggleCarona.checked;

            if (precisaCarona) {
                alert(`Doação "${item}" cadastrada com sucesso! Ela foi adicionada à lista de Caronas Solidárias.`);
                window.location.href = '../carona.solidaria/carona.html';
            } else {
                alert(`Doação "${item}" cadastrada com sucesso! A ONG foi notificada e aguarda o seu envio.`);
                window.location.href = '../campanhas/campanhas.html';
            }
        });
    }

    // INICIALIZAÇÕES
    carregarInfoCampanha();
    atualizarVisibilidadeRetirada();

    // ESCUTA A ALTERAÇÃO NO TOGGLE
    toggleCarona.addEventListener('change', atualizarVisibilidadeRetirada);
});