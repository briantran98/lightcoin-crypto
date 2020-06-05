class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const element of this.transactions) {
      balance += element.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }

}

class Withdrawal extends Transaction{
  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance === 0) {
      return false;
    } else if (this.account.balance + this.value < 0) {
      this.amount = this.account.balance;
    }
    return true;
  }

}

class Deposit extends Transaction{
  get value() {
    return this.amount
  }

  isAllowed() {
    return true;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('Snow-patrol');

t1 = new Deposit(120.00, myAccount);
// console.log("t1", t1)
t1.commit();

console.log('Balance:', myAccount.balance);

t2 = new Withdrawal(50.25, myAccount);
// console.log("t2", t2)
t2.commit();

t3 = new Withdrawal(9.99, myAccount);
t3.commit();

t4 = new Withdrawal(80, myAccount);
t4.commit();

t5 = new Withdrawal(80, myAccount);
t5.commit();


console.log('Balance:',myAccount.balance)

console.log('Transaction:',myAccount.transactions)
