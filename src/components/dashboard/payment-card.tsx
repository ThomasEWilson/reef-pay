import { Button, Card, Form, Input, Select } from "antd";
import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { useDataChanger } from "../../lib/useDataChanger";
import BN from "bignumber.js";
import usePriceFeed from "../../lib/usePriceFeed";
import axios, { AxiosError } from 'axios';

const { Option } = Select;

interface FormData {
  usdPayment: number;
  reefPayment: number;
}

const PaymentCard = () => {
  const [form] = Form.useForm<FormData>();
  const reefRef = useRef<any>(null);
  const reefPrice = usePriceFeed();

  const initFormData: FormData = useMemo(() => {
    return {
      usdPayment: 0,
      reefPayment: 0
    };
  }, []);
  const { data, dataRef, update } = useDataChanger<FormData>(initFormData);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const setREEFValue = useCallback(
    (reefPayment?: number) => {
      const _data = { reefPayment: dataRef.current.reefPayment };

      _data.reefPayment = reefPayment || 0;

      update(_data);
      form.setFieldsValue(_data);
    },
    [dataRef, form, update]
  );

  const setUSDValue = useCallback(
    (usdPayment?: number) => {
      const _data = { usdPayment: dataRef.current.usdPayment };

      _data.usdPayment = usdPayment || 0;

      update(_data);
      form.setFieldsValue(_data);
    },
    [dataRef, form, update]
  );

  const valueChanged = useCallback(
    (changed: Partial<FormData>) => {
      if (changed.usdPayment) {
        setUSDValue(changed.usdPayment);
      }
      update(changed);
    },
    [dataRef, update]
  );

  useEffect(() => {
    if (reefPrice !== null && reefRef.current != reefPrice) {
      reefRef.current = reefPrice;
    }
  }, [reefPrice, dataRef, reefRef]);

  const sendPostRequest = () => {
    let body = JSON.stringify({
      "originalPriceREEF": 10001,
      "paymentId": "8",
      "amountREEFRecieved": 0,
      "orderId": "3",
      "userId": "1",
      "merchantId": "1",
      "status": "Cancelled",
      "created": "2021-11-08T18:46:51Z",
      "usdReefExchangeRate": 0.001,
      "originalPriceUSD": 10
    });

    // begin POST Request to AWS API Gateway to create Payment Request.
    axios({
      
      
      // Endpoint to send files
      url: "https://bpnqxl35g7.execute-api.us-east-2.amazonaws.com/dev/payment",
      method: "POST",  
      headers: { 
        'x-api-key': 'ZF4S9EFPYraJhCpRhgfMq3QqqhRabPgC7Fy2Fyrh', 
        'Content-Type': 'application/json'
      },
      // Attaching the payment record to be created in dynamodb on aws
      data: body,
    })
  
      // Handle the response from backend here
      .then((res) => {console.log(res) })
  
      // Catch errors if any
      .catch((err) => {console.log(err) });
}


  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={valueChanged}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Merchant"
          name="merchant"
          rules={[
            { required: true, message: "Please input your USD Payment!" }
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            //   onChange={onGenderChange}
            allowClear
          >
            <Option value="male">Wine People</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item label="REEF payment" name="reefPayment">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={ () => sendPostRequest() }>
            Create Payment Request
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PaymentCard;
