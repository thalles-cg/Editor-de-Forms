document.addEventListener('DOMContentLoaded', () => {
    const callApisButton = document.getElementById('call-apis-button');
    const apiOutputSection = document.getElementById('api-output-section');

    if (callApisButton && apiOutputSection) {
        callApisButton.addEventListener('click', async () => {
            apiOutputSection.innerHTML = '<h3>Resultados das APIs</h3><p>Carregando imagens e mensagem...</p>'; // Mensagem de carregamento

            // APIs que serão chamadas em conjunto
            const dogImageUrl = 'https://dog.ceo/api/breeds/image/random'; // Imagem aleatória de cachorro
            const catImageUrl = 'https://api.thecatapi.com/v1/images/search'; // Imagem aleatória de gato (retorna um array)
            
            // ---- ALTERAÇÃO AQUI: Usando um proxy CORS para a ZenQuotes ----
            // A API original da ZenQuotes está bloqueando por CORS, então usamos um proxy.
            const quoteUrl = 'https://api.allorigins.win/raw?url=https://zenquotes.io/api/random'; 
            // 'https://api.allorigins.win/raw?url=' é um proxy público.
            // Ele faz a requisição para 'https://zenquotes.io/api/random' do lado do servidor e te retorna os dados sem problemas de CORS.
            // ---- FIM DA ALTERAÇÃO ----

            try {
                const [dogResponse, catResponse, quoteResponse] = await Promise.all([
                    fetch(dogImageUrl),
                    fetch(catImageUrl),
                    fetch(quoteUrl) 
                    // Não precisa de { mode: 'no-cors' } com o proxy, ele já resolve o CORS.
                ]);

                if (!dogResponse.ok) throw new Error(`HTTP error! status: ${dogResponse.status} from ${dogImageUrl}`);
                if (!catResponse.ok) throw new Error(`HTTP error! status: ${catResponse.status} from ${catImageUrl}`);
                // Com o proxy allorigins, um status 200 (OK) já é suficiente.
                if (!quoteResponse.ok) throw new Error(`HTTP error! status: ${quoteResponse.status} from ${quoteUrl}`);

                const dogData = await dogResponse.json();
                const catData = await catResponse.json();
                const quoteArray = await quoteResponse.json(); // ZenQuotes ainda retorna um array

                const dogImageSrc = dogData.message;
                const catImageSrc = catData[0].url;

                // Acesso aos dados da ZenQuotes via proxy
                const quoteContent = quoteArray[0].q; 
                const quoteAuthor = quoteArray[0].a; 

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
                    <p style="color: red; text-align: center;">Ocorreu um erro ao carregar o conteúdo. Por favor, tente novamente.</p>
                    <p style="color: red; text-align: center; font-size: 0.8em;">Detalhes: ${error.message}</p>
                `;
            }
        });
    }
});