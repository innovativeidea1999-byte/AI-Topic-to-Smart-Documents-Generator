function generate() {
    const topic = document.getElementById('topic').value.trim();
    const format = document.getElementById('format').value;
    const tripType = document.getElementById('tripType').value;
    const depth = document.getElementById('depth').value;

    if (!topic) {
        alert('Please enter your destination or travel theme.');
        return;
    }

    const deliverables = [
        'Executive Summary',
        'Booking Dashboard',
        'Cultural Guide',
        'Packing Checklist',
        'Photography Guide',
        'Safety Brief',
        'Documentation Requirements',
        'Transit Navigation Plan'
    ];

    alert(
        `Your Ultimate AI Travel Concierge package is being prepared!\n\n` +
        `Trip: ${topic}\nType: ${tripType}\nDepth: ${depth}\nOutput: ${format}\n\n` +
        `The 18-agent system is assembling:\n• ${deliverables.join('\n• ')}\n\n` +
        `(Demo mode: Connect backend APIs for live fares, weather, and visa data.)`
    );
}
