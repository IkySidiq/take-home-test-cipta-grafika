import { nanoid } from 'nanoid';
import { InvariantError } from '../exceptions/InvariantError.js';

export class EmployeesService {
  constructor(pool) {
    this._pool = pool;
  }

  async addEmployeeService({ name, email, position, birthDate, address }) {
    const employeeId = `employee-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const client = await this._pool.connect();

    try {
      await client.query('BEGIN');
      const query = {
        text: 'INSERT INTO employees (id, name, email, position, birth_date, address, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        values: [employeeId, name, email, position, birthDate, address, createdAt, updatedAt],
      };
      const result = await client.query(query);
      if (!result.rows.length) {
        throw new InvariantError('Gagal menambahkan data karyawan');
      }
      const targetId = result.rows[0].id;

      await client.query('COMMIT');

      return { id: targetId };
    } catch(err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}