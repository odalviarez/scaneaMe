import React, { useEffect, useState } from "react";
import AdminProducts from '../adminProducts/adminProducts.jsx';
import AdminUsers from "../adminUsers/adminUsers.jsx";
import styles from "./DashboardComponent.module.css";


export default function DashboardComponent() {
  const [currentPage, setCurrentPage] = useState('AdminProducts');

  if (currentPage === 'AdminProducts') {
    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
              <p onClick={() => setCurrentPage('AdminUsers')}>ADMIN USERS</p>
              <p onClick={() => setCurrentPage('AdminProducts')}>ADMIN PRODUCTS</p>
              <p onClick={() => setCurrentPage('Analytics')}>PAGE ANALYTICS</p>
          </div>
  
          <div className={styles.dashboardPage}>
          <AdminProducts/>
          </div>
  
      </div>
    );
  }
  

  if (currentPage === 'AdminUsers') {
    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
              <p onClick={() => setCurrentPage('AdminUsers')}>ADMIN USERS</p>
              <p onClick={() => setCurrentPage('AdminProducts')}>ADMIN PRODUCTS</p>
              <p onClick={() => setCurrentPage('Analytics')}>PAGE ANALYTICS</p>
          </div>
  
          <div className={styles.dashboardPage}>
          <AdminUsers/>
          </div>
  
      </div>
    );
  }

  if (currentPage === 'Analytics') {
    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
              <p onClick={() => setCurrentPage('AdminUsers')}>ADMIN USERS</p>
              <p onClick={() => setCurrentPage('AdminProducts')}>ADMIN PRODUCTS</p>
              <p onClick={() => setCurrentPage('Analytics')}>PAGE ANALYTICS</p>
          </div>
  
          <div className={styles.dashboardPage}>
          <h1>Analytics</h1>
          </div>
  
      </div>
    );
  }






}
