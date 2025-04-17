import * as Firebird from 'node-firebird';
import logger from './logger.js';
import { ContagemItem } from '../models/schemas/contagem.schema.js';

const { DB_HOST, DB_URL, DB_USER, DB_PASSWORD } = process.env;

const config = {
  host: DB_HOST,
  port: 3050,
  database: DB_URL,
  user: DB_USER,
  password: DB_PASSWORD,
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


export async function salvarContagemEmLote(contagens: ContagemItem[], criadoEm: string) {
  const db = await getConnection();

  return new Promise<void>((resolve, reject) => {
    db.transaction(Firebird.ISOLATION_READ_COMMITTED, async (err: any, transaction: any) => {
      if (err) {
        db.detach();
        return reject(err);
      }

      const sql = `
        INSERT INTO INDUSTRIA_CONTAGEM_ESTOQUE (CODIGO_PRODUTO, QUANTIDADE, DATA_CONTAGEM)
        VALUES (?, ?, ?)
      `;

      try {
        for (const item of contagens) {
          const params = [item.itemId, item.quantidade, criadoEm];
          await new Promise<void>((res, rej) => {
            transaction.query(sql, params, (err: any) => {
              if (err) return rej(err);
              res();
            });
          });
        }

        transaction.commit((err: any) => {
          db.detach();
          if (err) return reject(err);
          resolve();
        });
      } catch (error) {
        transaction.rollback(() => {
          db.detach();
          reject(error);
        });
      }
    });
  });
}