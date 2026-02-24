document.addEventListener("DOMContentLoaded", () => {
    
    // --- View Switching Logic ---
    const btnConsumer = document.getElementById('btn-consumer');
    const btnOwner = document.getElementById('btn-owner');
    const viewConsumer = document.getElementById('consumer-view');
    const viewOwner = document.getElementById('owner-view');

    btnConsumer.addEventListener('click', () => {
        btnConsumer.classList.add('active');
        btnOwner.classList.remove('active');
        viewConsumer.classList.add('active');
        viewConsumer.classList.remove('hidden');
        viewOwner.classList.remove('active');
        viewOwner.classList.add('hidden');
    });

    btnOwner.addEventListener('click', () => {
        btnOwner.classList.add('active');
        btnConsumer.classList.remove('active');
        viewOwner.classList.add('active');
        viewOwner.classList.remove('hidden');
        viewConsumer.classList.remove('active');
        viewConsumer.classList.add('hidden');
        
        // Render charts when dashboard is opened
        renderCharts();
    });

    // Make sure owner view is hidden initially
    viewOwner.classList.add('hidden');


    // --- Consumer App Logic ---
    let ticketBalance = 3;
    const ticketBalanceEl = document.getElementById('ticket-balance');
    const btnDevTrigger = document.getElementById('dev-trigger-offer');
    const guerrillaOfferSection = document.getElementById('guerrilla-offer');
    const waitSection = document.getElementById('wait-state');
    const btnBuy = document.getElementById('btn-buy');
    const successOverlay = document.getElementById('success-overlay');
    const btnCloseOverlay = document.getElementById('btn-close-overlay');

    // Display initial ticket balance
    ticketBalanceEl.innerText = ticketBalance;

    // Trigger the secret offer
    btnDevTrigger.addEventListener('click', () => {
        waitSection.classList.add('hidden');
        guerrillaOfferSection.classList.remove('hidden');
    });

    // Purchase the Mystery Bag
    btnBuy.addEventListener('click', () => {
        if (ticketBalance >= 1) {
            // Deduct ticket
            ticketBalance -= 1;
            ticketBalanceEl.innerText = ticketBalance;

            // Show Success Overlay
            successOverlay.classList.remove('hidden');
            
            // Hide the offer again
            guerrillaOfferSection.classList.add('hidden');
            waitSection.classList.remove('hidden');
            waitSection.querySelector('p').innerText = '本日のレスキューオファーは確保済みです。';
            btnDevTrigger.classList.add('hidden');

        } else {
            alert('チケットが不足しています。昼間に通常のお買い物をしてチケットを貯めましょう！');
        }
    });

    // Close Overlay
    btnCloseOverlay.addEventListener('click', () => {
        successOverlay.classList.add('hidden');
    });


    // --- Owner Dashboard Logic (Chart.js Data Visualization) ---
    let chartsRendered = false;

    function renderCharts() {
        if(chartsRendered) return; // Prevent creating multiple chart instances
        
        const ctxAttr = document.getElementById('userAttrChart').getContext('2d');
        const ctxSales = document.getElementById('salesChart').getContext('2d');

        // Chart 1: Demographics (Proving Cannibalization Prevention)
        // Shows that people using the rescue are the high-purchasing normal buyers
        new Chart(ctxAttr, {
            type: 'bar',
            data: {
                labels: ['超優良客 (月3万円~)', '優良客 (月1万円~)', '一般客', '新規/レスキューのみ'],
                datasets: [{
                    label: 'レスキューバッグ利用回数割合',
                    data: [45, 35, 15, 5],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)', // Blue
                        'rgba(46, 204, 113, 0.8)', // Green
                        'rgba(241, 196, 15, 0.8)', // Yellow
                        'rgba(231, 76, 60, 0.8)'   // Red
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: { display: true, text: '割合 (%)' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        // Chart 2: Daily Recovered Sales (KPI)
        new Chart(ctxSales, {
            type: 'line',
            data: {
                labels: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
                datasets: [{
                    label: '回収した売上（円）',
                    data: [4500, 3000, 5000, 2500, 6000, 8000, 7500],
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        chartsRendered = true;
    }

});
