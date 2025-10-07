export const up = (pgm) => {
  pgm.createTable('employees', {
    id: { type: 'varchar(50)', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(150)', notNull: true, unique: true },
    position: { type: 'varchar(100)', notNull: true },
    birth_date: { type: 'date', notNull: true },
    address: { type: 'text', notNull: true },
    is_active: { type: 'boolean', notNull: true, default: true },
    created_at: { type: 'date', notNull: true, default: pgm.func('CURRENT_DATE') },
    updated_at: { type: 'date' },
  });
};

export const down = (pgm) => {
  pgm.dropTable('employees');
};
