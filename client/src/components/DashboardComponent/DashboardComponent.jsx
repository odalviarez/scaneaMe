import styles from "./DashboardComponent.module.css";
import React, { useEffect, useState } from "react";
import Pestana from '../AdminUsers/AdminUsers.jsx';


export default function DashboardComponent() {
  const [currentPage, setCurrentPage] = useState('users');


  return (

      <div className={styles.dashboardContainer}>

        <div className={styles.dashboardNavigator}>
            <p>ADMIN USERS</p>
            <p>ADMIN PRODUCTS</p>
            <p>PAGE ANALYTICS</p>
        </div>
        
        <div className={styles.dashboardPage}>
            <Pestana  />
        </div>

    </div>

  );
}
