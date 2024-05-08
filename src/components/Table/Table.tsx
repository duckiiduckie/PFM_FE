type Props = {
    config: any;
    data: any;
  };

  const Table = ({ config, data }: Props) => {
    const renderedRows = data.map((record: any) => {
    return (
      <tr key={record.id}>
        {config.map((val: any) => {
          return <td className="p-3">{val.render(record)}</td>;
        })}
      </tr>
    );
  });
  const renderedHeaders = config.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg p-8 ">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">{renderedHeaders}</thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;