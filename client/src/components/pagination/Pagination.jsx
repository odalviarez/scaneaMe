import React from 'react'
import style from './Pagination.module.css'


export default function Pagination({cardsPerPage, cardsTotal, pagination, currentPage}) {
    const pageNumbers = []


    for (let i = 1; i <= Math.ceil(cardsTotal/cardsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
      <nav>
        <ul className={style.pagination}>
          {pageNumbers &&
            pageNumbers.map((number) => {
              if (number === currentPage) {
                return (
                  <li key={number}>
                    <button
                      className="py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border bg-black/30 border-gray-700 hover:backdrop-blur-sm hover:bg-white/50 hover:text-slate-700 z-10 ring-2 ring-slate-700 text-slate-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-slate-500 dark:focus:text-white"
                      onClick={() => pagination(number)}
                    >
                      {" "}
                      {number}{" "}
                    </button>
                  </li>
                );
              }
              if (number !== currentPage) {
                return (
                  <li key={number}>
                    <button
                      className="py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border bg-white/30 border-gray-700 hover:backdrop-blur-sm hover:bg-white/50 hover:text-slate-700 focus:z-10 focus:ring-2 focus:ring-slate-700 focus:text-slate-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-slate-500 dark:focus:text-white"
                      onClick={() => pagination(number)}
                    >
                      {" "}
                      {number}{" "}
                    </button>
                  </li>
                );
              }
              return "";
            })}
        </ul>
      </nav>
    );

}

