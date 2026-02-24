document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnConsumer = document.getElementById('btn-consumer');
    const btnOwner = document.getElementById('btn-owner');
    const viewConsumer = document.getElementById('consumer-view');
    const viewOwner = document.getElementById('owner-view');

    const ticketBalance = document.getElementById('ticket-balance');
    const guerrillaOffer = document.getElementById('guerrilla-offer');
    const waitState = document.getElementById('wait-state');
    const btnBuy = document.getElementById('btn-buy');
    const devTriggerOffer = document.getElementById('dev-trigger-offer');
    const successOverlay = document.getElementById('success-overlay');
    const btnCloseOverlay = document.getElementById('btn-close-overlay');

    // View Switching
    btnConsumer.addEventListener('click', () => {
        btnConsumer.classList.add('active');
        btnOwner.classList.remove('active');
        viewConsumer.classList.add('active');
        viewOwner.classList.remove('active');
    });

    btnOwner.addEventListener('click', () => {
        btnOwner.classList.add('active');
        btnConsumer.classList.remove('active');
        viewOwner.classList.add('active');
        viewConsumer.classList.remove('active');
        
        // Render charts when dashboard is opened
        renderCharts();
    });

    // Make sure owner view is hidden initially
    viewOwner.classList.remove('active');

    // Consumer Logic
    let tickets = parseInt(ticketBalance.innerText);

    // Trigger offer manually (for demo)
    devTriggerOffer.addEventListener('click', () => {
        waitState.classList.add('hidden');
        guerrillaOffer.classList.remove('hidden');
        // Add a small animation effect
        guerrillaOffer.style.animation = 'none';
        guerrillaOffer.offsetHeight; // trigger reflow
        guerrillaOffer.style.animation = null; 
    });

    // Buy action
    btnBuy.addEventListener('click', () => {
        if (tickets > 0) {
            tickets--;
            ticketBalance.innerText = tickets;
            
            // Show success overlay
            successOverlay.classList.remove('hidden');
            guerrillaOffer.classList.add('hidden');
            
            // Animate ticket change
            ticketBalance.style.color = '#ff4d4f';
            ticketBalance.style.transform = 'scale(1.5)';
            setTimeout(() => {
                ticketBalance.style.color = '';
                ticketBalance.style.transform = '';
            }, 300);

        } else {
            alert("チケットが足りません。お買い物をしてチケットを集めましょう！");
        }
    });

    // Close success overlay
    btnCloseOverlay.addEventListener('click', () => {
        successOverlay.classList.add('hidden');
        waitState.classList.remove('hidden');
    });

    // Owner Dashboard Charts Logic
    let chartsRendered = false;

    function renderCharts() {
        if (chartsRendered) return;
        
        // Chart 1: User Attributes
        const ctxAttr = document.getElementById('userAttrChart');
        if (ctxAttr) {
            new Chart(ctxAttr, {
                type: 'doughnut',
                data: {
                    labels: ['月3回以上来店 (優良客)', '月1-2回 (一般客)', '初回/レスキューのみ'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: [
                            '#ff4d4f',
                            '#ff7875',
                            '#f0f0f0'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // Chart 2: Daily Sales Recovery
        const ctxSales = document.getElementById('salesChart');
        if (ctxSales) {
            new Chart(ctxSales, {
                type: 'bar',
                data: {
                    labels: ['月', '火', '水', '木', '金', '土', '日'],
                    datasets: [{
                        label: '回収できた売上額 (円)',
                        data: [4500, 3000, 6000, 5500, 8000, 4000, 3500],
                        backgroundColor: '#ff4d4f',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
        
        chartsRendered = true;
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
