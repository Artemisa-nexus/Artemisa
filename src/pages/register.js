
        // Form validation and submission
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorDiv = document.getElementById('passwordError');
            
            // Check if passwords match
            if (password !== confirmPassword) {
                errorDiv.classList.remove('hidden');
                return;
            } else {
                errorDiv.classList.add('hidden');
            }
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                password: password
            };
            
            // Here you would typically send the data to a server
            console.log('Registration data:', formData);
            alert('¡Registro exitoso!');
            
            // Reset form
            this.reset();
        });

        // Back button functionality
        document.getElementById('backBtn').addEventListener('click', function() {
            // You can customize this behavior
            if (window.history.length > 1) {
                window.history.back();
            } else {
                alert('Regresando...');
            }
        });

        // Real-time password confirmation validation
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            const errorDiv = document.getElementById('passwordError');
            
            if (confirmPassword && password !== confirmPassword) {
                errorDiv.classList.remove('hidden');
            } else {
                errorDiv.classList.add('hidden');
            }
        });
