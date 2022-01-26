import './styles.css';
import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import ButtonIcon from '../../components/ButtonIcon';
import { Link } from 'react-router-dom';
// import TestChildren from 'components/TestChild';

const Home = () => {
  return (
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-content-container">
          <div>

            {/* <TestChildren price = {123.56}>
                   <h2>Linha 2</h2>
                   <h2>Linha 3</h2>
                </TestChildren> */}
            <h1>Conheça o melhor catálogo de produtos</h1>
            <p>
              Ajudaremos você a encontrar os melhores produtos disponíveis no
              mercado.
            </p>
          </div>
          <div>
            <Link to="/products">
              <ButtonIcon  text = "Inicie agora a sua busca"/>
            </Link>
          </div>
        </div>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
    </div>
  );
};

export default Home;
