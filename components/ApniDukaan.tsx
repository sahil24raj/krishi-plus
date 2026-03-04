import React from 'react';

const ProductCard = ({ name, price, seller, location, image }: { name: string, price: string, seller: string, location: string, image: string }) => (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden group">
        <div className="overflow-hidden">
             <img className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" src={image} alt={name} />
        </div>
        <div className="p-4">
            <h3 className="text-lg font-bold text-text-primary">{name}</h3>
            <p className="text-2xl font-extrabold text-primary my-2">{price}<span className="text-sm font-normal text-text-secondary">/kg</span></p>
            <div className="text-sm text-gray-600">
                <p><strong>Seller:</strong> {seller}</p>
                <p><strong>Location:</strong> {location}</p>
            </div>
            <button className="w-full mt-4 bg-secondary text-white font-semibold py-2 rounded-lg hover:bg-secondary-dark transition-colors">Contact Seller</button>
        </div>
    </div>
);

const ApniDukaan = () => {
    const products = [
        { name: "Fresh Organic Tomatoes", price: "₹30", seller: "Kishan Kumar", location: "Nashik, Maharashtra", image: "https://picsum.photos/seed/tomatoes/400/300" },
        { name: "Basmati Rice (Premium)", price: "₹80", seller: "Harpreet Singh", location: "Karnal, Haryana", image: "https://picsum.photos/seed/rice/400/300" },
        { name: "Sonora Wheat", price: "₹25", seller: "Rajesh Patel", location: "Indore, Madhya Pradesh", image: "https://picsum.photos/seed/wheatfield/400/300" },
        { name: "Alphonso Mangoes", price: "₹150", seller: "Ramesh Pawar", location: "Ratnagiri, Maharashtra", image: "https://picsum.photos/seed/mangoes/400/300" },
        { name: "Red Onions", price: "₹20", seller: "Meena Gupta", location: "Alwar, Rajasthan", image: "https://picsum.photos/seed/onions/400/300" },
        { name: "Organic Potatoes", price: "₹22", seller: "Suresh Yadav", location: "Agra, Uttar Pradesh", image: "https://picsum.photos/seed/potatoes/400/300" },
    ];

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Apni Dukaan</h1>
                <p className="mt-2 text-lg text-text-secondary">Fresh produce directly from our farmers.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* FIX: Pass props explicitly to avoid TypeScript error with spread operator and key prop */}
                {products.map(product => <ProductCard key={product.name} name={product.name} price={product.price} seller={product.seller} location={product.location} image={product.image} />)}
            </div>
        </div>
    );
};

export default ApniDukaan;