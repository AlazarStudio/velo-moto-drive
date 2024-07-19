import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { products } from '../../../data'; // Assuming this is your full product list
import Filter from '../../Blocks/Filter/Filter';
import ProductCard from '../../Blocks/ProductCard/ProductCard';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Loader from 'react-js-loader'; // Importing your Loader component

import styles from './CatalogPage.module.css';

const ITEMS_PER_PAGE = 9;

function CatalogPage() {
    const { id } = useParams();
    let typeData = id ? id : '';

    typeData = typeData === 'bike' ? 'Велосипеды' :
        typeData === 'mopeds' ? 'Мопеды' :
        typeData === 'scooters' ? 'Самокаты' :
        typeData === 'atvs' ? 'Квадроциклы' : '';

    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState({
        reset: '',
        model: '',
        type: '',
        ageGroup: '',
        gender: '',
        brakes: '',
        amor: '',
        material: '',
        color: ''
    });
    const [selectedType, setSelectedType] = useState(typeData);
    const [selectedColor, setSelectedColor] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [speedRange, setSpeedRange] = useState([1, 27]);
    const [wheelSizeRange, setWheelSizeRange] = useState([12, 29]);
    const [frameSizeRange, setFrameSizeRange] = useState([13, 23]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: false
    });

    useEffect(() => {
        if (inView && hasMore) {
            loadMoreProducts();
        }
    }, [inView, hasMore]);

    useEffect(() => {
        setPage(1);
        setVisibleProducts([]);
        setHasMore(true);
    }, [searchQuery, filterData, selectedType, selectedColor, sortOrder]);

    const loadMoreProducts = () => {
        setLoading(true);
        // Calculate the starting and ending index for the current page
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        // Apply filtering and sorting
        const filteredProducts = products.filter(request => {
            const speed = parseInt(request.speed, 10);
            const wheelSize = parseInt(request.wheelsSize, 10);
            const frameSize = parseInt(request.frameGrowth, 10);

            const matchesSearchQuery = searchQuery === '' || (
                request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.frameMaterial.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
                matchesSearchQuery &&
                (selectedType === '' || request.type.toLowerCase().includes(selectedType.toLowerCase())) &&
                (filterData.type === '' || request.category.toLowerCase().includes(filterData.type.toLowerCase())) &&
                (filterData.model === '' || request.name.toLowerCase().includes(filterData.model.toLowerCase())) &&
                (filterData.brakes === '' || request.brakes.toLowerCase().includes(filterData.brakes.toLowerCase())) &&
                (filterData.ageGroup === '' || request.ageGroup.toLowerCase().includes(filterData.ageGroup.toLowerCase())) &&
                (filterData.gender === '' || request.gender.toLowerCase().includes(filterData.gender.toLowerCase())) &&
                (filterData.amor === '' || request.amor.toLowerCase().includes(filterData.amor.toLowerCase())) &&
                (filterData.material === '' || request.frameMaterial.toLowerCase().includes(filterData.material.toLowerCase())) &&
                (filterData.color === '' || request.color.toLowerCase().includes(filterData.color.toLowerCase())) &&
                speed >= speedRange[0] &&
                speed <= speedRange[1] &&
                wheelSize >= wheelSizeRange[0] &&
                wheelSize <= wheelSizeRange[1] &&
                frameSize >= frameSizeRange[0] &&
                frameSize <= frameSizeRange[1]
            );
        });

        // Sort products by price
        filteredProducts.sort((a, b) => {
            const priceA = a.currentPrice;
            const priceB = b.currentPrice;
            if (sortOrder === 'asc') {
                return priceA - priceB;
            } else if (sortOrder === 'desc') {
                return priceB - priceA;
            }
            return 0;
        });

        // Get the products for the current page
        const newProducts = filteredProducts.slice(0, endIndex);

        setVisibleProducts(newProducts);
        setPage(prevPage => prevPage + 1);
        setHasMore(newProducts.length < filteredProducts.length);
        setLoading(false);
    };

    const resetForm = () => {
        setFilterData({
            reset: '',
            model: '',
            type: '',
            ageGroup: '',
            gender: '',
            brakes: '',
            amor: '',
            material: '',
            color: ''
        });
        setSelectedType('');
        setSelectedColor('');
        setSortOrder('');
        setSearchQuery('');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFilterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVeloTypeClick = type => {
        setSelectedType(type);
        let newType = '';

        switch (type) {
            case 'Велосипеды':
            case 'Мопеды':
            case 'Самокаты':
            case 'Квадроциклы':
            case 'Мотоциклы':
                newType = '';
                break;
            default:
                newType = type;
                break;
        }

        setFilterData(prevState => ({
            ...prevState,
            type: newType
        }));
    };

    const handleColorChange = color => {
        setSelectedColor(color);
        setFilterData(prevState => ({
            ...prevState,
            color
        }));
    };

    const handleSpeedChange = newValue => {
        setSpeedRange(newValue);
    };

    const handleWheelSizeChange = newValue => {
        setWheelSizeRange(newValue);
    };

    const handleFrameSizeChange = newValue => {
        setFrameSizeRange(newValue);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <main>
            <CenterBlock>
                <WidthBlock>
                    <div className={styles.search_container}>
                        <input
                            type='text'
                            placeholder='Поиск...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={styles.search_input}
                        />
                    </div>

                    <Filter
                        handleChange={handleChange}
                        filterData={filterData}
                        selectedType={selectedType}
                        selectedColor={selectedColor}
                        handleVeloTypeClick={handleVeloTypeClick}
                        resetForm={resetForm}
                        handleColorChange={handleColorChange}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        speedRange={speedRange}
                        handleSpeedChange={handleSpeedChange}
                        wheelSizeRange={wheelSizeRange}
                        handleWheelSizeChange={handleWheelSizeChange}
                        frameSizeRange={frameSizeRange}
                        handleFrameSizeChange={handleFrameSizeChange}
                        productLength={visibleProducts.length}
                    />

                    <div className={styles.cards_wrapper}>
                        {visibleProducts.length > 0 ? (
                            visibleProducts
                                .map((product, index) => (
                                    <ProductCard key={index} {...product} />
                                ))
                        ) : (
                            <p className={styles.no_results}>
                                Нет товаров, соответствующих выбранным фильтрам.
                            </p>
                        )}
                    </div>

                    {/* Loader Component */}
                    {loading && (
                        <div className={styles.loader_container}>
                            <Loader type='spinner-circle' bgColor={'#f77523'} size={128} />
                        </div>
                    )}

                    {/* Intersection Observer */}
                    <div ref={ref} />
                </WidthBlock>
            </CenterBlock>
        </main>
    );
}

export default CatalogPage;
