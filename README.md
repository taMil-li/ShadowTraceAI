# 🕵️‍♂️ ShadowTrace AI

TOR Network De-Anonymization & Traffic Correlation Platform

ShadowTrace AI is an advanced forensic and analytical platform designed to trace TOR network activity by correlating exit-node traffic, relay metadata, and network flow patterns to estimate the most likely TOR entry (guard) nodes behind anonymous traffic.

Built for cybersecurity investigation, digital forensics, and law-enforcement research, ShadowTrace AI provides confidence-based origin prediction using real TOR relay data and traffic-flow modeling.


---

🚀 Problem Statement

> TOR – Unveil: Peel the Onion
Develop an analytical system to trace TOR network users by correlating activity patterns and TOR node data to identify probable origin IPs behind TOR-based traffic.




---

🧠 How ShadowTrace AI Works

ShadowTrace AI models how TOR builds circuits:

Client → Guard Node → Middle Node → Exit Node → Destination

We observe:

Exit-node traffic (PCAP / synthetic TOR flows)

Real TOR relay metadata (via Onionoo API)


We then mathematically rank all possible guard nodes and predict the most likely entry points.


---

🔍 Core Pipeline

1️⃣ Traffic Capture / Simulation

Upload PCAP OR use synthetic TOR-like traffic generator

Extract exit-node flows (IP, size, timing, packets)


2️⃣ TOR Relay Intelligence

Pulls real TOR relay data from Onionoo:

Bandwidth

Uptime

Guard probability

Family relationships

Geo & fingerprints



3️⃣ Flow-to-Relay Correlation Each guard node gets a score based on:

Guard selection probability

Normalized bandwidth

Normalized uptime

Flow compatibility


4️⃣ Elimination & Ranking

Removes same-family nodes

Removes impossible candidates

Ranks remaining guards


5️⃣ Confidence Engine Top nodes get:

Probability %

Flow-match score

Elimination breakdown



---

🧮 Scoring Model

Each guard node is scored using:

Score = 
0.45 × GuardProbability +
0.30 × BandwidthScore +
0.15 × UptimeScore +
0.10 × FlowMatch

This reflects how TOR actually selects guards:

High-bandwidth, long-running, high-probability relays are preferred.



---

📊 Dashboard Features

Exit → Destination mapping

Top 3 predicted entry nodes

Confidence % and probability bands

Fingerprints & country

Flow match visualization

Elimination statistics

Forensic export (JSON)



---

🧩 Key Capabilities

✔ TOR topology mapping
✔ Exit → Entry correlation
✔ Family-aware elimination
✔ Confidence scoring
✔ PCAP ingestion
✔ Synthetic TOR traffic
✔ Real Onionoo data
✔ Visualization dashboard


---

🛠️ Tech Stack

Frontend

React + Vite

React Router

Real-time visualization UI


Backend

FastAPI

TOR Onionoo API

Flow correlation engine

Data

PCAP parsing

Synthetic TOR traffic

JSON forensic export



---

🌐 Live Demo

Frontend

> https://shadowtraceai-2.onrender.com/



Backend API

> (Hosted on Render)




---

🧪 Example Output

Exit Node: 185.220.101.45
Destination: 172.217.16.195

Likely Entry Nodes:
1) 88.99.216.42 (Germany) – 33.43%
2) 91.210.25.8  (NL)      – 29.18%
3) 178.17.170.9 (FR)      – 21.12%


---

⚖️ Legal & Ethical Note

ShadowTrace AI is a research & forensic analysis prototype.
It does not break TOR encryption.
It uses statistical correlation and public metadata only.

This system is designed for:

Academic research

Cybercrime investigation

Network defense

Lawful forensic use



---

👨‍💻 Developed By

Tamil Selvan, Shivani, Vishnupriya 
St. Joseph’s Institute of Technology

---

⭐ If you like this project

Please ⭐ star the repository and share!
