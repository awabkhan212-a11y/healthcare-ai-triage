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

// =======================================
// EmailJS & Dialogflow Integration
// =======================================

// 1. Initialize EmailJS (Uncomment and add your Public Key once registered)
(function() {
    // emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// 2. Listen to Dialogflow Messenger events
window.addEventListener('df-response-received', function(event) {
    const response = event.detail.response;
    
    // Safety check
    if (!response || !response.queryResult) return;
    
    const botResponseText = response.queryResult.fulfillmentText || "";
    const intentName = response.queryResult.intent ? response.queryResult.intent.displayName : "";
    
    // Check if the bot confirmed an appointment. 
    // We check the intent name or the actual bot message for confirmation keywords.
    const isConfirmed = intentName.toLowerCase().includes("appointment") || 
                        botResponseText.toLowerCase().includes("appointment confirmed") || 
                        botResponseText.toLowerCase().includes("has been booked");

    if (isConfirmed) {
        console.log("Appointment confirmed! Triggering email notification...");
        
        // Prepare data for the email template
        const templateParams = {
            to_email: 'awabkhan212@gmail.com',
            patient_request: response.queryResult.queryText, // What the user said
            timestamp: new Date().toLocaleString(),
            confirmation_message: botResponseText
        };
        
        // 3. Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS! Email sent.', response.status, response.text);
            }, function(error) {
                console.log('FAILED to send email.', error);
            });
        */
        
        // Alert developer in console for testing
        console.log("Ready to send email with payload:", templateParams);
    }
});
