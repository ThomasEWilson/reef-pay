import { Button, Card, Form, Input } from "antd";
import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { useDataChanger } from "../../lib/useDataChanger";
import BN from 'bignumber.js'
import usePriceFeed from "../../lib/usePriceFeed";


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
        reefPayment: 0,
      };
    }, []);
    const { data, dataRef, update } = useDataChanger<FormData>(initFormData);

    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };



    const setREEFValue = useCallback((reefPayment?: number) => {
        const _data = { reefPayment: dataRef.current.reefPayment };
    
        _data.reefPayment = reefPayment || 0;
    
        update(_data);
        form.setFieldsValue(_data);
      }, [dataRef, form, update]);

    const setUSDValue = useCallback((usdPayment?: number) => {
        const _data = { usdPayment: dataRef.current.usdPayment };
    
        _data.usdPayment = usdPayment || 0;
    
        update(_data);
        form.setFieldsValue(_data);
      }, [dataRef, form, update]);

    const valueChanged = useCallback(
        (changed: Partial<FormData>) => {
            if (changed.usdPayment) {
                setUSDValue(changed.usdPayment)
                calculatePaymentInReef(changed.usdPayment || 0);
            } 
            update(changed);
        },
        [dataRef, update],
    );

    const calculatePaymentInReef = useCallback(
        (usd: number) => {
            const bnUsd = new BN(usd);
            const bnReefPrice = new BN(reefPrice || 0);
            const calculatedReef = bnUsd.div(bnReefPrice).toNumber();
            setREEFValue(calculatedReef);
            update({ reefPayment: calculatedReef });
        },
        [setREEFValue, reefPrice, update]
    );

    useEffect(() => {
        if (reefPrice !== null && reefRef.current != reefPrice) {
            calculatePaymentInReef(dataRef.current.usdPayment)
            reefRef.current = reefPrice;
        }
        
    }, [reefPrice, dataRef, reefRef, calculatePaymentInReef]);

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
                label="USD Payment"
                name="usdPayment"
                rules={[{ required: true, message: "Please input your USD Payment!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="REEF payment"
                name="reefPayment"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    </Card>
  );
};

export default PaymentCard;
