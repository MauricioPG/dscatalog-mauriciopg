import './styles.css';

const Form = () => {
  return (
    <>
      {/* --- DIV EXTERNAL --- */}
      <div className="product-crud-container">
        {/* --- DIV TITLE --- */}
        <div className="base-card product-crud-form-card">
          <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

          <form action="">
            {/* --- DIV CENTER --- */}
            <div className="row product-crud-inputs-container">
              {/* --- DIV COMBOS --- */}
              <div className="col-lg-6 product-crud-inputs-left">
                <div className="margin-botttom-30">
                  <input type="text" className="form-control base-input" />
                </div>

                <div className="margin-botttom-30">
                  <input type="text" className="form-control base-input" />
                </div>

                <div className="product-crud-input">
                  <input type="text" className="form-control base-input" />
                </div>
              </div>

              {/* --- DIV DESCRIPTION --- */}
              <div className="col-lg-6">
                <div>
                  {' '}
                  <textarea
                    name=""
                    rows={10}
                    className="form-control base-input h-auto"
                  />
                </div>
              </div>
            </div>

            {/* --- DIV BUTTONS --- */}
            <div className="product-crud-buttons-container">
              <button
                type="button"
                className="btn btn-outline-danger product-crud-button product-crud-button-first"
              >
                CANCELAR
              </button>
              <button
                type="button"
                className="btn btn-primary product-crud-button text-white"
              >
                SALVAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
