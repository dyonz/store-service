const createColumns = (columnByKeyName) => {
  const columns = [];
  const keyNameByColumn = {};

  Object.entries(columnByKeyName).forEach(([keyName, column]) => {
    columns.push(column);
    keyNameByColumn[column] = keyName;
  });

  const toColumn = (keyName) => columnByKeyName[keyName];
  const toKeyName = (column) => keyNameByColumn[column];

  return { columns, toColumn, toKeyName };
};

module.exports = { createColumns };
