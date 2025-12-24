# 🧠 NeuroLog  
**On-Chain Emotional Check-In & Self-Commitment Journal**

NeuroLog is a Web3 experiment that explores how blockchain can be used beyond finance — specifically for **mental well-being, emotional awareness, and self-accountability**.

Instead of trading or speculation, NeuroLog allows users to:
- Log an emotional or cognitive state
- Commit to a small self-care action
- Optionally stake test ETH to reinforce consistency
- Build a verifiable on-chain record of commitments

The project was built end-to-end within a hackathon timeframe with a focus on **human-centric Web3 design**.

---

## ✨ Why NeuroLog?

Most mental-health tools are either:
- Private journals with no accountability, or  
- Rigid productivity trackers that ignore emotional context  

NeuroLog explores a third approach:
- **Ownership** of personal commitment data  
- **Persistence** through blockchain state  
- **Autonomy** without centralized platforms  
- **Privacy-aware design** with minimal on-chain data  

This makes it especially relevant for neurodiverse and accessibility-focused use cases.

---

## 🏗️ Architecture Overview

### Smart Contract (Solidity)
- Deployed on **Sepolia testnet**
- Handles all core logic:
  - Emotional check-in creation
  - Time-bound self-commitments
  - Optional ETH staking
  - State transitions (Active → Completed / Expired)

**On-chain data includes:**
- User wallet address
- Timestamp and deadline
- Commitment status
- Staked amount
- Existence flag

**Off-chain by design:**
- Emotional notes
- Descriptive context  
(to preserve user privacy)

---

### Frontend
- Built using **HTML, CSS, and JavaScript**
- Calm, pastel UI designed for mental-health use cases
- Intended user flow:
  1. Connect wallet
  2. Select mood
  3. Set duration and stake
  4. Create check-in
  5. View or complete commitment

> Note: During the hackathon, strict Content Security Policies on the hosting platform prevented browser-based ethers.js initialization within the time window.  
> The **smart contract itself is fully deployed and verified on-chain**.

---

## 🔗 Deployed Contract

- **Network:** Sepolia Testnet  
- **Contract Address:**  

The contract was tested directly via Remix using:
- `createCheckIn`
- `getMyCheckIn`
- `completeCheckIn`

All state transitions and staking logic function as intended.

---

## 🧪 Key Solidity Concepts Used

- `struct` for modeling user check-ins  
- `enum` for commitment states  
- `mapping` for per-user storage  
- `payable` functions for ETH staking  
- Time-based logic using `block.timestamp`  
- Defensive checks using `require`  

This project served as a hands-on introduction to **Solidity smart contract design**.

---

## 🎯 Hackathon Scope

**MVP focus:**
- One active check-in per user
- Simple staking incentive
- Read-only status dashboard
- Privacy-aware on-chain footprint

**Future extensions:**
- Encrypted off-chain journaling
- Multiple commitments per user
- Consistency analytics (off-chain)
- Accessibility-first UX improvements

---

## 🧠 Learning Outcomes

Through NeuroLog, I learned:
- How to design Solidity contracts around real human behavior
- How to safely handle ETH in smart contracts
- How to balance privacy and transparency in Web3
- How deployment environments affect Web3 frontends
- How to ship a meaningful project under time constraints

---

## 📽️ Demo

The demo video includes:
- Concept walkthrough
- Smart-contract interaction via Remix
- Frontend UX overview
- Explanation of architectural decisions

*(Demo link provided in submission)*

---

## 🌱 Final Note

NeuroLog is not about profit or speculation.  
It is an exploration of how **Web3 can support personal growth, accountability, and mental well-being**.

