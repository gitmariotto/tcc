document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastrarOng');

    // Função para converter arquivo de imagem em formato Base64
    const converterParaBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve('');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const logoFile = document.getElementById('logoInput').files[0];
            const capaFile = document.getElementById('capaInput').files[0];

            try {
                // Converte as imagens selecionadas
                const logoBase64 = await converterParaBase64(logoFile);
                const capaBase64 = await converterParaBase64(capaFile);

                const dadosOng = {
                    nome: document.getElementById('nomeOng').value.trim(),
                    descricao: document.getElementById('descricao').value.trim(),
                    causaPrincipal: document.getElementById('causaPrincipal').value,
                    cidade: document.getElementById('cidade').value.trim(),
                    estado: document.getElementById('estado').value.trim(),
                    endereco: document.getElementById('endereco').value.trim(),
                    cnpj: document.getElementById('cnpj').value.trim(),
                    chavePix: document.getElementById('chavePix').value.trim(),
                    emailContato: document.getElementById('emailContato').value.trim(),
                    telefone: document.getElementById('telefone').value.trim(),
                    site: document.getElementById('site').value.trim(),
                    logoImg: logoBase64,
                    capaImg: capaBase64
                };

                // Salva os dados no localStorage
                localStorage.setItem('dadosOngLogada', JSON.stringify(dadosOng));
                localStorage.setItem('tipoConta', 'ong');

                alert('ONG cadastrada com sucesso!');

                // Redireciona diretamente para o painel da ONG
                window.location.href = '../../painel.ong/index.html';
            } catch (error) {
                alert('Ocorreu um erro ao processar as imagens. Tente fotos menores.');
            }
        });
    }
});