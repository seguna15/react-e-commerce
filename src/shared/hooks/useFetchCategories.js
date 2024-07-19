import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryAction } from '../../redux/slices/categories/categoriesSlices'

const useFetchCategories = (categ) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoryAction());
    },[dispatch])

     const { categories } = useSelector((state) => state?.categories);
    console.log(categories);
    return categories;
}

export default useFetchCategories