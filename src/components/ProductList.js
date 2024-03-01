import { useState } from "react"
import { useFetch } from "../hooks/useFetch";

export const ProductList = () => {
    //const [products, setProducts] = useState([]);
    const [url, setUrl] = useState("http://localhost:8000/products");
    const { data: products, loading, error } = useFetch(url, {content: "ABC"});
    /*useEffect(() => {
         fetch(url)
             .then(response => response.json())
             .then(data => setProducts(data));
     }, [url])

     const fetchProducts = useCallback(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
    }, [url]);

    useEffect(() => {        
        fetchProducts();
    }, [fetchProducts]);*/

    return (
        <section>
            <div className="filter">
                <button onClick={() => setUrl("http://localhost:8000/products")}>All</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock=1")}>In Stock Only</button>
            </div>
            {loading && <p className="loading">Product is loading...</p>}
            {error && <p>{error}</p>}
            {products && products.map((product) => (
                <div className="card" key={product.id}>
                    <p className="id">{product.id}</p>
                    <p className="name">{product.name}</p>
                    <p className="info">
                        <span>${product.price}</span>
                        <span className={product.in_stock ? "instock" : "unavailable"}>{product.in_stock ? "Available" : "Out of Stock"}</span>
                    </p>
                </div>
            ))}
        </section>
    )
}
