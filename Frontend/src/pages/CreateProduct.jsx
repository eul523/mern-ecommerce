import {
    useForm
} from "react-hook-form";
import api from "../api";
import {
    useNavigate
} from "react-router";
import {
    useState, useEffect, useRef
} from "react";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

// Hardcoded options (fallback)
const genderOptions = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' }
];

const ageOptions = [
    { value: 'adult', label: 'Adult' },
    { value: 'children', label: 'Children' },
]
const categoryOptions = [
    { value: 'topwear', label: 'Topwear' },
    { value: 'bottomwear', label: 'Bottomwear' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'outerwear', label: 'Outerwear' },
];

export default function CreateProduct() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm();
    const navigate = useNavigate();
    const [imageItems, setImageItems] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        if (files.length + imageItems.length > 5) {
            toast.error('Maximum 5 images allowed.');
            return;
        }

        const newItems = files.map((file) => {
            if (!file.type.startsWith('image/')) {
                toast.error("Upload a valid image.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Maximum 5MB allowed.");
                return;
            }
            return {
                file,
                url: URL.createObjectURL(file)
            };
        }).filter(Boolean);

        setImageItems((prev) => [...prev, ...newItems]);

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImageAt = (index) => {
        setImageItems((prev) => {
            const newItems = [...prev];
            const removedItem = newItems.splice(index, 1)[0];
            if (removedItem.url) URL.revokeObjectURL(removedItem.url);
            return newItems;
        });
    };

    useEffect(() => {
        return () => {
            imageItems.forEach((it) => it.url && URL.revokeObjectURL(it.url));
        };

    }, []);

    const onSubmit = async (data) => {
        setUploading(true);
        try {
            let formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('gender', data.gender);
            formData.append('age', data.age);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('rating', data.rating);
            formData.append('numReviews', data.numReviews);
            for(let i = 0; i < imageItems.length; i++) {
                formData.append('images', imageItems[i].file);
            }
            const res = await api.post('/products', formData);
            console.log(res);
            toast.success(res?.data?.msg);
            reset();
            setImageItems([]);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.msg || err.message);
        }
        setUploading(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 p-6 border rounded">
                <input {...register("name", { required: "Name is required" })} placeholder="Product Name" className="w-full p-2 border mb-4" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input {...register("price", { required: "Price is required", valueAsNumber: true })} type="number" placeholder="Price" className="w-full p-2 border mb-4" />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                <textarea {...register("description", { required: "Description is required" })} placeholder="Description" className="w-full p-2 border mb-4"></textarea>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <select {...register("category", { required: "Category is required" })} placeholder="Category" className="w-full p-2 border mb-4" >
                    {categoryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                <select {...register("gender", { required: "Gender is required" })} placeholder="Class" className="w-full p-2 border mb-4">
                    {genderOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

                <select {...register("age", { required: "Age is required" })} placeholder="Age" className="w-full p-2 border mb-4">
                    {ageOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                <input {...register("rating", { required: "Rating is required" })} placeholder="Rating" className="w-full p-2 border mb-4"/>
                
                {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                <input {...register("numReviews", { required: "numrev is required" })} placeholder="numrev" className="w-full p-2 border mb-4"/>
                
                {errors.numReviews && <p className="text-red-500">{errors.numReviews.message}</p>}
                


                <label className="block mt-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mt-1"
                        hidden
                        disabled={isSubmitting}
                        aria-describedby="image-help"
                    />
                    <button type="button" onClick={() => fileInputRef.current?.click()}><Upload size={30} /></button>
                    <div id="image-help" className="text-xs text-gray-500">You can upload up to 5 images.</div>
                </label>

                {imageItems.length > 0 && (
                    <div className="h-[120px] w-full overflow-x-auto flex items-start gap-2 mt-3">
                        {imageItems.map((it, i) => (
                            <div key={i} className="relative inline-block">
                                <img
                                    className="h-[100px] w-auto rounded-md shadow-sm object-cover"
                                    src={it.url}
                                    alt={`Selected ${i + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImageAt(i)}
                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                                    aria-label={`Remove image ${i + 1}`}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit" disabled={uploading} className="w-full bg-blue-500 text-white p-2 mt-4 rounded">
                    {uploading ? "Uploading..." : "Create Product"}
                </button>
            </form>
        </div>
    )
}