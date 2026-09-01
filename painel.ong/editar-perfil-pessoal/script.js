document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle de origem da navegação
    const urlParams = new URLSearchParams(window.location.search);
    const origem = urlParams.get('origem');

    // Mapeamento dos retornos considerando que o arquivo está dentro de 'painel.ong/editar-perfil-pessoal/'
    let urlRetorno = '../../painel.pessoa/index.html';

    if (origem === 'ong') {
        urlRetorno = '../index.html';
    } else if (origem === 'pessoa') {
        urlRetorno = '../../painel.pessoa/index.html';
    }

    // Atualiza links de botões de voltar/cancelar no formulário
    const btnsVoltar = document.querySelectorAll('.btn-voltar, .btn-cancelar, .link-voltar');
    btnsVoltar.forEach(btn => {
        btn.setAttribute('href', urlRetorno);
    });

    // 2. Mapeamento dos elementos da tela
    const form = document.getElementById('formPerfilPessoal');
    const inputNome = document.getElementById('nomeCompleto');
    const inputCidade = document.getElementById('cidade');
    const inputTelefone = document.getElementById('telefone');
    const inputSobre = document.getElementById('sobreVoce');
    const checkTransporte = document.getElementById('transporteCheck');
    const tagButtons = document.querySelectorAll('.tag-btn');

    // 3. Alternância (toggle) das tags de causas
    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // 4. Carregar dados existentes do localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

    if (inputNome && usuarioLogado.nome) inputNome.value = usuarioLogado.nome;
    if (inputCidade && usuarioLogado.cidade) inputCidade.value = usuarioLogado.cidade;
    if (inputTelefone && usuarioLogado.telefone) inputTelefone.value = usuarioLogado.telefone;
    if (inputSobre && usuarioLogado.sobre) inputSobre.value = usuarioLogado.sobre;
    if (checkTransporte && typeof usuarioLogado.podeTransportar === 'boolean') {
        checkTransporte.checked = usuarioLogado.podeTransportar;
    }

    // Marca as tags salvas anteriormente
    if (Array.isArray(usuarioLogado.causas)) {
        tagButtons.forEach(btn => {
            const causaNome = btn.getAttribute('data-causa');
            if (usuarioLogado.causas.includes(causaNome)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 5. Salvar alterações e redirecionar para o painel correto
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const causasSelecionadas = [];
            document.querySelectorAll('.tag-btn.active').forEach(btn => {
                causasSelecionadas.push(btn.getAttribute('data-causa'));
            });

            const perfilAtualizado = {
                ...usuarioLogado,
                nome: inputNome ? inputNome.value.trim() : usuarioLogado.nome,
                cidade: inputCidade ? inputCidade.value.trim() : usuarioLogado.cidade,
                telefone: inputTelefone ? inputTelefone.value.trim() : usuarioLogado.telefone,
                sobre: inputSobre ? inputSobre.value.trim() : usuarioLogado.sobre,
                podeTransportar: checkTransporte ? checkTransporte.checked : usuarioLogado.podeTransportar,
                causas: causasSelecionadas
            };

            localStorage.setItem('usuarioLogado', JSON.stringify(perfilAtualizado));

            alert('Perfil e interesses atualizados com sucesso!');
            window.location.href = urlRetorno;
        });
    }
});