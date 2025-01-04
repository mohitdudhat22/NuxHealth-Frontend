import { Table, Skeleton, Empty } from "antd";
import clsx from "clsx";
import styles from "./NHTable.module.css";
import CustomEmpty from "../CustomEmpty/CustomEmpty";

export const NHTable = ({
  id,
  name,
  dataTestId,
  tableColumn = [], // Default to an empty array if undefined
  tableDataSource = [], // Default to an empty array if undefined
  tableClassName,
  tableContainerClassName,
  scroll,
  onChange,
  tableLayout,
  sortDirections,
  showSorterTooltip,
  loading,
  filters,
  showPagination,
  showSizeChanger,
  defaultPageSize = 10,
  route,
  ...rest
}) => {
  return (
    <div className={clsx(tableContainerClassName)}>
      <Table
        id={id}
        name={name}
        data-test-id={dataTestId}
        columns={tableColumn.map((column) => ({
          ...column,
          render: loading
            ? () => (
                <Skeleton
                  key={column.dataIndex}
                  title={true}
                  paragraph={false}
                  active
                />
              )
            : column.render
            ? column.render
            : (text) => text,
        }))}
        dataSource={tableDataSource}
        className={clsx(tableClassName, styles.table)}
        scroll={scroll}
        onChange={onChange}
        tableLayout={tableLayout}
        sortDirections={sortDirections}
        showSorterTooltip={showSorterTooltip}
        pagination={
          showPagination
            ? {
                defaultPageSize: defaultPageSize,
                position: ["bottomRight"],
                pageSizeOptions: [5, 10, 15, 20, 25, 30, 50],
                showSizeChanger: showSizeChanger,
                responsive: true,
                locale: { items_per_page: "" },
              }
            : false
        }
        locale={{
          emptyText: loading ? (
            tableColumn.map((column, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {column.dataIndex && (
                  <Skeleton
                    dataIndex={column.dataIndex}
                    title={true}
                    paragraph={false}
                    active
                  />
                )}
              </div>
            ))
          ) : (
            <CustomEmpty route={route} />
          ),
        }}
        filters={filters}
        {...rest}
      />
    </div>
  );
};
