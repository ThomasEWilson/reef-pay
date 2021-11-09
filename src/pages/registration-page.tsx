import React from "react";
import { PageHeader } from "antd";

import Registration from "../components/login/registration";

const RegistrationPage = () => {
  return (
    <>
      <PageHeader title="Register" className="site-page-header"></PageHeader>
      <Registration />
    </>
  );
};

export default RegistrationPage;
