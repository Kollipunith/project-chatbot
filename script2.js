document.getElementById('prompt_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userInputElement = document.querySelector('textarea[name="user_input"]');
    const userInput = userInputElement.value;
    const promptContainer = document.getElementById('prompt_container');

    try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                prompt: userInput,
                max_tokens: 60
            })
        });

        if (response.ok) {
            const data = await response.json();
            const generatedPrompt = data.choices[0].text.trim();

            promptContainer.innerHTML += `
    <div class="message sender"><img src="sender.jpg" alt="sender avatar" /><p><strong>User input:</strong> ${userInput}</p></div>
    <div class="message receiver"><p><strong>Generated prompt:</strong> ${generatedPrompt}</p><img src="receiver.jpeg" alt="receiver avatar" /></div>
`;
        } else {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            alert('Something went wrong. Please check the browser console for more details.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please check the browser console for more details.');
    }
});

