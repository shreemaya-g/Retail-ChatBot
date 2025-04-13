/* assets/chat/chat.js */
(async function () {
    // Toggle widget
    const toggleBtn = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    const closeBtn = document.querySelector('.close-btn');

    toggleBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        toggleBtn.style.display = chatWidget.classList.contains('active') ? 'none' : 'block';
    });

    closeBtn.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        toggleBtn.style.display = 'block';
    });

    // Initialize Azure Web Chat
    const secret = 'DE31kvG1hhMLyDl1A9TiBpSSNb6T8wbiVeXExPLidJHX1hViIaxaJQQJ99BDACL93NaAArohAAABAZBS4UEM.AU0RJoL2F7HQUThbVupkqXLCJcZPnviqBALt4OMVDw9BkceQkBukJQQJ99BDACL93NaAArohAAABAZBS37J3'; // Replace with your Web Chat secret
    const webChatUrl = 'https://webchat.botframework.com/v3/directline';
    const tokenResponse = await fetch(`${webChatUrl}/tokens/generate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}` }
    });
    const { token } = await tokenResponse.json();

    window.WebChat.renderWebChat(
        {
            directLine: window.WebChat.createDirectLine({ token }),
            userID: 'shopper_' + Math.random().toString(36).substr(2, 9),
            username: 'Electronics Shopper',
            botAvatarInitials: 'EB', // Electronics Bot
            userAvatarInitials: 'ES', // Electronics Shopper
            styleOptions: {
                botAvatarBackgroundColor: '#ff5722',
                userAvatarBackgroundColor: '#0288d1',
                bubbleBackground: '#2a2a2a',
                bubbleFromUserBackground: '#ff5722',
                bubbleTextColor: '#fff',
                bubbleFromUserTextColor: '#fff',
                sendBoxBackground: '#1e1e1e',
                sendBoxButtonColor: '#ff5722'
            }
        },
        document.getElementById('webchat')
    );

    // Optional: Proactive message on product pages
    if (window.location.pathname.includes('shop')) {
        setTimeout(() => {
            chatWidget.classList.add('active');
            toggleBtn.style.display = 'none';
        }, 3000); // Open after 3s
    }
})();