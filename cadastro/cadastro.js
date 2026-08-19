document.addEventListener('DOMContentLoaded', () => {
    const cardPessoa = document.getElementById('cardPessoa');
    const cardOng = document.getElementById('cardOng');
    const ongFields = document.getElementById('ongFields');
    const btnSubmit = document.getElementById('btnSubmit');

    if (cardPessoa && cardOng && ongFields && btnSubmit) {
        // Alternar para "Sou pessoa"
        cardPessoa.addEventListener('click', () => {
            cardPessoa.classList.add('active');
            cardOng.classList.remove('active');

            // Oculta os campos da ONG
            ongFields.classList.remove('active');

            // Atualiza o texto do botão
            btnSubmit.textContent = 'Criar minha conta';
        });

        // Alternar para "Represento uma ONG"
        cardOng.addEventListener('click', () => {
            cardOng.classList.add('active');
            cardPessoa.classList.remove('active');

            // Exibe os campos da ONG
            ongFields.classList.add('active');

            // Atualiza o texto do botão
            btnSubmit.textContent = 'Criar conta da ONG';
        });
    }
});