import React, {Dispatch, FC, SetStateAction} from 'react';

type Pagination = {
    pages: number[];
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
}

type PageType = {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
    page: number;
};


const Pagination: FC<Pagination> = ({pages, setCurrentPage, currentPage}) => {
    let pagination: number[] = pages
        .filter((el, i) => i >= currentPage - 4)
        .filter((el, i) => i < 5)

    if (pages.length === 1) {
        return null
    }

    return (
        <ul className='pagination_list'>
            {pagination.some(el => el === 1) ? null : <li className='pagination_item'
                                                          onClick={() => setCurrentPage(1)}>1 ...</li>}
            {pagination.map((el, i) => <Page key={i} page={el} setCurrentPage={setCurrentPage}
                                             currentPage={currentPage}/>)}
            {pagination.some(el => el === pages[pages.length - 1]) ? null
                : <Page page={pages.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
        </ul>
    );
};

const Page = ({page, setCurrentPage, currentPage}: PageType) => {

    const setPage = () => {
        setCurrentPage(page)
    }
    return (
        <li className={page === currentPage ? 'pagination_item active' : 'pagination_item'}
            onClick={setPage}>{page}</li>
    )
}

export default Pagination;