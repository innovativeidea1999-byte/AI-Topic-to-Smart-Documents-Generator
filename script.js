const STORAGE_KEY = 'travelConciergePlanner';

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

const checklistItems = [
    'Passport validity checked (6+ months)',
    'Visa and entry documentation submitted',
    'Insurance policy active and downloaded',
    'Primary and backup payment methods prepared',
    'Airport transfer route confirmed',
    'Weather-appropriate packing completed'
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

function getFormData() {
    return {
        topic: document.getElementById('topic').value.trim(),
        tripType: document.getElementById('tripType').value,
        depth: document.getElementById('depth').value,
        budget: document.getElementById('budget').value,
        format: document.getElementById('format').value,
        departureDate: document.getElementById('departureDate').value,
        duration: document.getElementById('duration').value
    };
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getFormData()));
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
        const data = JSON.parse(raw);
        document.getElementById('topic').value = data.topic || '';
        document.getElementById('tripType').value = data.tripType || 'Solo Adventure';
        document.getElementById('depth').value = data.depth || 'Quick Plan';
        document.getElementById('budget').value = data.budget || 'Balanced';
        document.getElementById('format').value = data.format || 'Booking Dashboard';
        document.getElementById('departureDate').value = data.departureDate || '';
        document.getElementById('duration').value = data.duration || '';
    } catch (_error) {
        localStorage.removeItem(STORAGE_KEY);
    }
}

function renderChecklist() {
    const checklist = document.getElementById('checklist');
    checklist.innerHTML = checklistItems
        .map((item) => `<label><input type="checkbox"> <span>${item}</span></label>`)
        .join('');
}

function renderKpis(data) {
    const duration = Number(data.duration) || 'TBD';
    const kpis = [
        { label: 'Trip Days', value: duration },
        { label: 'Planning Depth', value: data.depth },
        { label: 'Budget Profile', value: data.budget },
        { label: 'Deliverables', value: deliverables.length }
    ];

    document.getElementById('kpis').innerHTML = kpis
        .map((item) => `<article><h3>${item.value}</h3><p>${item.label}</p></article>`)
        .join('');
}

function generate() {
    const data = getFormData();
    const hint = document.getElementById('plannerHint');

    if (!data.topic) {
        hint.textContent = 'Please enter your destination or travel theme.';
        return;
    }

    if (data.departureDate && new Date(data.departureDate) < new Date(new Date().toDateString())) {
        hint.textContent = 'Departure date is in the past. Update it to get accurate planning guidance.';
        return;
    }

    hint.textContent = 'Package generated successfully. Scroll down for details.';

    const summary = document.getElementById('summary');
    const grid = document.getElementById('deliverableGrid');
    const emptyState = document.querySelector('.output-empty');

    emptyState.style.display = 'none';
    summary.innerHTML = `
        <p><strong>Trip:</strong> ${data.topic}</p>
        <p><strong>Type:</strong> ${data.tripType}</p>
        <p><strong>Depth:</strong> ${data.depth}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Output:</strong> ${data.format}</p>
        <p><strong>Departure:</strong> ${data.departureDate || 'Flexible / TBD'}</p>
        <p><strong>Duration:</strong> ${data.duration || 'TBD'} day(s)</p>
        <p><strong>Status:</strong> ✅ Complete concierge tracks and AutoAnswer modules activated.</p>
    `;

    renderKpis(data);

    grid.innerHTML = deliverables
        .map((item) => `<article><h3>${item.title}</h3><p>${item.detail}</p></article>`)
        .join('');

    saveState();
    document.getElementById('outputCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function downloadSummary() {
    const text = document.getElementById('summary').innerText.trim();
    if (!text) {
        document.getElementById('plannerHint').textContent = 'Generate a package before downloading summary.';
        return;
    }

    const blob = new Blob([`Ultimate AI Travel Concierge\n\n${text}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'travel-concierge-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function resetPlanner() {
    document.getElementById('topic').value = '';
    document.getElementById('tripType').selectedIndex = 0;
    document.getElementById('depth').selectedIndex = 0;
    document.getElementById('budget').selectedIndex = 1;
    document.getElementById('format').selectedIndex = 0;
    document.getElementById('departureDate').value = '';
    document.getElementById('duration').value = '';

    document.querySelector('.output-empty').style.display = 'block';
    document.getElementById('summary').innerHTML = '';
    document.getElementById('deliverableGrid').innerHTML = '';
    document.getElementById('kpis').innerHTML = '';
    document.getElementById('autoanswerBox').textContent = 'Select a question to get an auto-generated travel answer.';
    document.getElementById('plannerHint').textContent = '';
    localStorage.removeItem(STORAGE_KEY);
}

function bindAutoAnswer() {
    const buttons = document.querySelectorAll('.qa-btn');
    const answerBox = document.getElementById('autoanswerBox');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.remove('active'));
            button.classList.add('active');

            const destination = document.getElementById('topic').value.trim() || 'your destination';
            const question = button.dataset.question;
            const template = answerTemplates[question];
            answerBox.textContent = template ? template(destination) : 'AutoAnswer is preparing your guidance.';
        });
    });
}

function bindPersistence() {
    ['topic', 'tripType', 'depth', 'budget', 'format', 'departureDate', 'duration'].forEach((id) => {
        document.getElementById(id).addEventListener('change', saveState);
    });
}

document.getElementById('generateBtn').addEventListener('click', generate);
document.getElementById('downloadBtn').addEventListener('click', downloadSummary);
document.getElementById('resetBtn').addEventListener('click', resetPlanner);

loadState();
renderChecklist();
bindAutoAnswer();
bindPersistence();
