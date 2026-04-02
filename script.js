document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const shortenBtn = document.getElementById('shortenBtn');
    const resultArea = document.getElementById('resultArea');
    const errorArea = document.getElementById('errorArea');
    const errorText = document.getElementById('errorText');
    const shortUrlText = document.getElementById('shortUrlText');
    const copyBtn = document.getElementById('copyBtn');

    let countdownInterval;

    function startCountdown(seconds) {
        let remaining = seconds;
        shortenBtn.disabled = true;
        
        // Clear any existing interval
        if (countdownInterval) clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                shortenBtn.disabled = false;
                shortenBtn.innerHTML = '<span>Shorten</span><i class="fa-solid fa-arrow-right"></i>';
                errorArea.classList.add('hidden');
            } else {
                shortenBtn.innerHTML = `<span>Wait ${remaining}s...</span><i class="fa-solid fa-clock"></i>`;
            }
        }, 1000);
    }

    function showError(message, countdown = 0) {
        errorText.textContent = message;
        errorArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        
        if (countdown > 0) {
            startCountdown(countdown);
        } else {
            // Auto hide regular errors after 5s
            setTimeout(() => {
                if (countdown <= 0) errorArea.classList.add('hidden');
            }, 5000);
        }
    }

    // Handle Shorten Button Click
    shortenBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (!url) {
            showError('Please enter a valid URL');
            return;
        }

        // Reset state
        errorArea.classList.add('hidden');
        resultArea.classList.add('hidden');

        // Loading State
        shortenBtn.disabled = true;
        shortenBtn.innerHTML = '<span>Processing...</span><i class="fa-solid fa-spinner fa-spin"></i>';

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (response.ok) {
                // Show Result
                shortUrlText.textContent = data.shortUrl;
                resultArea.classList.remove('hidden');
                urlInput.value = '';
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                shortenBtn.disabled = false;
                shortenBtn.innerHTML = '<span>Shorten</span><i class="fa-solid fa-arrow-right"></i>';
            } else {
                if (response.status === 429) {
                    showError(data.error, 60); // 60 seconds countdown
                } else {
                    showError(data.error || 'Failed to shorten URL');
                    shortenBtn.disabled = false;
                    shortenBtn.innerHTML = '<span>Shorten</span><i class="fa-solid fa-arrow-right"></i>';
                }
            }
        } catch (err) {
            console.error('Error:', err);
            showError('Something went wrong. Please try again.');
            shortenBtn.disabled = false;
            shortenBtn.innerHTML = '<span>Shorten</span><i class="fa-solid fa-arrow-right"></i>';
        }
    });

    // Handle Copy Button Click
    copyBtn.addEventListener('click', () => {
        const textToCopy = shortUrlText.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            copyBtn.style.background = '#10b981';
            copyBtn.style.color = '#fff';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
            }, 2000);
        });
    });

    // Handle Enter Key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !shortenBtn.disabled) {
            shortenBtn.click();
        }
    });
});
