import { Link } from 'react-router';
import { StarFilled } from './Svgs';

export default function ProductCard({ _id, name, price, gender, age, category, images, description, rating, numReviews }) {
    return (
        <Link to={`/product/${_id}`} className=" shadow hover:shadow-lg transition overflow-hidden bg-white w-[200px] sm:w-[300px] md:w-[350px] lg:w-[300px] aspect-auto m-4 rounded-md p-2 flex flex-col justify-between gap-2 hover:translate-y-[-2px]">
            <img src={import.meta.env.VITE_BACKEND_URL + '/' + images[0]} alt={name} className="h-64 w-full object-cover" />
            <p className='text-lg font-semibold'>{name}</p>
            <p>{price}$</p>
            <div className="flex items-center space-x-2">
                <div className="flex">
                    {Array.from({ length: rating }).map((_, i) => (
                        <StarFilled key={`filled-${i}`} size={20} fill={true} />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                        <StarFilled key={`empty-${i}`} size={20} fill={false} />
                    ))}
                </div>
                <p className="">({numReviews})</p>
            </div>
        </Link>
    )
}