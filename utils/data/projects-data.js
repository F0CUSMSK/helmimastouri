export const projectsData = [
    {
        id: 1,
        name: 'Azure Network Security Simulation (PFA)',
        description: "Constructed a full attack/defense lab on Azure mapping TTPs to MITRE ATT&CK. Deployed a T-Pot honeypot that logged 1,000+ real attacks and secured the perimeter with a FortiGate firewall and IPsec VPN.",
        tools: ['Azure', 'MITRE ATT&CK', 'T-Pot Honeypot', 'FortiGate', 'IPsec VPN', 'Wireshark'],
        role: 'Security Engineer',
        code: '',
        demo: '',
    },
    {
        id: 2,
        name: 'Shift-Left Static Analysis Pipeline',
        description: 'Chained Checkov, Tfsec, Ansible-Lint, and Gitleaks to run against terragoat, outputting severity-ranked HTML remediation dashboards on every PR.',
        tools: ['Checkov', 'Tfsec', 'Ansible-Lint', 'Gitleaks', 'GitHub Actions', 'Terraform'],
        role: 'DevSecOps Engineer',
        code: '',
        demo: '',
    },
    {
        id: 3,
        name: 'Python Open-Source Security Tools',
        description: 'Developed a multi-threaded TCP PortScanner hitting 1,000 ports in ~40s, and a bidirectional ARP Spoofer for LAN-level MITM host-isolation.',
        tools: ['Python', 'Scapy', 'Threading', 'Socket', 'Nmap'],
        role: 'Security Tool Developer',
        code: '',
        demo: '',
    },
    {
        id: 4,
        name: 'Speech Emotion Recognition',
        description: "Trained a CNN+LSTM classifier on RAVDESS, transferring anomaly-detection patterns to behavioral security analytics.",
        tools: ['Python', 'TensorFlow', 'Keras', 'RAVDESS', 'CNN', 'LSTM'],
        code: '',
        demo: '',
        role: 'ML/Security Researcher',
    }
];