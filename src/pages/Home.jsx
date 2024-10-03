import React, { useEffect, useState } from 'react';

function Home() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        if (token) {
            fetch('https://auth-rg69.onrender.com/api/products/private/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const handleCreateProduct = (e) => {
        e.preventDefault();

        if (token) {
            fetch('https://auth-rg69.onrender.com/api/products/private', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProduct)
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Mahsulot yaratishda xatolik!');
                }
                return res.json();
            })
            .then(data => {
                setProducts(prevProducts => [...prevProducts, data]);
                setNewProduct({ name: '', price: '' });
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const handleDeleteProduct = (id) => {
        if (token) {
            fetch(`https://auth-rg69.onrender.com/api/products/private/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Mahsulot o\'chirishda xatolik!');
                }
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Mahsulot yarating</h1>

            <form onSubmit={handleCreateProduct} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col gap-4">                <input type="text" placeholder="Mahsulot nomi" value={newProduct.name}onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"required/>
                <input type="number" placeholder="Narxi" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"required/>
                <button type="submit" className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-all duration-200 w-full font-semibold">Mahsulot yaratish</button>
            </form>

            <ul className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                {products.length === 0 ? (
                    <li className="text-center text-gray-500">Mahsulotlar mavjud emas.</li>
                ) : (
                    products.map(product => (
                        <li key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                            <span className="text-gray-700">$ {product.name} - {product.price} </span>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-500 transition duration-200">O'chirish</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Home;
