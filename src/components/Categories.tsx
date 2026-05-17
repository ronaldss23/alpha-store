import { Category } from '../types';

interface CategoriesProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CATEGORIES: string[] = ['Todos', 'Camisa de Time', 'Casual', 'Esportiva', 'Lançamento', 'Promoção'];

export function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
    return (
        <section className="py-12 border-y border-white/5 bg-brand-gray/30">
            <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
                <div className="flex items-center justify-center min-w-max gap-4">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all whitespace-nowrap ${
                                activeCategory === category
                                    ? 'bg-brand-gold text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
