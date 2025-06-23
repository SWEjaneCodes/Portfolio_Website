// Configuration - CHANGE YOUR DETAILS HERE
        const config = {
            resumeFile: 'resume/Jane_resume.docx',
            fileName: 'Jane_resume.pdf',
            yourEmail: 'janesgeo@gmail.com', // Change this email
            subject: 'Job Opportunity for Jane George',
            body: 'Hello Jane,\n\nI was impressed by your portfolio and would like to discuss a potential opportunity with you.\n\nBest regards,\n[Your Name]'
        };
        
        // Set email dynamically when modal opens
        function openEmailModal() {
            const modal = document.getElementById('email-modal');
            modal.style.display = 'block';
            
            // Update email address in modal
            document.getElementById('email-address').textContent = config.yourEmail;
            
            // Generate webmail links
            const body = encodeURIComponent(config.body);
            document.querySelector('.gmail').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${config.yourEmail}&su=${encodeURIComponent(config.subject)}&body=${body}`;
            document.querySelector('.outlook').href = `https://outlook.office.com/mail/deeplink/compose?to=${config.yourEmail}&subject=${encodeURIComponent(config.subject)}&body=${body}`;
            document.querySelector('.yahoo').href = `https://compose.mail.yahoo.com/?to=${config.yourEmail}&subject=${encodeURIComponent(config.subject)}&body=${body}`;
            
            // Other email option
            document.getElementById('other-email').href = `mailto:${config.yourEmail}?subject=${encodeURIComponent(config.subject)}&body=${body}`;
        }
        
        // Close modal function
        function closeModal() {
            document.getElementById('email-modal').style.display = 'none';
        }
        
        // ========================
        // RESUME DOWNLOAD FUNCTION
        // ========================
        // Download Resume Function (for DOCX file) 
        function downloadResume() {
            // Create temporary download link
            const link = document.createElement('a');
            
            // Set the file path and download name
            link.href = config.resumeFile;
            link.download = config.fileName;
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // =====================
        // EVENT LISTENERS
        // =====================
        // Download Resume button
        document.getElementById('download-btn').addEventListener('click', (e) => {
            e.preventDefault();
            downloadResume();
        });
        
        document.getElementById('hire-btn').addEventListener('click', (e) => {
            e.preventDefault();
            // Try mailto first
            const mailtoLink = `mailto:${config.yourEmail}?subject=${encodeURIComponent(config.subject)}&body=${encodeURIComponent(config.body)}`;
            window.location.href = mailtoLink;
            
            // Show fallback if mailto doesn't work
            setTimeout(() => {
                if (!document.hidden) openEmailModal();
            }, 500);
        });
        
        // Modal close button
        document.getElementById('modal-close-btn').addEventListener('click', closeModal);
        
        // Copy email to clipboard
        document.getElementById('copy-email').addEventListener('click', () => {
            navigator.clipboard.writeText(config.yourEmail).then(() => {
                const btn = document.getElementById('copy-email');
                btn.innerHTML = '<i class="fas fa-check"></i> Copied to Clipboard!';
                btn.style.background = '#27ae60';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i> Copy Email Address';
                    btn.style.background = '#3498db';
                }, 2000);
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('email-modal');
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });