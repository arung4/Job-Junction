import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend",
    "Backend",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer", 
    "Software Developer", 
    "Data Analysts",
    "System Programmer", 
    "System Tester"
]

const CategoryCarousel = () => {

    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category); // Update state when category is clicked
    };

    useEffect(() => {
        if (selectedCategory) {
            dispatch(setSearchedQuery(selectedCategory)); // Dispatch action when selectedCategory state changes
            navigate("/browse");
        }
    }, [selectedCategory]);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const searchJobHandler = (query) => {
    //     dispatch(setSearchedQuery(query));
    //     navigate("/browse");
    // }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>handleCategoryChange(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel