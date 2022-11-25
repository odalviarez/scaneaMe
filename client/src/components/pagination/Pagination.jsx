import React from 'react'
import style from './Pagination.module.css'


export default function Pagination({cardsPerPage, productsTotal, pagination}) {
    const pageNumbers = []


    for (let i = 1; i <= Math.ceil(productsTotal/cardsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav >
            <ul className={style.pagination}>
                {pageNumbers && pageNumbers.map (number =>{ 
                    return (
                    <li key={number}>
                        <button className={style.paginationPage} onClick={ () => pagination(number)}> {number} </button>
                    </li>
                )
                })}
            </ul>
        </nav>
    )

}

