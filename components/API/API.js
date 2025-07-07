document.addEventListener('DOMContentLoaded', () => {
    const callApisButton = document.getElementById('call-apis-button');
    const apiOutputSection = document.getElementById('api-content');

    if (callApisButton && apiOutputSection) {
        callApisButton.addEventListener('click', async () => {
            apiOutputSection.innerHTML = '<h3>Resultados das APIs</h3><p>Carregando imagens e mensagem...</p>'; 
            const dogImageUrl = 'https://dog.ceo/api/breeds/image/random'; 
            const catImageUrl = 'https://api.thecatapi.com/v1/images/search'; 

            const quoteUrl = 'https://api.allorigins.win/raw?url=https://zenquotes.io/api/random'; 


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
                const quoteArray = await quoteResponse.json(); 

                const dogImageSrc = dogData.message;
                const catImageSrc = catData[0].url;

                const quoteContent = quoteArray[0].q; 
                const quoteAuthor = quoteArray[0].a; 

                let generatedContent = `
                    <div class="img-row"><img src="${dogImageSrc}" alt="Imagem de Cachorro"">
                    <img src="${catImageSrc}" alt="Imagem de Gato""></div>

                    <h4>Mensagem Aleatória</h4>
                    <blockquote>
                        "${quoteContent}"
                        <footer>— ${quoteAuthor}</footer>
                    </blockquote>
                `;

                apiOutputSection.innerHTML = generatedContent;

            } catch (error) {
                console.error('Erro ao buscar dados das APIs:', error);
                apiOutputSection.innerHTML = `
                    <h3>Resultados das APIs</h3>
                    <p style="color: red; text-align: center;">Ocorreu um erro ao carregar o conteúdo. Por favor, tente novamente.</p>
                    <p style="color: red; text-align: center; font-size: 0.8em;">Detalhes: ${error.message}</p>
                `;
            }
        });
    }
});