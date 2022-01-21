import React, {useState, useEffect, useRef} from 'react';
import Filters from './components/Filters'
import Characters from './components/Characters'
import './App.css';
import {CharactersType, FiltersType, ServerType} from "./types";
import axios from "axios";
import Pagination from "./components/Pagination";
import Popup from "./components/Popup";

function App() {
    const [pages, setPages] = useState<number[]>([])
    const [popup, setPopup] = useState<CharactersType | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [chars, setChars] = useState<CharactersType[] | null>(null)
    const [filters, setFilters] = useState<FiltersType>({
            name: '',
            status: '',
            gender: '',
            type: '',
        }
    )

    const params: FiltersType = {
        name: filters.name,
        status: filters.status,
        gender: filters.gender,
        type: filters.type,
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get<ServerType>(`https://rickandmortyapi.com/api/character`, {
                    params: {
                        ...params,
                        page: 1
                    }
                }).then(res => res.data)
                setIsLoading(false)
                setChars(response.results)
                setCurrentPage(1)

                let arrayPages: number[] = []
                for (let i = 1; i <= response.info.pages; i++) {
                    arrayPages.push(i)
                }
                setPages(arrayPages)

            } catch (e) {
                setChars(null)
                setPages([1])
                setIsLoading(false)
            }
        }
        fetchDataAsync()

    }, [filters])

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get<ServerType>(`https://rickandmortyapi.com/api/character`, {
                    params: {
                        ...params,
                        page: currentPage
                    }
                }).then(res => res.data)
                setIsLoading(false)
                setChars(response.results)

                let arrayPages: number[] = []
                for (let i = 1; i <= response.info.pages; i++) {
                    arrayPages.push(i)
                }
                setPages(arrayPages)

            } catch (e) {
                setChars(null)
                setPages([1])
                setIsLoading(false)
            }
        }
        fetchDataAsync()

    }, [currentPage])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [filters, currentPage])

    return (
        <>
            <div className="hero">
                <div className="container">
                    <h1 className='hero_title'>
                        Rick and Morty
                    </h1>
                    <div className="hero_inner">
                        <Filters filters={filters} setFilters={setFilters}/>
                        <Characters chars={chars} isLoading={isLoading} setPopup={setPopup}/>
                    </div>
                    <Pagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            </div>
            {popup && <Popup user={popup} setPopup={setPopup}/>}
        </>
    );
}

export default App;
