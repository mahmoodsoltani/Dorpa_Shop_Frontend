import React from "react";

import SalesDiagram from "../../component/admin/SalesDiagram";
import UsersSubmittedDiagram from "../../component/admin/UserSubmitDiagram";
import TotalPurchasesDiagram from "../../component/admin/TotalPurchaseDiagram";
import DiscountsTimelineDiagram from "../../component/admin/DiscountTimelineDiagram";
import "../../css/page/adminMainPage.css";

const AdminMainPage: React.FC = () => {
  return (
    <div className='admin-dashboard'>
      <h1>Dashboard</h1>

      {/* Dashboard grid layout */}
      <div className='dashboard-grid'>
        <div className='dashboard-item'>
          <SalesDiagram />
        </div>
        <div className='dashboard-item'>
          <UsersSubmittedDiagram />
        </div>
        <div className='dashboard-item'>
          <TotalPurchasesDiagram />
        </div>
        <div className='dashboard-item'>
          <DiscountsTimelineDiagram />
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
