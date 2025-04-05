import * as Firebird from 'node-firebird';
import logger from './logger.js';

const config = {
  host: 'localhost',
  port: 3050,
  database: 'C:/Users/luis/documents/utils/Lobo.fdb',
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false,
  pageSize: 8192
};


const pool = Firebird.pool(5, config);

export const getConnection = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.get((err: any, db: any) => {
      if (err) {
        logger.error('Erro ao obter conexão do pool.', err);
        return reject(err);
      }
      
      resolve(db);
    });
  });
};

export function queryAsync<T>(db: any, sql: string, params: any[]): Promise<T> {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err: Error | null, result: T) => {
      if (err) {
        reject(err);

      } else {
        resolve(result);
      }
    });
  });
}

export async function executeQuery<T>(sql: string, params: any[] = []): Promise<T> {
  let db: any;

  try {
    db = await getConnection();
    return await queryAsync<T>(db, sql, params);

  } catch (err: any) {
    throw new Error(`Erro ao realizar query: ${err}`);

  } finally {
    db?.detach();
  }
}
