import React, { useEffect, useState } from 'react'
import { __esModule } from '../../lib/Tab.js'
import AdminProducts from '../../components/adminProducts/adminProducts'
import AdminUsers from '../../components/adminUsers/adminUsers'
import AdminAnalytics from '../../components/adminAnalytics/AdminAnalytics.jsx'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

export function AdminProductsPage() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardNavigator}>
        <Link to={'/dashboard/adminUsers'}>ADMIN USERS</Link>
        <Link to={'/dashboard/adminProducts'}>ADMIN PRODUCTS</Link>
        <Link to={'/dashboard/adminAnalytics'}>PAGE ANALYTICS</Link>
      </div>

      <div className={styles.dashboardPage}>
        <AdminProducts />
      </div>
    </div>
  )
}

export function AdminUsersPage() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardNavigator}>
        <Link to={'/dashboard/adminUsers'}>ADMIN USERS</Link>
        <Link to={'/dashboard/adminProducts'}>ADMIN PRODUCTS</Link>
        <Link to={'/dashboard/adminAnalytics'}>PAGE ANALYTICS</Link>
      </div>

      <div className={styles.dashboardPage}>
        <AdminUsers />
      </div>
    </div>
  )
}

export function AdminAnalyticsPage() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardNavigator}>
        <Link to={'/dashboard/adminUsers'}>ADMIN USERS</Link>
        <Link to={'/dashboard/adminProducts'}>ADMIN PRODUCTS</Link>
        <Link to={'/dashboard/adminAnalytics'}>PAGE ANALYTICS</Link>
      </div>

      <div className={styles.dashboardPage}>
        <AdminAnalytics />
      </div>
    </div>
  )
}
