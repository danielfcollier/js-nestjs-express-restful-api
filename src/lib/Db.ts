import AccountDto from './account.dto';

class Db {
  private static readAll(): AccountDto[] {
    return global.dbData;
  }

  static reset() {
    global.dbData = [];
  }

  static create(account: AccountDto) {
    const data = this.readAll();
    if (data.length === 0) {
      data.push(account);
    }

    const result = data ? data : [account];

    global.dbData = result;
  }

  static read(id: string) {
    const data = this.readAll();
    const getElement = () => {
      const filteredData = data.filter((element) => element.id === id);
      return filteredData.length === 1 ? filteredData[0] : null;
    };

    const result = data ? getElement() : null;
    return result;
  }

  static increment(account: AccountDto, amount: number) {
    return this.update(account, amount);
  }

  static decrement(account: AccountDto, amount: number) {
    return this.update(account, -amount);
  }

  private static update(account: AccountDto, amount: number) {
    const data = this.readAll();

    if (!data) {
      throw new Error();
    }

    const updatedAccount = { ...account, balance: account.balance + amount };
    const updatedData = [...data.filter((element) => element.id !== account.id), updatedAccount];

    global.dbData = updatedData;

    return updatedAccount;
  }
}

export default Db;
