import Db from './Db';
import EventDto from '../event/event.dto';
import EventType from '../event/event.enum';

class Operation {
  static handler(data: EventDto) {
    switch (data.type) {
      case EventType.Deposit:
        return this.deposit(data);
      case EventType.Transfer:
        return this.transfer(data);
      case EventType.Withdraw:
        return this.withdraw(data);
      default:
        throw new Error();
    }
  }

  private static deposit(data: EventDto) {
    const id = data.destination;
    if (!id) {
      throw new Error();
    }

    const account = Db.read(id);
    if (!account) {
      const newAccount = {
        id,
        balance: data.amount,
      };
      Db.create(newAccount);

      return { destination: newAccount };
    }

    const updatedAccount = Db.increment(account, data.amount);
    return { destination: updatedAccount };
  }

  private static transfer(data: EventDto) {
    const idOrigin = data.origin;
    const idDestination = data.destination;

    if (!idOrigin || !idDestination) {
      throw new Error();
    }

    const origin = this.withdraw(data);
    if (origin) {
      const destination = this.deposit(data);

      return { origin: origin.origin, destination: destination.destination };
    } else {
      throw new Error();
    }
  }

  private static withdraw(data: EventDto) {
    const id = data.origin;
    if (!id) {
      throw new Error();
    }

    const account = Db.read(id);
    if (!account) {
      throw new Error();
    }

    const updatedAccount = Db.decrement(account, data.amount);
    return { origin: updatedAccount };
  }
}

export default Operation;
