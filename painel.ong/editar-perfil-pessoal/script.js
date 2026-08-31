document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPerfilPessoal');
    const inputNome = document.getElementById('nomeCompleto');
    const inputCidade = document.getElementById('cidade');
    const inputTelefone = document.getElementById('telefone');
    const inputSobre = document.getElementById('sobreVoce');
    const checkTransporte = document.getElementById('transporteCheck');
    const tagButtons = document.querySelectorAll('.tag-btn');

    // 1. Alternância (toggle) das tags de causas
    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // 2. Carregar dados existentes do usuário
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

    if (usuarioLogado.nome) inputNome.value = usuarioLogado.nome;
    if (usuarioLogado.cidade) inputCidade.value = usuarioLogado.cidade;
    if (usuarioLogado.telefone) inputTelefone.value = usuarioLogado.telefone;
    if (usuarioLogado.sobre) inputSobre.value = usuarioLogado.sobre;
    if (typeof usuarioLogado.podeTransportar === 'boolean') {
        checkTransporte.checked = usuarioLogado.podeTransportar;
    }

    // Marca as tags selecionadas salvas
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

    // 3. Salvar alterações no localStorage
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Pega todas as causas ativas
        const causasSelecionadas = [];
        document.querySelectorAll('.tag-btn.active').forEach(btn => {
            causasSelecionadas.push(btn.getAttribute('data-causa'));
        });

        const perfilAtualizado = {
            ...usuarioLogado,
            nome: inputNome.value.trim(),
            cidade: inputCidade.value.trim(),
            telefone: inputTelefone.value.trim(),
            sobre: inputSobre.value.trim(),
            podeTransportar: checkTransporte.checked,
            causas: causasSelecionadas
        };

        localStorage.setItem('usuarioLogado', JSON.stringify(perfilAtualizado));

        alert('Perfil e interesses atualizados com sucesso!');
        window.location.href = '../index.html';
    });
});