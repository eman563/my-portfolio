document.addEventListener('DOMContentLoaded', () => {

    // --- Chrome Voice Pre-loader Activation ---
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
    }

    // --- Mobile Navigation Toggle Navigation Engine ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinksContainer.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navLinksContainer) {
                menuToggle.classList.remove('is-active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // --- Dynamic Navigation Translucent Shadow Control ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // --- Dynamic Scroll-Spy Component Navigation State Tracking ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    const playVideoBtn = document.getElementById("playVideoBtn");
    const portfolioVideo = document.getElementById("portfolioVideo");
    const videoCardContainer = document.getElementById("videoCardContainer");

    if (playVideoBtn && portfolioVideo && videoCardContainer) {
        playVideoBtn.addEventListener("click", function(e) {
            e.preventDefault(); 
            videoCardContainer.classList.add("video-playing");
            portfolioVideo.play();
        });
        portfolioVideo.addEventListener("pause", function() { videoCardContainer.classList.remove("video-playing"); });
        portfolioVideo.addEventListener("ended", function() { videoCardContainer.classList.remove("video-playing"); });
    }  

    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const extraProjects = document.querySelector(".extra-projects");
    if (viewMoreBtn && extraProjects) {
        viewMoreBtn.addEventListener("click", function() {
            extraProjects.classList.toggle("show-grid");
            if (extraProjects.classList.contains("show-grid")) {
                viewMoreBtn.textContent = "View Less";
                const newCards = extraProjects.querySelectorAll(".project-card");
                newCards.forEach((card, index) => {
                    card.style.animation = `slideFromBottom 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.15}s both`;
                });
            } else {
                viewMoreBtn.textContent = "View More";
            }
        });
    } 

    // --- Strict Scroll-Trigger Animation Controller Engine ---
    const scrollRevealConfig = { root: null, threshold: 0.15, rootMargin: "0px" }; 
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Counters/Numbers animation logic
                if(entry.target.querySelector('.counter')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        counter.classList.remove('animating'); 
                        runCounterAnimation(counter); 
                    });
                }
            } else {
                // Jab user section se door scroll kare, toh active class hata dein
                // Taake jab user Home se dobara niche aaye, toh animation phir se smoothly chale!
                entry.target.classList.remove('active');
            }
        });
    }, scrollRevealConfig);

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => { heroContent.classList.add('active'); }, 200);
    }

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => scrollObserver.observe(element));

    function runCounterAnimation(counterElement) {
        if (counterElement.classList.contains('animating')) return;
        counterElement.classList.add('animating');
        
        const targetValue = parseInt(counterElement.getAttribute('data-target'), 10);
        let currentCount = 0;
        const duration = 2000; 
        const frameRate = 1000 / 60; 
        const stepIncrement = targetValue / (duration / frameRate);

        const counterTimer = setInterval(() => {
            currentCount += stepIncrement;
            if (currentCount >= targetValue) {
                counterElement.textContent = targetValue;
                counterElement.classList.remove('animating');
                clearInterval(counterTimer);
            } else {
                counterElement.textContent = Math.floor(currentCount);
            }
        }, frameRate);
    }

    // --- Live EmailJS Backend Processing Engine ---
    const contactForm = document.getElementById('portfolio-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
            
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
            }

            emailjs.sendForm('service_xeqsbvu', 'template_3nwybwp', this)
                .then(function() {
                    if (submitBtn) {
                        submitBtn.textContent = 'Message Sent Successfully! 👍';
                        submitBtn.style.backgroundColor = '#28a745'; 
                        submitBtn.style.opacity = '1';
                    }
                    contactForm.reset();
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = ''; 
                            submitBtn.disabled = false;
                        }
                    }, 3000);
                }, function(error) {
                    if (submitBtn) {
                        submitBtn.textContent = 'Error! Try Again.';
                        submitBtn.style.backgroundColor = '#dc3545'; 
                        submitBtn.style.opacity = '1';
                    }
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = '';
                            submitBtn.disabled = false;
                        }
                    }, 3000);
                });
        });
    }

    // --- About Section Telemetry Cards Trigger Engine ---
    const aboutSection = document.querySelector(".scroll-reveal");
    const statsContainer = document.querySelector(".about-stats-container");
    let cardTimeout;

    if (aboutSection && statsContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    if (aboutSection.classList.contains("active")) {
                        clearTimeout(cardTimeout);
                        cardTimeout = setTimeout(() => { statsContainer.classList.add("show-cards"); }, 1400);
                    } else {
                        clearTimeout(cardTimeout);
                        statsContainer.classList.remove("show-cards");
                    }
                }
            });
        });
        observer.observe(aboutSection, { attributes: true });
    }

    // =============================================================
    // 💬 🎙️ 📞 ALL-IN-ONE PREMIUM AI CHAT & VOICE CALL LOGIC
    // =============================================================
    const sendButton = document.getElementById('send-btn'); 
    const messageInput = document.getElementById('chat-input'); 
    const chatWindow = document.getElementById('chat-window'); 
    const micInputBtn = document.getElementById('mic-input-btn');
    const startCallBtn = document.getElementById('start-call-btn');
    const endCallBtn = document.getElementById('end-call-btn');
    const callScreen = document.getElementById('call-screen');
    const callStatus = document.getElementById('call-status');
    const callLoadingDots = document.getElementById('call-loading-dots');

    let isCallActive = false;
    let isAriaSpeaking = false; 
    let isProcessingBackend = false; 

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const chatRecognition = new SpeechRecognition();
    chatRecognition.continuous = false;
    chatRecognition.interimResults = false;

    const callRecognition = new SpeechRecognition();
    callRecognition.interimResults = true; 
    callRecognition.continuous = false; 

    // 💬 TEXT CHAT MODE WITH ENTER TRIGGER
    if (sendButton) {
        sendButton.addEventListener('click', async () => {
            const messageText = messageInput.value.trim();
            if (messageText === '') return;

            appendMessage(messageText, 'user-message');
            messageInput.value = ''; 

            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'chat-typing-indicator';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            chatWindow.appendChild(typingDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            try {
                // LIVE UPDATED VERCEL BACKEND LINK FOR CHAT
                const response = await fetch('https://my-portfolio-backend-smoky-ten.vercel.app/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: messageText })
                });
                const data = await response.json();
                removeChatTypingIndicator();
                appendMessage(data.reply, 'server-message');
            } catch (error) {
                removeChatTypingIndicator();
                appendMessage("Sorry, connection error!", 'server-message');
            }
        });
    }

    if (messageInput && sendButton) {
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); 
                sendButton.click(); 
            }
        });
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = className;
        msgDiv.innerText = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function removeChatTypingIndicator() {
        const indicator = document.getElementById('chat-typing-indicator');
        if (indicator) indicator.remove();
    }

    // 🎙️ CHAT MIC FEATURE FIX
    if (micInputBtn) {
        micInputBtn.addEventListener('click', () => {
            try {
                chatRecognition.lang = ''; 
                chatRecognition.start();
                micInputBtn.innerText = "🛑";
                messageInput.placeholder = "Listening... Speak now";
            } catch(e) {}
        });

        chatRecognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            messageInput.value = text;
            micInputBtn.innerText = "🎙️";
            messageInput.placeholder = "Type a message...";
        };

        chatRecognition.onerror = () => { 
            micInputBtn.innerText = "🎙️"; 
            messageInput.placeholder = "Type a message...";
        };
        chatRecognition.onend = () => {
            micInputBtn.innerText = "🎙️";
            messageInput.placeholder = "Type a message...";
        };
    }

    // 📞 CONTINUOUS PHONE CALL SYSTEM
    if (startCallBtn) {
        startCallBtn.addEventListener('click', () => {
            isCallActive = true;
            isAriaSpeaking = false;
            isProcessingBackend = false;
            if (callScreen) callScreen.style.display = 'flex';
            if (callStatus) callStatus.innerText = "Connecting to Aria...";
            if (callLoadingDots) callLoadingDots.style.display = 'none';
            
            window.speechSynthesis.getVoices();

            setTimeout(() => {
                speakOutLoud("Hello! This is Aria. Ask me anything about Amara's pricing or built projects.", () => {
                    if (isCallActive) startListeningLoop();
                });
            }, 300);
        });
    }

    function startListeningLoop() {
        if (!isCallActive || isAriaSpeaking || isProcessingBackend) return;
        
        if (callStatus) callStatus.innerHTML = `🎤 <span style="color: #28a745; font-weight: bold;">Listening... Speak now</span>`;
        if (callLoadingDots) callLoadingDots.style.display = 'none';

        callRecognition.lang = ''; 
        try { callRecognition.start(); } catch(e) {}
    }

    callRecognition.onresult = async (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (interimTranscript.length > 0 && !isProcessingBackend) {
            if (callStatus) callStatus.innerHTML = `🗣️ <span style="color: #6c63ff; font-weight: bold;">You:</span> ${interimTranscript}`;
        }

        if (finalTranscript.trim().length > 0 && !isProcessingBackend) {
            isProcessingBackend = true;
            try { callRecognition.stop(); } catch(e) {}

            if (callStatus) callStatus.innerText = "🧠 Aria is thinking...";
            if (callLoadingDots) callLoadingDots.style.display = 'inline-flex';

            try {
                // LIVE UPDATED VERCEL BACKEND LINK FOR VOICE AGENT
                const response = await fetch('https://my-portfolio-backend-smoky-ten.vercel.app/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: finalTranscript })
                });

                const data = await response.json();

                if (isCallActive && data.reply) {
                    if (callStatus) callStatus.innerText = `Aria: ${data.reply}`;
                    if (callLoadingDots) callLoadingDots.style.display = 'none';
                    
                    speakOutLoud(data.reply, () => {
                        isProcessingBackend = false; 
                        if (isCallActive) setTimeout(startListeningLoop, 300); 
                    });
                } else {
                    isProcessingBackend = false;
                    if (isCallActive) startListeningLoop();
                }
            } catch (error) {
                if (callStatus) callStatus.innerText = "Aria is reloading...";
                isProcessingBackend = false;
                setTimeout(() => { if (isCallActive) startListeningLoop(); }, 1500);
            }
        }
    };

    callRecognition.onend = () => {
        if (isCallActive && !isAriaSpeaking && !isProcessingBackend) {
            setTimeout(() => { if (isCallActive) startListeningLoop(); }, 400);
        }
    };

    callRecognition.onerror = () => {
        if (isCallActive && !isAriaSpeaking && !isProcessingBackend) {
            setTimeout(startListeningLoop, 500);
        }
    };

    if (endCallBtn) {
        endCallBtn.addEventListener('click', () => {
            isCallActive = false;
            isAriaSpeaking = false;
            isProcessingBackend = false;
            try { callRecognition.stop(); } catch(e){}
            window.speechSynthesis.cancel();
            if (callScreen) callScreen.style.display = 'none';
        });
    }

    // --- VOICE UTILITY ENGINE ---
    function speakOutLoud(message, onEndCallback) {
        window.speechSynthesis.cancel(); 
        isAriaSpeaking = true; 
        
        const speech = new SpeechSynthesisUtterance();
        speech.text = message;
        speech.volume = 1.0;
        speech.rate = 1.0;  
        speech.pitch = 1.25; 

        const voices = window.speechSynthesis.getVoices();
        
        if (/[أ-يـا-ے]/.test(message)) {
            speech.lang = 'ur-PK'; 
            const urduVoice = voices.find(v => v.lang.includes('ur') || v.lang.includes('hi'));
            if (urduVoice) speech.voice = urduVoice;
        } else {
            speech.lang = 'en-US'; 
            const femaleVoice = voices.find(v => 
                v.lang.includes('en') && 
                (v.name.toLowerCase().includes('female') || 
                 v.name.toLowerCase().includes('zira') || 
                 v.name.toLowerCase().includes('google') || 
                 v.name.toLowerCase().includes('hazel') || 
                 v.name.toLowerCase().includes('natural'))
            );
            if (femaleVoice) speech.voice = femaleVoice;
        }

        let safetyTimeout = setTimeout(() => {
            if (isAriaSpeaking) {
                isAriaSpeaking = false;
                if (onEndCallback) onEndCallback();
            }
        }, (message.length * 90) + 1000);

        speech.onend = () => {
            clearTimeout(safetyTimeout);
            isAriaSpeaking = false; 
            if (onEndCallback) onEndCallback();
        };

        speech.onerror = () => {
            clearTimeout(safetyTimeout);
            isAriaSpeaking = false;
            if (onEndCallback) onEndCallback();
        };

        window.speechSynthesis.speak(speech);
    }
}); 

function toggleChat() {
    const chatBox = document.getElementById('chat-box-container');
    if (chatBox) {
        chatBox.style.display = (chatBox.style.display === 'none') ? 'flex' : 'none';
    }
}
