import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add or Increment if exists
      addOrIncrement: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => String(item.productId) === String(product._id || product.productId)
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId == (product._id || product.productId)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
          toast.success('Added to cart');
        } else {
          set({
            items: [
              ...items,
              {
                productId: product._id || product.productId,
                name: product.name,
                price: product.price,
                quantity,
                gender: product.gender,
                category: product.category,
                age: product.age,
                image: product.images?.[0] || product.image || '',
              },
            ],
          });
          toast.success('Added to cart');
        }
      },

      // Increment
      increment: (productId) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            item.productId == productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
        toast.success('Added to cart');
      },

      // Decrement
      decrement: (productId) => {
        const { items } = get();
        const item = items.find((i) => i.productId === productId);
        if (!item) return;

        if (item.quantity <= 1) {
          set({ items: items.filter((i) => i.productId !== productId) });
          toast.success('Removed from cart');
        } else {
          set({
            items: items.map((i) =>
              i.productId == productId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });
        }
      },

      // Update quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.productId !== productId) });
        } else {
          set({
            items: get().items.map((item) =>
              item.productId == productId ? { ...item, quantity } : item
            ),
          });
        }
      },

      //  Remove item
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
        toast.success('Removed from cart');
      },

      // Clear all
      clearCart: () => set({ items: [] }),

      // Get total
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
