import React, {Dispatch, FC, SetStateAction} from 'react';
import '../App.css'
import {FiltersType} from "../types";

type Filters = {
    filters: FiltersType;
    setFilters: Dispatch<SetStateAction<FiltersType>>;
}


const Filters: FC<Filters> = ({filters, setFilters}) => {
    const onChange = (e: React.ChangeEvent, type: keyof FiltersType, value: string) => {
        e.preventDefault()
        setFilters(prevState => {
            if (prevState[type] === value) {
                return {
                    ...prevState,
                    [type]: ''
                }
            } else {
                return {
                    ...prevState,
                    [type]: value
                }
            }
        })
    }

    function debounce<Params extends any[]>(
        func: (...args: Params) => any,
        timeout: number,
    ): (...args: Params) => void {
        let timer: NodeJS.Timeout
        return (...args: Params) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)
            }, timeout)
        }
    }

    function test(e: React.ChangeEvent<HTMLInputElement>) {
        setFilters(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const debouncedTest = debounce(test, 300);

    return (
        <form className='filters'>
            <ul className='filters_list'>
                <li className="filter">
                    <h3 className='filter_title'>Name</h3>
                    <input type="text" className="filer_input" name='name' onChange={debouncedTest}/>
                </li>
                <li className="filter">
                    <h3 className='filter_title'>Status</h3>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.status === 'alive'}
                               onChange={event => onChange(event, 'status', 'alive')}/>
                        <span className='filter_name'>alive</span>
                    </label>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.status === 'dead'}
                               onChange={event => onChange(event, 'status', 'dead')}/>
                        <span className='filter_name'>dead</span>
                    </label>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.status === 'unknown'}
                               onChange={event => onChange(event, 'status', 'unknown')}/>
                        <span className='filter_name'>unknown</span>
                    </label>
                </li>
                <li className="filter">
                    <h3 className='filter_title'>Gender</h3>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.gender === 'female'}
                               onChange={event => onChange(event, 'gender', 'female')}/>
                        <span className='filter_name'>female</span>
                    </label>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.gender === 'male'}
                               onChange={event => onChange(event, 'gender', 'male')}/>
                        <span className='filter_name'>male</span>
                    </label>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.gender === 'genderless'}
                               onChange={event => onChange(event, 'gender', 'genderless')}/>
                        <span className='filter_name'>genderless</span>
                    </label>
                    <label className='filter_label'>
                        <input className='filer_status' type="checkbox" checked={filters.gender === 'unknown'}
                               onChange={event => onChange(event, 'gender', 'unknown')}/>
                        <span className='filter_name'>unknown</span>
                    </label>
                </li>
                <li className="filter">
                    <label className='filter_label'>
                        <h3 className='filter_title'>Type</h3>
                        <input type="text" className="filer_input" name='type' onChange={debouncedTest}/>
                    </label>
                </li>
            </ul>
        </form>
    );
};

export default Filters;