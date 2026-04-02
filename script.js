document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const shortenBtn = document.getElementById('shortenBtn');
    const resultArea = document.getElementById('resultArea');
    const shortUrlText = document.getElementById('shortUrlText');
    const copyBtn = document.getElementById('copyBtn');

    // Handle Shorten Button Click
    shortenBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (!url) {
            alert('Please enter a valid URL');
            return;
        }

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
                
                // Clear input
                urlInput.value = '';
                
                // Scroll into view
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                alert(data.error || 'Failed to shorten URL');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            // Restore Button State
            shortenBtn.disabled = false;
            shortenBtn.innerHTML = '<span>Shorten</span><i class="fa-solid fa-arrow-right"></i>';
        }
    });

    // Handle Copy Button Click
    copyBtn.addEventListener('click', () => {
        const textToCopy = shortUrlText.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual feedback
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
        if (e.key === 'Enter') {
            shortenBtn.click();
        }
    });
});
