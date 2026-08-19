document.addEventListener('DOMContentLoaded', () => {

    // VARIÁVEIS DE ARMAZENAMENTO DE IMAGENS EM BASE64
    let logoBase64 = "";
    let capaBase64 = "";
    let galeriaBase64 = [];

    // CARREGAR DADOS EXISTENTES (DO LOCALSTORAGE OU PADRÃO)
    const dadosSalvos = JSON.parse(localStorage.getItem('ongPerfilData')) || {
        nome: "UPA",
        descricao: "animais",
        causa: "Animais",
        cidade: "Lorena",
        estado: "SP",
        endereco: "Rua José do Cedro",
        cnpj: "00.000.000/0001-00",
        chavePix: "11166626196",
        email: "nicolymariotosenai@gmail.com",
        telefone: "12982976786",
        site: "CIDVIIUVWURVWOVIWE",
        logoUrl: "",
        capaUrl: "",
        galeria: []
    };

    // PREENCHER CAMPOS DO FORMULÁRIO COM DADOS SALVOS
    document.getElementById('nomeOng').value = dadosSalvos.nome || "";
    document.getElementById('descricao').value = dadosSalvos.descricao || "";
    document.getElementById('causa').value = dadosSalvos.causa || "Animais";
    document.getElementById('cidade').value = dadosSalvos.cidade || "";
    document.getElementById('estado').value = dadosSalvos.estado || "";
    document.getElementById('endereco').value = dadosSalvos.endereco || "";
    document.getElementById('cnpj').value = dadosSalvos.cnpj || "";
    document.getElementById('chavePix').value = dadosSalvos.chavePix || "";
    document.getElementById('email').value = dadosSalvos.email || "";
    document.getElementById('telefone').value = dadosSalvos.telefone || "";
    document.getElementById('site').value = dadosSalvos.site || "";

    if (dadosSalvos.logoUrl) {
        logoBase64 = dadosSalvos.logoUrl;
        document.getElementById('previewLogo').innerHTML = `<img src="${logoBase64}" alt="Logo preview">`;
    }

    if (dadosSalvos.capaUrl) {
        capaBase64 = dadosSalvos.capaUrl;
        document.getElementById('previewCapa').innerHTML = `<img src="${capaBase64}" alt="Capa preview">`;
    }

    if (dadosSalvos.galeria && dadosSalvos.galeria.length > 0) {
        galeriaBase64 = dadosSalvos.galeria;
        renderGaleriaPreview();
    }

    // PROCESSAR UPLOAD DE LOGO
    document.getElementById('logoUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                logoBase64 = event.target.result;
                document.getElementById('previewLogo').innerHTML = `<img src="${logoBase64}" alt="Logo">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // PROCESSAR UPLOAD DE CAPA
    document.getElementById('capaUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                capaBase64 = event.target.result;
                document.getElementById('previewCapa').innerHTML = `<img src="${capaBase64}" alt="Capa">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // PROCESSAR UPLOAD DA GALERIA
    document.getElementById('galeriaUpload').addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                galeriaBase64.push(event.target.result);
                renderGaleriaPreview();
            };
            reader.readAsDataURL(file);
        });
    });

    function renderGaleriaPreview() {
        const container = document.getElementById('previewGaleria');
        container.innerHTML = galeriaBase64.map(src => `<img src="${src}" alt="Galeria">`).join('');
    }

    // BOTÃO VER PÁGINA PÚBLICA (VOLTA 2 NÍVEIS)
    document.getElementById('btnVerPaginaPublica').addEventListener('click', () => {
        window.location.href = '../../pagina.ong/index.html';
    });

    // SALVAR ALTERAÇÕES E ATUALIZAR PÁGINA PÚBLICA VIA LOCALSTORAGE
    document.getElementById('formPerfilOng').addEventListener('submit', (e) => {
        e.preventDefault();

        const novoPerfil = {
            nome: document.getElementById('nomeOng').value,
            descricao: document.getElementById('descricao').value,
            causa: document.getElementById('causa').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            endereco: document.getElementById('endereco').value,
            cnpj: document.getElementById('cnpj').value,
            chavePix: document.getElementById('chavePix').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            site: document.getElementById('site').value,
            logoUrl: logoBase64,
            capaUrl: capaBase64,
            galeria: galeriaBase64
        };

        // Salva os dados no navegador
        localStorage.setItem('ongPerfilData', JSON.stringify(novoPerfil));

        alert('Alterações salvas com sucesso! As informações da página pública foram atualizadas.');
    });
});