import { Link } from 'react-router';
import { StarFilled } from './Svgs';
import useCartStore from '../stores/CartStore.js';
import { ShoppingCart, Plus } from 'lucide-react';

export default function ProductCard({ _id, name, price, gender, age, category, images, description, rating, numReviews }) {
    const { addOrIncrement } = useCartStore();

    return (
        <div className=" shadow hover:shadow-lg transition overflow-hidden bg-white w-[200px] sm:w-[300px] md:w-[350px] lg:w-[300px] aspect-auto m-4 rounded-md p-2 flex flex-col justify-between gap-2 hover:translate-y-[-2px] group relative">

                <button
                    onClick={() =>
                        addOrIncrement({ _id, name, price, gender, age, category, images, description, rating, numReviews })
                    }
                    className="hidden group-hover:flex absolute top-2 right-2 items-center gap-1 bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition-colors duration-150 border border-gray-500 hover:shadow-2xl transition-scale hover:scale-110"
                    aria-label="Add to cart"
                >
                    <ShoppingCart size={14} />
                    <Plus size={14} />
                </button>

            <Link to={`/product/${_id}`}><img src={import.meta.env.VITE_BACKEND_URL + '/' + images[0]} alt={name} className="h-64 w-full object-cover" /></Link>
            <Link to={`/product/${_id}`} className='text-lg font-semibold'>{name}</Link>
            <Link to={`/product/${_id}`}>{price}$</Link>
            <Link to={`/product/${_id}`} className="flex items-center space-x-2">
                <div className="flex">
                    {Array.from({ length: rating }).map((_, i) => (
                        <StarFilled key={`filled-${i}`} size={20} fill={true} />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                        <StarFilled key={`empty-${i}`} size={20} fill={false} />
                    ))}
                </div>
                <p className="">({numReviews})</p>
            </Link>
        </div>
    )
}