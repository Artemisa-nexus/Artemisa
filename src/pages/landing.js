
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'artemisa-pink': '#E879A6',
                        'artemisa-orange': '#F5B041',
                        'artemisa-light-pink': '#F8BBD9',
                    }
                }
            }
        }



       
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
   