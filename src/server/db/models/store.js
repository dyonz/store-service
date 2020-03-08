const nanoid = require('nanoid');

const { createColumns } = require('./utils');

const { columns, toColumn, toKeyName } = createColumns({
  id: 'id',
  no: 'no',
  name: 'name',
  meta: 'meta',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

class Store {
  constructor(row) {
    Object.entries(row).forEach(([column, value]) => {
      const keyName = toKeyName(column);
      this[keyName] = value;
    });
  }

  static async findByID(id, { psql }) {
    const [row] = await psql`
      select
        ${psql(columns)}
      from
        stores
      where
        id = ${id}
      limit 1;
    `;

    if (!row) {
      return null;
    }

    return new Store(row);
  }

  static async findAllInIDs(ids, { psql }) {
    const rows = await psql`
      select
        ${psql(columns)}
      from
        stores
      where
        id in (${ids})
      order by
        created_at asc,
        no asc
      limit ${ids.length};
    `;

    return rows.map((row) => new Store(row));
  }

  static async findAll(_, { psql }) {
    const rows = await psql`
      select
        ${psql(columns)}
      from
        stores
      order by
        created_at asc,
        no asc;
    `;

    return rows.map((row) => new Store(row));
  }

  static async create(values, { psql }) {
    const id = await nanoid();
    const meta = values.meta !== null ? JSON.stringify(values.meta) : null;

    const data = Object.entries({
      ...values,
      id,
      meta
    }).reduce((data, [keyName, value]) => {
      const column = toColumn(keyName);
      data[column] = value;
      return data;
    }, {});

    const [row] = await psql`
      insert into stores
        ${psql(data)}
      returning
        ${psql(columns)};
    `;

    return new Store(row);
  }

  static async deleteWithID(id, { psql }) {
    await psql`
      delete from stores
      where
        id = ${id};
    `;

    return true;
  }
}

module.exports = Store;
