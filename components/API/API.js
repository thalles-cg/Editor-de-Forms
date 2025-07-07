document.addEventListener('DOMContentLoaded', () => {
    const callApisButton = document.getElementById('call-apis-button');
    const apiOutputSection = document.getElementById('api-output-section');

    if (callApisButton && apiOutputSection) {
        callApisButton.addEventListener('click', async () => {
            apiOutputSection.innerHTML = '<h3>Resultados das APIs</h3><p>Carregando imagens e mensagem...</p>'; 

            const dogImageUrl = 'https://dog.ceo/api/breeds/image/random'; 
            const catImageUrl = 'https://api.thecatapi.com/v1/images/search';
            const quoteUrl = 'https://api.quotable.io/random'; 

            try {
                const [dogResponse, catResponse, quoteResponse] = await Promise.all([
                    fetch(dogImageUrl),
                    fetch(catImageUrl),
                    fetch(quoteUrl)
                ]);

                if (!dogResponse.ok) throw new Error(`HTTP error! status: ${dogResponse.status} from ${dogImageUrl}`);
                if (!catResponse.ok) throw new Error(`HTTP error! status: ${catResponse.status} from ${catImageUrl}`);
                if (!quoteResponse.ok) throw new Error(`HTTP error! status: ${quoteResponse.status} from ${quoteUrl}`);

                const dogData = await dogResponse.json();
                const catData = await catResponse.json(); 
                const quoteData = await quoteResponse.json();

                const dogImageSrc = dogData.message;
                const catImageSrc = catData[0].url; 
                const quoteContent = quoteData.content;
                const quoteAuthor = quoteData.author;

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