import React from 'react'
import { Link } from 'react-router-dom'
import primaverVerano from '../../Logo/primaveraVerano.jpg'
import otoñoInvierno from '../../Logo/otoñoInvierno.jpg'
import estaciones from '../../Logo/estaciones.jpg'
import styles from './SeasonalBanner.module.css'

export default function SeasonalBanner() {
  return (
    <div>
      <div>
        <img src={estaciones} />
      </div>
      <div>
        <img src={primaverVerano} />
      </div>
      <div>
        <img src={otoñoInvierno} />
      </div>
    </div>
  )
}
