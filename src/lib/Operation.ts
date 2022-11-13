import Db from './Db';

const eventType = {
  deposit: 'deposit',
  transfer: 'transfer',
  withdraw: 'withdraw',
};

class Operation {
  static async handler(data) {
    switch (data.type) {
      case eventType.deposit:
        return await this.deposit(data);
      case eventType.transfer:
        return await this.transfer(data);
      case eventType.withdraw:
        return await this.withdraw(data);
      default:
        throw new Error();
    }
  }

  private static async deposit(data) {
    const id = data.destination;
    if (!id) {
      throw new Error();
    }

    const account = await Db.read(id);
    if (!account) {
      const newAccount = {
        id,
        balance: data.amount,
      };
      await Db.create(newAccount);

      return { destination: newAccount };
    }

    const updatedAccount = await Db.increment(account, data.amount);
    return { destination: updatedAccount };
  }

  private static async transfer(data) {
    const idOrigin = data.origin;
    const idDestination = data.destination;

    if (!idOrigin || !idDestination) {
      throw new Error();
    }

    const origin = await this.withdraw(data);
    const destination = await this.deposit(data);

    return { origin: origin.origin, destination: destination.destination };
  }

  private static async withdraw(data) {
    const id = data.origin;
    if (!id) {
      throw new Error();
    }

    const account = await Db.read(id);
    if (!account) {
      throw new Error();
    }

    const updatedAccount = await Db.decrement(account, data.amount);
    return { origin: updatedAccount };
  }
}

export default Operation;
