// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Function to programmatically open the Dialogflow chatbot
function openChat() {
    // Dialogflow messenger component
    const dfMessenger = document.querySelector('df-messenger');
    
    if (dfMessenger) {
        // Attempt to open the chat window by toggling its internal attribute or relying on user interaction
        // DF Messenger exposes some DOM methods in newer versions, but if not we show an alert.
        const chatElement = dfMessenger.shadowRoot.querySelector('.df-messenger-wrapper');
        
        // Simulating click on the messenger widget (this triggers its open state)
        try {
            const dfWrapper = dfMessenger.shadowRoot.querySelector('df-messenger-chat');
            if(dfWrapper) {
                // Not standard API, but best approach if API fails
            }
        } catch(e) {
            console.log("Could not open programmatically via shadow dom", e);
        }

        // We can just alert the user or visually prompt them if auto-open fails due to Shadow DOM restrictions
        alert("The AI Agent is active! Please click the chat bubble in the bottom right corner of your screen to start.");
    }
}

// Intersection Observer for Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
