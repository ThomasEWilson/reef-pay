import React, { useState, useEffect, useCallback } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface Props {
  originData: any[];
  originColumns?: any[];
}

// inputType will evaluate to one of these two: 'number' | 'string'
interface EditableCol {
  inputType: string;
}

const defaultColumns = [
  {
    title: "Key",
    dataIndex: "name",
    inputType: "string",
    width: "25%",
    editable: true,
    key: "69"
  },
  {
    title: "Status",
    dataIndex: "age",
    inputType: "string",
    width: "15%",
    editable: true,
    key: "70"
  },
  {
    title: "Created",
    dataIndex: "address",
    inputType: "string",
    width: "40%",
    editable: true,
    key: "71"
  }
];

const EditableTable = ({
  originData,
  originColumns = defaultColumns
}: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [cols, setCols] = useState(originColumns);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = useCallback((record) => record.key === editingKey, [
    editingKey
  ]);

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    const handleColumnsHookup = (originColumns = defaultColumns) => {
      let columns = [
        ...originColumns,
        {
          title: "Action",
          dataIndex: "operation",
          key: "99",
          editable: false,
          inputType: "string",
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <a
                  // href="javascript:;"
                  onClick={() => save(record.key)}
                  style={{
                    marginRight: 8
                  }}
                >
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            );
          }
        }
      ];
      columns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.inputType === "number" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record)
          })
        };
      });
      setCols(columns);
    };
    handleColumnsHookup();
  }, [originColumns, isEditing]);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={data}
        columns={cols}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel
        }}
      />
    </Form>
  );
};

export default EditableTable;
