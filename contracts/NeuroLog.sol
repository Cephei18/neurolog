// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NeuroLog {

    enum Mood {
        Calm,
        Focused,
        Anxious,
        Overwhelmed
    }

    enum Status {
        Active,
        Completed,
        Expired
    }

    struct CheckIn {
        Mood mood;
        uint256 createdAt;
        uint256 deadline;
        Status status;
        uint256 stakeAmount;
    }

    mapping(address => CheckIn) public checkIns;

    modifier noActiveCheckIn() {
        require(
            checkIns[msg.sender].status != Status.Active,
            "Active check-in already exists"
        );
        _;
    }

    function createCheckIn(
        Mood _mood,
        uint256 _durationSeconds
    ) public payable noActiveCheckIn {

        require(_durationSeconds > 0, "Duration must be positive");
        require(msg.value > 0, "Stake required");

        checkIns[msg.sender] = CheckIn({
            mood: _mood,
            createdAt: block.timestamp,
            deadline: block.timestamp + _durationSeconds,
            status: Status.Active,
            stakeAmount: msg.value
        });
    }

    function completeCheckIn() public {
        CheckIn storage userCheckIn = checkIns[msg.sender];

        require(userCheckIn.status == Status.Active, "No active check-in");
        require(block.timestamp <= userCheckIn.deadline, "Deadline passed");

        userCheckIn.status = Status.Completed;

        uint256 refund = userCheckIn.stakeAmount;
        userCheckIn.stakeAmount = 0;

        (bool success, ) = msg.sender.call{value: refund}("");
        require(success, "ETH refund failed");
    }

    function expireCheckIn() public {
        CheckIn storage userCheckIn = checkIns[msg.sender];

        require(userCheckIn.status == Status.Active, "No active check-in");
        require(block.timestamp > userCheckIn.deadline, "Deadline not reached");

        userCheckIn.status = Status.Expired;
        // stake remains locked
    }

    function getMyCheckIn() public view returns (CheckIn memory) {
        return checkIns[msg.sender];
    }
}
