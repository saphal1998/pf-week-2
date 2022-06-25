
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeadManSwitch is Ownable {
    event TransferComplete(address oldId, address newId, uint amount);
    uint lastOwnerBlock;
    address private constant ethReceiver = 0xF4007F0b07E4b1282a5861Bc4194098B60E59fbe;

    function still_alive() external payable {
        if(msg.sender == owner()) {
            lastOwnerBlock = block.number;
        }
        if(block.number - lastOwnerBlock > 10) {
            uint balance = address(this).balance;
            // this was balance by 2 in the contract for testing purposes
            payable(ethReceiver).transfer(balance);
            emit TransferComplete(address(this), ethReceiver, balance);
        }
    }

    receive() external payable {}
}