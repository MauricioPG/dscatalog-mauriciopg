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
      <div className="product-crud-card-decription">
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

      {/* --- DIV BUTTONS */}
      <div className="product-crud-card-buttons-container">
        <button
          type="button"
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-first"
        >
          EXCLUIR
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary product-crud-card-button"
        >
          EDITAR
        </button>
      </div>
    </div>
  );
};

export default ProductCrudCard;
