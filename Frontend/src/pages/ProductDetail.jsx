import api from '../api.js';
import { useLoaderData, useNavigate } from 'react-router';
import useAuthStore from '../stores/AuthStore.js';
import useCartStore from '../stores/CartStore.js';
import { useState } from 'react';
import { StarFilled } from '../components/Svgs.jsx';
import StylishButton from '../components/StylishButton.jsx';

export async function loader({ params }) {
    const id = params.id;
    try {
        const res = await api.get(`/products/${id}`);
        return { product: res.data }
    } catch (err) {
        return { err: err?.response?.data?.msg || err.message }
    }
}

export default function ProductDetail() {
    const { product, err } = useLoaderData();
    const { isAuthenticated } = useAuthStore();
    const {addOrIncrement, items } = useCartStore();

    if (err) return <h1>{err}</h1>

    const [bigImage, setBigImage] = useState(product.images[0]);
    return (
        <div className='m-4 flex flex-col h-full sm:flex-row gap-6 mt-30 justify-center '>
            <div className="flex flex-col sm:flex-row gap-2">
                {/* Sidebar Thumbnails */}
                <div className="hidden sm:flex flex-col gap-2">
                    {product.images.map((i) => (
                        <button className={`relative transition-all duration-300 rounded-md ${bigImage === i ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                            }`} key={i} onClick={() => setBigImage(i)}>
                            <img
                                className="w-[100px] h-[100px] object-cover rounded-md"
                                src={`${import.meta.env.VITE_BACKEND_URL}/${i}`}
                            />
                        </button>
                    ))}
                </div>

                {/* Big Image */}
                <img
                    className="object-contain h-[auto] w-[400px] max-w-[90vw] sm:w-auto sm:h-[430px]"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${bigImage}`}
                />

                {/* Mobile Thumbnails */}
                <div className="flex sm:hidden flex-row gap-2 mt-2">
                    {product.images.map((i) => (
                        <button className={`relative transition-all duration-300 rounded-md ${bigImage === i ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                            }`} key={i} onClick={() => setBigImage(i)}>
                            <img
                                className="w-[100px] h-auto object-cover rounded-md"
                                src={`${import.meta.env.VITE_BACKEND_URL}/${i}`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className='space-y-4 mx-2 sm:max-w-[50vw] flex flex-col justify-around'>
                <div>
                    <h1 className='text-2xl font-bold'>{product.name}</h1>
                <div className="flex items-center space-x-2">
                    <div className="flex">
                        {Array.from({ length: product.rating }).map((_, i) => (
                            <StarFilled key={`filled-${i}`} size={20} fill={true} />
                        ))}
                        {Array.from({ length: 5 - product.rating }).map((_, i) => (
                            <StarFilled key={`empty-${i}`} size={20} fill={false} />
                        ))}
                    </div>
                    <p className=''>({product.numReviews})</p>
                </div>
                <p className='text-lg font-medium'>{product.description}</p>
                </div>
                
                <StylishButton text='Add to Cart' onClick={() => addOrIncrement(product)}/>
            </div>

        </div>
    )
}