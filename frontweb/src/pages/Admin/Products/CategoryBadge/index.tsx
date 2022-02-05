import './styles.css';

type Props = {
   name: string;
};

const CategoryBadge = ({ name }: Props) => {
   return (
      <div className="category-badge-container">
         <p>{name}</p>
      </div>
   );
};

export default CategoryBadge;
