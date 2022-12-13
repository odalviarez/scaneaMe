import React from 'react'
import style from './Pagination.module.css'


export default function Pagination({cardsPerPage, cardsTotal, pagination, currentPage}) {
    const pageNumbers = []


    for (let i = 1; i <= Math.ceil(cardsTotal/cardsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav >
            <ul className={style.pagination}>
                {pageNumbers && pageNumbers.map (number =>{ 
                    if(number === currentPage) {
                    return (
                    <li key={number}>
                        <button className={style.paginationCurrentPage} onClick={ () => pagination(number)}> {number} </button>
                    </li>
                )
                    }
                    if(number !== currentPage) {
                    return (
                    <li key={number}>
                        <button className={style.paginationPage} onClick={ () => pagination(number)}> {number} </button>
                    </li>
                )
                    }
                return ''
                })}
            </ul>
        </nav>
    )

}

