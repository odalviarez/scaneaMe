import React, { useEffect, useState } from "react";
import { __esModule } from "../../lib/Tab.js";
import AdminProducts from  "../../components/adminProducts/adminProducts";
import AdminUsers from "../../components/adminUsers/adminUsers";
import AdminOrders from "../../components/adminOrders/adminOrders";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";


export function AdminProductsPage() {

    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
                <Link to={"/dashboard/adminUsers"}>ADMIN USERS</Link>
                <Link to={"/dashboard/adminProducts"}>ADMIN PRODUCTS</Link>
                <Link to={"/dashboard/adminOrders"}>ADMIN ORDERS</Link>
                <Link to={"/dashboard/adminAnalytics"}>ANALYTICS</Link>
          </div>
  
          <div className={styles.dashboardPage}>
          <AdminProducts/>
          </div>
  
      </div>
    
  )
}

export function AdminUsersPage() {

    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
                <Link to={"/dashboard/adminUsers"}>ADMIN USERS</Link>
                <Link to={"/dashboard/adminProducts"}>ADMIN PRODUCTS</Link>
                <Link to={"/dashboard/adminOrders"}>ADMIN ORDERS</Link>
                <Link to={"/dashboard/adminAnalytics"}>ANALYTICS</Link>   
          </div>
  
          <div className={styles.dashboardPage}>
          <AdminUsers/>
          </div>
  
      </div>
    
  )
}

export function AdminOrdersPage() {

    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
                <Link to={"/dashboard/adminUsers"}>ADMIN USERS</Link>
                <Link to={"/dashboard/adminProducts"}>ADMIN PRODUCTS</Link>
                <Link to={"/dashboard/adminOrders"}>ADMIN ORDERS</Link>
                <Link to={"/dashboard/adminAnalytics"}>ANALYTICS</Link>
          </div>
  
          <div className={styles.dashboardPage}>
          <AdminOrders/>
          </div>
  
      </div>
    );
}



export function AdminAnalyticsPage() {

    return (
      <div className={styles.dashboardContainer}>
  
          <div className={styles.dashboardNavigator}>
                <Link to={"/dashboard/adminUsers"}>ADMIN USERS</Link>
                <Link to={"/dashboard/adminProducts"}>ADMIN PRODUCTS</Link>
                <Link to={"/dashboard/adminOrders"}>ADMIN ORDERS</Link>
                <Link to={"/dashboard/adminAnalytics"}>ANALYTICS</Link>
          </div>
  
          <div className={styles.dashboardPage}>
          <h1>Analytics</h1>
          </div>
  
      </div>
    
  )
}
