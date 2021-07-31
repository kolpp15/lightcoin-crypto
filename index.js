class Account {
  constructor(username) {
    this.username = username;
    this.transaction = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transaction) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction  {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
console.log('--------------------------------------------------');
const myAccount = new Account('brian sohn');
console.log('this is my new account: ', myAccount);
console.log('Starting balance is: ', myAccount.balance);
console.log('--------------------------------------------------');

console.log('Attempting to withdraw should fail');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result: ', t1.commit());
console.log('Current Account Balance: ', myAccount.balance);
console.log('--------------------------------------------------');

console.log('Desposit should succeed');
const t2 = new Deposit(100.00, myAccount);
console.log('Commit result: ', t2.commit());
console.log('Current Account Balance: ', myAccount.balance);
console.log('--------------------------------------------------');

console.log('Now trying to withdraw');
const t3 = new Withdrawal(50.00, myAccount);
console.log('Commit result: ', t3.commit());
console.log('Current Account Balance: ', myAccount.balance);
console.log('--------------------------------------------------');

console.log('Account Transaction history: ', myAccount.transaction);

