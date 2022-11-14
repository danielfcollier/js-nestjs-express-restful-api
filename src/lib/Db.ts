class Db {
  private static readAll() {
    return global.dbData;
  }

  static reset() {
    global.dbData = '';
  }

  static create(account) {
    const data = this.readAll();
    if (data) {
      data.push[account];
    }

    const result = data ? data : [account];

    global.dbData = result;
  }

  static read(id) {
    const data = this.readAll();
    const getElement = () => {
      const filteredData = data.filter((element) => element.id === id);
      return filteredData.length === 1 ? filteredData[0] : null;
    };

    const result = data ? getElement() : null;
    return result;
  }

  static increment(account, amount) {
    return this.update(account, amount);
  }

  static decrement(account, amount) {
    return this.update(account, -amount);
  }

  private static update(account, amount) {
    const data = this.readAll();

    if (!data) {
      throw new Error();
    }

    const updatedAccount = { ...account, balance: account.balance + amount };
    const updatedData = [
      ...data.filter((element) => element.id !== account.id),
      updatedAccount,
    ];

    global.dbData = updatedData;

    return updatedAccount;
  }
}

export default Db;
