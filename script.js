document.addEventListener('DOMContentLoaded', () => {
    const createActionBtn = document.getElementById('createActionBtn');

    if (createActionBtn) {
        createActionBtn.addEventListener('click', (event) => {
            event.preventDefault();

            // Verifica no navegador se o usuário está logado
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (isLoggedIn) {
                // Se estiver logado, redireciona para a página de criar ação
                window.location.href = './criar-acao/selecionar.html';
            } else {
                // Se NÃO estiver logado, redireciona para a página de login
                window.location.href = './login/login.html';
            }
        });
    }
});