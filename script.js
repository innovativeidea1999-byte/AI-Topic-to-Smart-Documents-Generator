const deliverables = [
    { title: 'Executive Summary', detail: 'Trip strategy, timing windows, and budget posture overview.' },
    { title: 'Booking Dashboard', detail: 'Flight, stay, activity, and transfer checkpoints with cost snapshots.' },
    { title: 'Cultural Guide', detail: 'Etiquette basics, local norms, and practical language starter phrases.' },
    { title: 'Packing Checklist', detail: 'Climate-optimized clothing, tech, health, and document essentials.' },
    { title: 'Photography Guide', detail: 'Golden-hour capture schedule, location suggestions, and etiquette notes.' },
    { title: 'Safety & Insurance Brief', detail: 'Risk signals, coverage recommendations, and emergency action playbook.' },
    { title: 'Documentation Tracker', detail: 'Passport validity, visa workflow, and health documentation readiness.' },
    { title: 'Transit Navigation Plan', detail: 'Airport terminal guidance and door-to-door local mobility routing.' }
];

const answerTemplates = {
    weather: (destination) => `AutoAnswer: For ${destination}, prioritize layered outfits and check rolling 10-day forecasts. Keep at least two indoor backup options each day.`,
    visa: (destination) => `AutoAnswer: For ${destination}, verify passport validity (6+ months), visa category, and entry-health forms. Start paperwork early to avoid bottlenecks.`,
    money: (destination) => `AutoAnswer: For ${destination}, use a no-foreign-fee card plus local ATM withdrawals. Split cash/cards and monitor exchange trends weekly.`,
    culture: (destination) => `AutoAnswer: For ${destination}, learn greetings, dining norms, and location-specific dress etiquette for respectful interactions.`,
    safety: (destination) => `AutoAnswer: For ${destination}, keep digital backups of IDs, register emergency contacts, and secure insurance covering health + trip disruption.`,
    packing: (destination) => `AutoAnswer: For ${destination}, prepare climate-ready layers, adapters, meds, paper copies of documents, and a light day bag.`,
    transit: (destination) => `AutoAnswer: For ${destination}, pre-map airport-to-stay transfers, alternative transport routes, and offline navigation for day one.`,
    rewards: (destination) => `AutoAnswer: For ${destination}, align bookings with bonus categories, alliance partners, and loyalty programs to maximize points and upgrades.`
};

function generate() {
    const topic = document.getElementById('topic').value.trim();
    const format = document.getElementById('format').value;
    const tripType = document.getElementById('tripType').value;
    const depth = document.getElementById('depth').value;
    const departureDate = document.getElementById('departureDate').value;

    if (!topic) {
        alert('Please enter your destination or travel theme.');
        return;
    }

    const summary = document.getElementById('summary');
    const grid = document.getElementById('deliverableGrid');
    const emptyState = document.querySelector('.output-empty');

    emptyState.style.display = 'none';
    summary.innerHTML = `
        <p><strong>Trip:</strong> ${topic}</p>
        <p><strong>Type:</strong> ${tripType}</p>
        <p><strong>Depth:</strong> ${depth}</p>
        <p><strong>Output:</strong> ${format}</p>
        <p><strong>Departure:</strong> ${departureDate || 'Flexible / TBD'}</p>
        <p><strong>Status:</strong> ✅ Refreshed package generated with all concierge tracks and AutoAnswer modules active.</p>
    `;

    grid.innerHTML = deliverables
        .map((item) => `<article><h3>${item.title}</h3><p>${item.detail}</p></article>`)
        .join('');

    document.getElementById('outputCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetPlanner() {
    document.getElementById('topic').value = '';
    document.getElementById('tripType').selectedIndex = 0;
    document.getElementById('depth').selectedIndex = 0;
    document.getElementById('format').selectedIndex = 0;
    document.getElementById('departureDate').value = '';

    document.querySelector('.output-empty').style.display = 'block';
    document.getElementById('summary').innerHTML = '';
    document.getElementById('deliverableGrid').innerHTML = '';
    document.getElementById('autoanswerBox').textContent = 'Select a question to get an auto-generated travel answer.';
}

function bindAutoAnswer() {
    const buttons = document.querySelectorAll('.qa-btn');
    const answerBox = document.getElementById('autoanswerBox');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const destination = document.getElementById('topic').value.trim() || 'your destination';
            const question = button.dataset.question;
            const template = answerTemplates[question];
            answerBox.textContent = template ? template(destination) : 'AutoAnswer is preparing your guidance.';
        });
    });
}

document.getElementById('generateBtn').addEventListener('click', generate);
document.getElementById('resetBtn').addEventListener('click', resetPlanner);
bindAutoAnswer();
