import fs from 'fs';
import { join } from 'path';

class Db {
  static DB_FILE = 'data.json';
  static dirPath = join(__dirname, '..', 'db');
  static filePath = join(__dirname, '..', 'db', this.DB_FILE);

  private static async createFile() {
    if (true) {
      return;
    }
    const checkIfFileOrDirectoryExists = (path: string): boolean => {
      const result = fs.existsSync(path);
      console.log({ result });
      return result;
    };

    if (!checkIfFileOrDirectoryExists(this.filePath)) {
      fs.mkdirSync(this.dirPath);
    }

    return await fs.promises.writeFile(this.filePath, '');
  }

  private static async readAll() {
    await this.createFile();
    const content = await fs.promises.readFile(this.filePath);
    try {
      return JSON.parse(content.toString());
    } catch {
      return null;
    }
  }

  static async reset() {
    console.log({ db: this.filePath, dir: __dirname });
    await this.createFile();
    // await fs.promises.writeFile(this.filePath, '');
  }

  static async create(account) {
    console.log({ db: this.filePath });
    const data = await this.readAll();
    if (data) {
      data.push[account];
    }

    const result = data ? data : [account];

    await fs.promises.writeFile(this.filePath, JSON.stringify(result));
  }

  static async read(id) {
    const data = await this.readAll();
    const getElement = () => {
      const filteredData = data.filter((element) => element.id === id);
      return filteredData.length === 1 ? filteredData[0] : null;
    };

    const result = data ? getElement() : null;
    return result;
  }

  static async increment(account, amount) {
    return await this.update(account, amount);
  }

  static async decrement(account, amount) {
    return await this.update(account, -amount);
  }

  private static async update(account, amount) {
    const data = await this.readAll();

    if (!data) {
      throw new Error();
    }

    const updatedAccount = { ...account, balance: account.balance + amount };
    const updatedData = [
      ...data.filter((element) => element.id !== account.id),
      updatedAccount,
    ];

    await fs.promises.writeFile(this.filePath, JSON.stringify(updatedData));

    return updatedAccount;
  }
}

export default Db;
