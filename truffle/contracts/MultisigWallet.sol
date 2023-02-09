// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

contract MultisigWallet {
    event Deposit(address indexed sender, uint amount);
    event Submit(uint indexed txIndex );
    event Approve(address indexed owner, uint indexed txIndex);
    event Revoke(address indexed owner, uint indexed txIndex);
    event Execute( uint indexed txIndex);

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint nbrAprovals;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public NbrApprovalRequired;

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public isApproved;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner!");
        _;
    }
    modifier txIndexExists(uint _txIndex) {
        require(_txIndex < transactions.length, "transaction index does not exists!");
        _;
    }
    modifier notApproved(uint _txIndex) {
        require(!isApproved[_txIndex][msg.sender], "already approved!");
        _;
    }
    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "already executed!");
        _;
    }

    constructor(address[] memory _owners , uint _required ){
        require(_owners.length > 0, "owners are required ");
        require(_required > 0 && _required <= _owners.length , "invalid number of required approvals");

        for( uint i ; i < _owners.length ; i++){
            require(_owners[i] != address(0), "invalid owner");
            require(!isOwner[_owners[i]], "duplicate owner");

            isOwner[_owners[i]] = true;
            owners.push(_owners[i]);
        }
        
        NbrApprovalRequired = _required ;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submit(address _to, uint _value, bytes calldata _data) 
        external
        onlyOwner
    {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            nbrAprovals: 0
        }));
        emit Submit(transactions.length - 1);
    }

    function approve(uint _txIndex) 
        external 
        onlyOwner
        txIndexExists(_txIndex)
        notApproved(_txIndex)
        notExecuted(_txIndex)
    {
        isApproved[_txIndex][msg.sender] = true;
        transactions[_txIndex].nbrAprovals ++;
        emit Approve(msg.sender, _txIndex);
    }

    function execute(uint _txIndex) 
        external 
        onlyOwner 
        txIndexExists(_txIndex) 
        notExecuted(_txIndex) 
    {
        require(transactions[_txIndex].nbrAprovals >= NbrApprovalRequired, "Approvals < required");
        Transaction storage transaction = transactions[_txIndex];

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );

        require(success , " transaction failed!");

        emit Execute(_txIndex);
    }

    function revoke(uint _txIndex) 
        external
        onlyOwner
        txIndexExists(_txIndex)
        notExecuted(_txIndex)
    {
        require(isApproved[_txIndex][msg.sender], "already not approved!");
        isApproved[_txIndex][msg.sender] = false ;
        transactions[_txIndex].nbrAprovals --;
        emit Revoke(msg.sender, _txIndex);
    }

    function getOwners() public view returns(address[] memory){
        return owners;
    }

    function getTransactions() public view returns(Transaction[] memory){
        return transactions;
    }
}