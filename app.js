alert("app.js is running");

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
    alert("Please install MetaMask");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  walletAddressEl.innerText = `Connected: ${await signer.getAddress()}`;
};

createBtn.onclick = async () => {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  const mood = Number(document.getElementById("mood").value);
  const durationMinutes = Number(document.getElementById("duration").value);
  const stakeEth = document.getElementById("stake").value;

  const durationSeconds = durationMinutes * 60;
  const value = ethers.utils.parseEther(stakeEth); // ✅ v5 correct

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
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  const tx = await contract.completeCheckIn();
  await tx.wait();
  loadCheckIn();
};

async function loadCheckIn() {
  if (!contract) return;

  const data = await contract.getMyCheckIn();

  const moodMap = ["Calm", "Focused", "Anxious", "Overwhelmed"];
  const statusMap = ["Active", "Completed", "Expired"];

  output.innerText = `
Mood: ${moodMap[data[0]]}
Created: ${new Date(data[1].toNumber() * 1000)}
Deadline: ${new Date(data[2].toNumber() * 1000)}
Status: ${statusMap[data[3]]}
Stake (wei): ${data[4].toString()}
Exists: ${data[5]}
`;
}
