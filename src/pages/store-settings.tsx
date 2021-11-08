import React from "react";
import ApiKeys from "../components/settings-cards/APIKeys";
import MerchantMainWallets from "../components/settings-cards/merchant-main-wallets/merchant-main-wallets";
import BaseCurrency from "../components/settings-cards/Base-currency";
import PayNotifs from "../components/settings-cards/pay-notifs";
import { PageHeader } from "antd";
import MerchantManagementCard from "../components/settings-cards/merchant-management";

const StoreSettings = () => {
  return (
    <>
      <PageHeader
        title="Store Settings"
        className="site-page-header"
        subTitle="Modify your account settings here."
      ></PageHeader>
      <ApiKeys />
      <MerchantMainWallets />
      <BaseCurrency />
      <PayNotifs />
      <MerchantManagementCard />
    </>
  );
};

export default StoreSettings;
