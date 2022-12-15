import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { getAllOrders, adminGetUsers } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styles from './Chart.module.css'

export default function Chart() {
  const orders = useSelector(state => state.orders)
  const users = useSelector(state => state.usersLoaded)
  const dispatch = useDispatch()

  const formatDate = dateString => {
    let onlyDate = dateString.split('T')[0].split('-')
    let day = onlyDate[2]
    let month = onlyDate[1]
    let year = onlyDate[0]
    let formattedDate = day + '/' + month + '/' + year
    return formattedDate
  }

  useEffect(() => {
    if (!orders.length) dispatch(getAllOrders())
    if (!users.length) dispatch(adminGetUsers())
  }, [dispatch, orders])

  let dates = []

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toLocaleDateString())
  }

  const productsDay = orders.map(e => {
    return {
      date: formatDate(e.createdAt),
      productsSold: e.products
        .map(e => e.quantity)
        .reduce((acc, currentValue) => acc + currentValue, 0),
    }
  })

  let totalProductsDayFinal = []

  for (let j = 0; j < dates.length; j++) {
    // for (let i = 0; i < productsDay.length; i++) {
    //   if(dates[j] === productsDay[i].date){
    //     totalProductsDay['date'] = dates[j]
    //     totalProductsDay['sales'] = totalProductsDay['sales'] + productsDay[i].productsSold
    //   }
    // }
    let suma = 0
    productsDay.map((e, index) => {
      if (dates[j] === e.date) {
        suma = suma + e.productsSold
      }
      if (index === productsDay.length - 1)
        totalProductsDayFinal.push({ date: dates[j], sales: suma })
    })
  }

  let moneyIncome = 0
  for (let i = 0; i < orders.length; i++) {
    moneyIncome = moneyIncome + orders[i].total
  }

  let totalUsers = users.length+1

  const data = [
    {
      name: totalProductsDayFinal[6]?.date,
      NumberOfProductsSold: totalProductsDayFinal[6]?.sales,
    },
    {
      name: totalProductsDayFinal[5]?.date,
      NumberOfProductsSold: totalProductsDayFinal[5]?.sales,
    },
    {
      name: totalProductsDayFinal[4]?.date,
      NumberOfProductsSold: totalProductsDayFinal[4]?.sales,
    },
    {
      name: totalProductsDayFinal[3]?.date,
      NumberOfProductsSold: totalProductsDayFinal[3]?.sales,
    },
    {
      name: totalProductsDayFinal[2]?.date,
      NumberOfProductsSold: totalProductsDayFinal[2]?.sales,
    },
    {
      name: totalProductsDayFinal[1]?.date,
      NumberOfProductsSold: totalProductsDayFinal[1]?.sales,
    },
    {
      name: totalProductsDayFinal[0]?.date,
      NumberOfProductsSold: totalProductsDayFinal[0]?.sales,
    },
  ]

  console.log('Users: ', users);

  return (
    <div className={styles.container}>
      <h2>Total products sold on the last 7 days</h2>
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='NumberOfProductsSold'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <p className={styles.moneyText}>
        Total money income las month:
        <span className={styles.moneyNumber}> ${moneyIncome/100}</span>
      </p>
      <p className={styles.userText}>
        Total registered useres:{' '}
        <span className={styles.userNumber}> {totalUsers}</span>
      </p>
    </div>
  )
}
