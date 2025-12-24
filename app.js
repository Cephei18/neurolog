alert("app.js is running");
const ethers = window.ethers;

let provider;
let signer;
let contract;

const CONTRACT_ADDRESS = "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5";

const ABI = [
  "function createCheckIn(uint8,uint256) payable",
  "function completeCheckIn()",
  "function getMyCheckIn() view returns (tuple(uint8,uint256,uint256,uint8,uint256,bool))"
];

const connectBtn = document.getElementById("connectBtn");
const walletAddressEl = document.getElementById("walletAddress");
const createBtn = document.getElementById("createBtn");
const refreshBtn = document.getElementById("refreshBtn");
const completeBtn = document.getElementById("completeBtn");
const output = document.getElementById("checkinOutput");

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  walletAddressEl.innerText = `Connected: ${await signer.getAddress()}`;
};

createBtn.onclick = async () => {
  const mood = document.getElementById("mood").value;
  const durationMinutes = document.getElementById("duration").value;
  const stakeEth = document.getElementById("stake").value;

  const durationSeconds = durationMinutes * 60;
  const value = ethers.parseEther(stakeEth);

  const tx = await contract.createCheckIn(
    mood,
    durationSeconds,
    { value }
  );

  await tx.wait();
  loadCheckIn();
};

refreshBtn.onclick = loadCheckIn;

completeBtn.onclick = async () => {
  const tx = await contract.completeCheckIn();
  await tx.wait();
  loadCheckIn();
};

async function loadCheckIn() {
  const data = await contract.getMyCheckIn();

  const moodMap = ["Calm", "Focused", "Anxious", "Overwhelmed"];
  const statusMap = ["Active", "Completed", "Expired"];

  output.innerText = `
Mood: ${moodMap[data[0]]}
Created: ${new Date(Number(data[1]) * 1000)}
Deadline: ${new Date(Number(data[2]) * 1000)}
Status: ${statusMap[data[3]]}
Stake (wei): ${data[4]}
Exists: ${data[5]}
`;
}