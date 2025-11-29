import React, { useEffect } from 'react'
import ProductsList from '../components/ProductsList/ProductsList';
import { useLocation, useParams , useSearchParams } from 'react-router-dom';

function Products({allProducts}) {
    const {pathname} = useLocation()
    useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
},[pathname]);

    const {gender, category} = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    let filteredProducts = allProducts;

    if (searchQuery){
    filteredProducts = filteredProducts.filter(
        (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

}
    
if (gender && category && category !== "all"){
    filteredProducts = filteredProducts.filter((p) =>
    p.gender.toLowerCase() === gender.toLowerCase()
    && p.category.toLowerCase() === category.toLowerCase()
);
}  else if (gender && category === "all"){
    filteredProducts = filteredProducts.filter((p) =>
    p.gender.toLowerCase() === gender.toLowerCase()
);
}

let headingText = "All Products";
if (searchQuery) {
    headingText = `Search results for "${searchQuery}"`;
} else if (category && category !== "all") {
    headingText = category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
} else if (gender && category === "all"){
    headingText = `${gender.charAt(0).toUpperCase() + gender.slice(1)} Collection`;
}



return (
    <div className='px-6 py-4 pt-10'>
            <h2 className='text-3xl font-bold mt-10 text-center'>
                {headingText}
            </h2>
        
        {filteredProducts.length > 0 ? (
                <ProductsList products={filteredProducts}/>
        )  : (
                  <p className='text-gray-700 text-center'>No product found.</p>
            )
        }
        </div>
)
}
export default Products;
