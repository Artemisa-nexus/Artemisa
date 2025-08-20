
        // Simple JavaScript for button interactions
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('button');
            
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Add a simple click effect
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        });
   