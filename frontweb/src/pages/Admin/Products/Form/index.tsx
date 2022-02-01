import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';

import { toast } from 'react-toastify';

import './styles.css';
import { error } from 'console';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();
  const isEditing = productId !== 'create';
  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  //* GET VALUES FROM CAT */
  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) =>
      setSelectCategories(response.data.content)
    );
  }, []);

  // Quando editando, preenche os dados do card
  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        // type safety com cast
        const product = response.data as Product;

        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      price: String(formData.price).replace(',', '.'),
    };
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/productsx',
      data: data,
      withCredentials: true,
    };

    requestBackend(config)
    .then(() => {
      toast.info('Produto cadastrado com sucesso!');
      history.push('/admin/products');
    })
    .catch((response) => {
      toast.error("Erro ao cadastrar o produto ");
    });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      {/* --- DIV TITLE --- */}
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --- DIV CENTER --- */}
          <div className="row product-crud-inputs-container">
            {/* --- DIV COMBOS --- */}
            <div className="col-lg-6 product-crud-inputs-left">
              <div className="margin-botttom-30">
                <input
                  {...register('name', {
                    required: 'Campo Obrigatório',
                    minLength: 5,
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name && errors.name.type === 'minLength' && (
                    <span>Mínimo 5 caracteres</span>
                  )}
                </div>
                <div className="invalid-feedback d-block">
                  {errors.name && errors.name.type === 'required' && (
                    <span>Campo obrigatório</span>
                  )}
                </div>
              </div>

              {/* combo box categories */}
              {/* Obs: field desestruturado */}
              <div className="margin-botttom-30">
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(categoy: Category) => categoy.name}
                      getOptionValue={(categoy: Category) => String(categoy.id)}
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div className="margin-botttom-30">
                <Controller
                  name="price"
                  rules={{ required: 'Campo obrigatório' }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder="Preço"
                      className={`form-control base-input ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      disableGroupSeparators={true}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              {/* DIV IMG */}
              <div className="margin-botttom-30">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Deve ser uma URL válida',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="URL da imagem do produto"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
            </div>

            {/* --- DIV DESCRIPTION --- */}
            <div className="col-lg-6">
              <div>
                {' '}
                <textarea
                  rows={10}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>

          {/* --- DIV BUTTONS --- */}
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
