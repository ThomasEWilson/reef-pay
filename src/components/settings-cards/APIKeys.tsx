import { Table, Space } from "antd";
import { Card } from "antd";
import { Button } from "antd";
import EditableTable from "../editable-table";

//important API BACKEND - afterthought: sybil resistance for api key generation
// THOMAS TASK: Restrict API-Key creation to 3 keys per account.
//IE: (if accountTier < 2, maxApiKey = 3)

//OUTSIDE OF COMPONENT
//begin static data initialization
//define synchronous utility functions ↓
enum Status {
  Active = "Active",
  Inactive = "Inactive"
}

// if (noApiKey Yet)
// page displays "You must connect a wallet before creating an API Key"

const dataSource = [
  {
    key: "1",
    status: Status.Active,
    created: "15-5-19"
  }
];

// {
//   title: "name",
//   dataIndex: "name",
//   inputType: "string",
//   width: "25%",
//   editable: true,
//   key: "69"
// },
const columns = [
  {
    title: "Key",
    dataIndex: "key",
    inputType: "string",
    editable: false,
    width: "25%",
    key: "0"
  },
  {
    title: "Status",
    dataIndex: "status",
    inputType: "string",
    editable: true,
    width: "25%",
    key: "1"
  },
  {
    title: "Created",
    dataIndex: "created",
    inputType: "meat",
    editable: false,
    width: "25%",
    key: "2"
  }
];

const ApiKeys = () => {
  //INSIDE OF COMPONENT
  // define state variables here
  //i.e useState
  //use react hooks

  // const isAddButtonDisabled = () => {
  //   return apiKeys.length > 3 ? true : false;
  // };

  // SIMPLE GET-REQUEST FETCH DATA EXAMPLE
  /* 1. Open useEffect
// useEffect(() => {
  2. Shortcircuit the effect, if you got what you need on last run.
    if (apiKeys.length) {
      return;
    }
  3. Define Inner Fetch Function
    const getAPIKeys = () => {
      //fetch() data from backend
      //axios('/api-keys?merchant-id=1') //wait for it to come back from API
          .then(function (response) {
            console.log(response);
            SAVE DATA TO useState VARIABLE HERE
          })
          .catch(function (error) {
            console.log(error);
          });

      //insert data into respective cells in table
    }
    4. Call Fetch Function
    getAPIKeys();
})
END FETCH DATA EXAMPLE
*/

  /*
  const genApiKey = () => {
    1. Perform AXIOS POST Request
      - body.merchantId must be defined
      - if successful, save api-key (log it for now)
  }
*/

  return (
    <Card
      title="API Keys"
      headStyle={{ color: "purple", fontWeight: 600 }}
      bodyStyle={{}}
    >
      {/* Optionally Displayed `Maximum API Keys Reached Banner` */}
      {/* <Table dataSource={dataSource} columns={columns} pagination={false} /> */}
      <EditableTable originData={dataSource} originColumns={columns} />
      {/* <EditableTable originData={dataSource} originColumns={columns} /> */}
      <Button type="primary">Add New Key</Button>
      {/* Use Ternary to display Either "Add New Key" or "Max Keys Reached" for button text */}
      {/* <Button type="primary" disabled={isAddButtonDisabled} onClick={genApiKey} >Add New Key</Button> */}
    </Card>
  );
};

export default ApiKeys;
