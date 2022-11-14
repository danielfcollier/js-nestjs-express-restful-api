import * as fs from 'fs';
import { join } from 'path';

class Db {
  static DB_FILE = 'data.json';
  static dirPath = join(__dirname, '..', 'db');
  static filePath = join(__dirname, '..', 'db', this.DB_FILE);

  private static  createFile() {
    const checkIfFileOrDirectoryExists = (path: string): boolean => {
      const result = fs.existsSync(path);
      return result;
    };

    if (!checkIfFileOrDirectoryExists(this.filePath)) {
      console.log({ message: 'Db file created!' });
      fs.mkdirSync(this.dirPath);
    }

    return  fs.promises.writeFile(
      this.filePath,
      '[{"id":"100","balance":10}]',
      'utf-8',
    );
  }

  private static  readAll() {
     this.createFile();
    const content =  fs.promises.readFile(this.filePath);
    try {
      const result = JSON.parse(content.toString());
      console.log({ result, id: result[0].id });
      return result;
    } catch {
      return null;
    }
  }

  static reset() {
    //  this.createFile();
    global.dbFile = '';
    //  fs.promises.writeFile(this.filePath, JSON.stringify('')), 'utf-8';
  }

  static  create(account) {
    // const data =  this.readAll();
    const data = global.dbFile;
    if (data) {
      data.push[account];
    }

    const result = data ? data : [account];

    console.log({ file: this.filePath, updatedData: JSON.stringify(result) });

    global.dbFile = result;
    //  fs.promises.writeFile(this.filePath, JSON.stringify(result), 'utf-8');
  }

  static  read(id) {
    // const data =  this.readAll();
    const data = global.dbFile;
    console.log({ data, id });
    const getElement = () => {
      const filteredData = data.filter((element) => element.id === id);
      return filteredData.length === 1 ? filteredData[0] : null;
    };

    const result = data ? getElement() : null;
    return result;
  }

  static  increment(account, amount) {
    return  this.update(account, amount);
  }

  static  decrement(account, amount) {
    return  this.update(account, -amount);
  }

  private static  update(account, amount) {
    // const data =  this.readAll();
    const data = global.dbFile;

    if (!data) {
      throw new Error();
    }

    const updatedAccount = { ...account, balance: account.balance + amount };
    const updatedData = [
      ...data.filter((element) => element.id !== account.id),
      updatedAccount,
    ];

    console.log({
      file: this.filePath,
      updatedData: JSON.stringify(updatedData),
      fs: global.dbFile,
    });

    //  fs.promises.writeFile(
    //   this.filePath,
    //   JSON.stringify(updatedData),
    //   'utf-8',
    // );

    global.dbFile = updatedAccount;

    return updatedAccount;
  }
}

export default Db;
