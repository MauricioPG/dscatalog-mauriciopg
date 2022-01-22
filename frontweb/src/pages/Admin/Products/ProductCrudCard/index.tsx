import './styles.css';
import ProductPrice from '../../../../components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';

type Props = {
  product: Product;
};

const ProductCrudCard = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card">
      {/* --- DIV IMAGE */}
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.description} />
      </div>

      {/* --- DIV CENTER MAIN  */}
      <div className="product-crud-main">
        {/* --- DIV DESCRIPTION */}
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>

        {/* --- DIV BADGES */}
        <div className="product-crud-categories-container">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCrudCard;
