package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	// Coalesce e Lista de categorias para atender requisitos do postgres
	// @Query("SELECT DISTINCT obj FROM Product obj "
	//		+ "INNER JOIN obj.categories cats "
	//		+ "WHERE (:category IS NULL OR :category IN cats) "
	//		+ "AND "
	//		+ "( LOWER (obj.name) LIKE LOWER (CONCAT ('%',:name,'%') ) )")

			
	@Query("SELECT DISTINCT obj FROM Product obj " 
			+ "INNER JOIN obj.categories cats WHERE "
			+ "(COALESCE(:categories) IS NULL OR cats IN :categories) AND "
			+ "(:name = '' OR  LOWER (obj.name) LIKE LOWER (CONCAT ('%',:name,'%')))")
	Page<Product> findFiltered(List <Category> categories, String name, Pageable pageable);
	
	@Query("SELECT obj FROM Product obj JOIN FETCH obj.categories "
			+ " WHERE obj IN :products")
	List<Product> findProductsWithCategories(List<Product> products);

}
