document.addEventListener('DOMContentLoaded', () => {
    const callApisButton = document.getElementById('call-apis-button');
    const apiOutputSection = document.getElementById('api-output-section');

    if (callApisButton && apiOutputSection) {
        callApisButton.addEventListener('click', async () => {
            apiOutputSection.innerHTML = '<h3>Resultados das APIs</h3><p>Carregando imagens e mensagem...</p>'; // Mensagem de carregamento

            // APIs que serão chamadas em conjunto
            const dogImageUrl = 'https://dog.ceo/api/breeds/image/random'; // Imagem aleatória de cachorro
            const catImageUrl = 'https://api.thecatapi.com/v1/images/search'; // Imagem aleatória de gato (retorna um array)
            const quoteUrl = 'https://api.quotable.io/random'; // Mensagem (citação) aleatória com autor

            try {
                // Usa Promise.all para fazer todas as chamadas API em paralelo
                const [dogResponse, catResponse, quoteResponse] = await Promise.all([
                    fetch(dogImageUrl),
                    fetch(catImageUrl),
                    fetch(quoteUrl)
                ]);

                // Garante que todas as respostas foram bem-sucedidas (status 200 OK)
                if (!dogResponse.ok) throw new Error(`HTTP error! status: ${dogResponse.status} from ${dogImageUrl}`);
                if (!catResponse.ok) throw new Error(`HTTP error! status: ${catResponse.status} from ${catImageUrl}`);
                if (!quoteResponse.ok) throw new Error(`HTTP error! status: ${quoteResponse.status} from ${quoteUrl}`);

                // Converte as respostas para JSON
                const dogData = await dogResponse.json();
                const catData = await catResponse.json(); // Retorna um array, pegaremos o primeiro item
                const quoteData = await quoteResponse.json();

                // Extrai as URLs das imagens e a citação/autor
                const dogImageSrc = dogData.message;
                const catImageSrc = catData[0].url; // A The Cat API retorna um array de objetos, pegamos a URL do primeiro
                const quoteContent = quoteData.content;
                const quoteAuthor = quoteData.author;

                // Gera o HTML com os dados das APIs
                let generatedContent = `
                    <h3>Resultados das APIs</h3>
                    
                    <h4>Seu Amigo Canino</h4>
                    <img src="${dogImageSrc}" alt="Imagem de Cachorro" style="max-width: 300px; height: auto; display: block; margin: 0 auto 20px auto; border-radius: 8px;">
                    <hr style="border: none; border-top: 1px dashed #ccc; margin: 20px 0;">

                    <h4>Seu Amigo Felino</h4>
                    <img src="${catImageSrc}" alt="Imagem de Gato" style="max-width: 300px; height: auto; display: block; margin: 0 auto 20px auto; border-radius: 8px;">
                    <hr style="border: none; border-top: 1px dashed #ccc; margin: 20px 0;">

                    <h4>Mensagem Inspiradora</h4>
                    <blockquote style="font-style: italic; border-left: 5px solid #007bff; padding-left: 15px; margin: 0 auto 20px auto; max-width: 600px; line-height: 1.6; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                        "${quoteContent}"
                        <footer style="margin-top: 10px; font-size: 0.9em; text-align: right; color: #555;">— ${quoteAuthor}</footer>
                    </blockquote>
                `;

                // Insere o conteúdo gerado na nova seção da página
                apiOutputSection.innerHTML = generatedContent;

            } catch (error) {
                console.error('Erro ao buscar dados das APIs:', error);
                apiOutputSection.innerHTML = `
                    <h3>Resultados das APIs</h3>
                    <p style="color: red; text-align: center;">Ocorreu um erro ao carregar o conteúdo divertido. Por favor, tente novamente.</p>
                    <p style="color: red; text-align: center; font-size: 0.8em;">Detalhes: ${error.message}</p>
                `;
            }
        });
    }
});