import React, {useState,useEffect} from 'react';
import LoggedInHeader from '../components/common/LoggedInHeader';
import { GET_PRODUCTS_RELATED_TO_USER } from '../services/queries';
import { useQuery } from '@apollo/client';
import ProductCard from '../components/product/ProductCard';
import '../styles/Product.css';
import '../styles/LoggedInHeader.css';
import '../styles/modal.css';

const UserProductTransaction = () => {
    try{
    const { loading, error, data } = useQuery(GET_PRODUCTS_RELATED_TO_USER);
    const [products, setProducts] = useState([]);
    const [transactionType, setTransactionType] = useState('bought');
    const [bought, setBought] = useState([]);
    const [sold, setSold] = useState([]);
    const [borrowed, setBorrowed] = useState([]);
    const [lent, setLent] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            try {
                if (!loading && !error && data) {
                    
                    setBorrowed(data.findAllProductRelatedToUser.borrowed);
                    setLent(data.findAllProductRelatedToUser.lent);
                    setSold(data.findAllProductRelatedToUser.sold);
                    setBought(data.findAllProductRelatedToUser.bought);
                    
                    setTransactionType("Bought");
                    console.log(data.findAllProductRelatedToUser);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [loading, error, data]);

    useEffect(() => {
        const filterProducts = () => {
            switch (transactionType) {
                case 'Bought':
                    setProducts(bought);
                    break;
                case 'Sold':
                    setProducts(sold);
                    break;
                case 'Borrowed':
                    setProducts(borrowed);
                    break;
                case 'Lent':
                    setProducts(lent);
                    break;
                default:
                    setProducts(bought);
            }
        };
        filterProducts();
    }, [transactionType]);

    if (loading) return <p>Loading...</p>;
    if (error) console.log(error)

    const handleTransactionType = (type) => {
        setTransactionType(type);
        console.log(transactionType);
        console.log(bought);
    };
    //style="margin-left:5px;margin-right:5px;"
  
    return (
    <div>
      <LoggedInHeader />
      <h2 className="product-grid">My Transactions</h2>
      <div className="product-grid logged-in-header">
        <nav>
            <button onClick={()=>handleTransactionType("Bought")} className="trans-button modal-button-confirm">Bought</button>
            <button onClick={()=>handleTransactionType("Sold")}  className="trans-button modal-button-confirm">Sold</button>
            <button onClick={()=>handleTransactionType("Borrowed")} className="trans-button modal-button-confirm">Borrowed</button>
            <button onClick={()=>handleTransactionType("Lent")} className="trans-button modal-button-confirm">Lent</button>
        </nav>
        
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} link={`/product/${product.id}`}/>
        ))}
      </div>
    </div>
  );
}
catch (error) {
    console.error(error);
}
};

export default UserProductTransaction;
