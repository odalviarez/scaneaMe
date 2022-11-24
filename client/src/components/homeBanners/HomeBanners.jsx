import React from 'react'
import { useState, useEffect } from 'react'
import products from '../../productos'
import styles from './HomeBanners.module.css'

export default function HomeBanners(autoPlay=true) {
  const images = products.map(e => [e.image])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, 5000);
      return () => clearInterval(interval);
    }
  })

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false)
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1
      setSelectedImage(images[nextIndex])
      setSelectedIndex(nextIndex)
    }, 400)
  }

  const previous = () => {
    selectNewImage(selectedIndex, images, false)
  }

  const next = () => {
    selectNewImage(selectedIndex, images)
  }

  return (
    <div className={styles.container}>
      <img
        src={selectedImage}
        className={loaded ? `${styles.img} ${styles.loaded}` : `${styles.img}`}
        alt='carru'
        onLoad={() => setLoaded(true)}
      />
      <div className={styles.btnContainer}>
        <button onClick={previous} className={styles.buttonPrev}>
          {'<'}
        </button>
        <button onClick={next} className={styles.buttonNext}>
          {'>'}
        </button>
      </div>
    </div>
  )
}
