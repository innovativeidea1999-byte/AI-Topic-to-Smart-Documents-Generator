const deliverables = [
    {
        title: 'Executive Summary',
        detail: 'Trip strategy, timing windows, and budget posture overview.'
    },
    {
        title: 'Booking Dashboard',
        detail: 'Flight, stay, activity, and transfer checkpoints with cost snapshots.'
    },
    {
        title: 'Cultural Guide',
        detail: 'Etiquette basics, local norms, and practical language starter phrases.'
    },
    {
        title: 'Packing Checklist',
        detail: 'Climate-optimized clothing, tech, health, and document essentials.'
    },
    {
        title: 'Photography Guide',
        detail: 'Golden-hour capture schedule, location suggestions, and etiquette notes.'
    },
    {
        title: 'Safety & Insurance Brief',
        detail: 'Risk signals, coverage recommendations, and emergency action playbook.'
    },
    {
        title: 'Documentation Tracker',
        detail: 'Passport validity, visa workflow, and health documentation readiness.'
    },
    {
        title: 'Transit Navigation Plan',
        detail: 'Airport terminal guidance and door-to-door local mobility routing.'
    }
];

const answerTemplates = {
    weather: (destination) => `AutoAnswer: For ${destination}, prioritize a layered wardrobe and check 10-day forecasts before departure. Build two weather-proof backup activities for each outdoor plan.`,
    visa: (destination) => `AutoAnswer: For ${destination}, confirm passport validity (6+ months), visa class, entry rules, and health forms. Start document processing early to avoid delays.`,
    money: (destination) => `AutoAnswer: For ${destination}, combine a no-foreign-fee card with local ATM withdrawals. Keep a split wallet strategy and monitor exchange rates weekly.`,
    culture: (destination) => `AutoAnswer: For ${destination}, learn greeting phrases, local dining etiquette, and respectful dress norms for religious or heritage spaces.`,
    safety: (destination) => `AutoAnswer: For ${destination}, register emergency contacts, keep digital copies of documents, and choose travel insurance with health + disruption coverage.`,
    packing: (destination) => `AutoAnswer: For ${destination}, pack climate-specific layers, universal adapters, medication, photocopies of documents, and a compact day bag.`,
    transit: (destination) => `AutoAnswer: For ${destination}, pre-map airport-to-hotel routes, backup transport options, and offline maps for first-day navigation resilience.`,
    rewards: (destination) => `AutoAnswer: For ${destination}, align bookings with bonus categories, airline alliances, and hotel loyalty tiers to maximize points and upgrades.`
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
        <p><strong>Status:</strong> ✅ AutoAnswer engine activated across weather, visa, finance, culture, safety, packing, transit, and rewards.</p>
    `;

    grid.innerHTML = deliverables
        .map((item) => `
            <article>
                <h3>${item.title}</h3>
                <p>${item.detail}</p>
            </article>
        `)
        .join('');

    document.getElementById('outputCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
bindAutoAnswer();
