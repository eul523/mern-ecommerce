import { useLoaderData, Link } from "react-router";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

export async function loader({ params, request }) {
    const category = params.category;
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort") || "relevance";
    const age = url.searchParams.get("age") || "";

    try {
        const res = await api.get(`/products/category/${category}?sort=${sort}${age ? `&age=${age}` : ""}`);
        return res.data;
    } catch (err) {
        return { err: err?.response?.data?.msg || err.message };
    }
}

export default function CategoriesPage() {
    const { category, products: initialProducts, err } = useLoaderData();
    const [products, setProducts] = useState(initialProducts || []);
    const [sortBy, setSortBy] = useState("relevance");
    const [ageFilter, setAgeFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const sortOptions = [
        { label: "Relevance", value: "relevance" },
        { label: "Price: Low → High", value: "price-low" },
        { label: "Price: High → Low", value: "price-high" },
        { label: "Latest", value: "latest" },
    ];

    const ageOptions = [
        { label: "All Children", value: "" },
        { label: "Boys", value: "men" },
        { label: "Girls", value: "women" },
    ];

    const categories = [
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Kids", value: "children" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(
                    `/products/category/${category}?sort=${sortBy}${ageFilter ? `&age=${ageFilter}` : ""}`
                );
                setProducts(res.data.products);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sortBy, ageFilter, category]);

    if (err) return <h1 className="text-red-600 font-semibold">Error: {err}</h1>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* 🔹 Category Header */}
            <div className="flex justify-center mb-10">
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 bg-white shadow-sm px-6 py-3 rounded-full">
                    {categories.map((cat) => (
                        <Link
                            key={cat.value}
                            to={`/category/${cat.value}`}
                            className={`text-sm sm:text-base font-semibold transition-all ${
                                category === cat.value
                                    ? "text-white bg-slate-800 px-4 py-1.5 rounded-full shadow-md"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            {cat.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* 🔹 Filters & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
                <h1 className="text-3xl font-bold capitalize text-slate-800">
                    {category === "children" ? "Kids Collection" : `${category} Collection`}
                </h1>

                <div className="flex gap-3 items-center">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    {category === "children" && (
                        <select
                            value={ageFilter}
                            onChange={(e) => setAgeFilter(e.target.value)}
                            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                            {ageOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* 🔹 Product List */}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
                </div>
            ) : products.length ? (
                <motion.div
                    layout
                    className="flex flex-wrap justify-center gap-6"
                >
                    {products.map((prod) => (
                        <motion.div
                            key={prod._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard {...prod} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <p className="text-center text-slate-500 py-10 text-lg">No products found.</p>
            )}
        </div>
    );
}
