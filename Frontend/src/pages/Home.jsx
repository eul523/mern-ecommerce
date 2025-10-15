import { useLoaderData, Link } from "react-router";
import api from "../api";
import heroImage from '../assets/hero_image.png';
import ProductCard from "../components/ProductCard";
import ScrollIndicator from "../components/ScrollIndicator";
import Title from "../components/Title";

export async function loader() {
    try {
        const res = await api.get("/products");
        return { products: res.data.products };
    } catch (err) {
        console.log(err);
        return { err: err.response?.data?.msg || err.message };
    }
}

export default function Home() {
    const { products, err } = useLoaderData();
    if (err) {
        return <h1 className="text-center text-red-600 font-bold text-2xl mt-20">Something went wrong</h1>
    }
   
    return (
        <div>
            <div className="relative flex h-[calc(100vh-50px)] p-8 justify-center items-center hero-section min-h-[50vh]">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="hero-text text-4xl sm:text-5xl font-medium animate-fadeInUp">
                        Discover fashion that blends comfort, confidence, and creativity
                    </h1>

                    <Link to='/collections' class="hero-btn flex items-center gap-2 w-fit">
                        Collections
                        <span class="arrow inline"></span>
                    </Link>

                    <ScrollIndicator />

                </div>

                <img src={heroImage} alt="Hero" className="hidden md:block h-[500px] w-auto max-h-[90vh]  object-cover select-none pointer-events-none" />

            </div>

            <div>
                {products.latest && products.latest.length > 0 && (
                    <div>
                        <Title title='Latest Arrivals' />
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {products.latest.map(prod => <ProductCard key={prod._id} {...prod} />)}
                        </div>
                    </div>
                )}
            </div>
            <div>
                {products.men && products.men.length > 0 && (
                    <div>
                        <Title title="Men's Collection" />
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {products.men.map(prod => <ProductCard key={prod._id} {...prod} />)}
                        </div>
                    </div>
                )}
            </div>
            <div>
                {products.women && products.women.length > 0 && (
                    <div>
                        <Title title="Women's Collection" />
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {products.women.map(prod => <ProductCard key={prod._id} {...prod} />)}
                        </div>
                    </div>
                )}
            </div>
            <div>
                {products.children && products.children.length > 0 && (
                    <div>
                        <Title title="For your children" />
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {products.children.map(prod => <ProductCard key={prod._id} {...prod} />)}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}