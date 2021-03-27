import { Products } from "../../models/product";
import { dataBase } from "../database";

export const createProductUtil = async (product: Products) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `INSERT INTO products (idProducts, name, stock, update_at, source, description, tipo) VALUES ('${product.idProducts}', '${product.name}', ${product.stock}, '${product.update_at}', ${product.source ? `'${product.source}'` : null}, ${product.description ? `'${product.description}'` : null}, ${product.tipo ? `'${product.tipo}'` : null});`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const getProductNameUtil = async (name: string) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `SELECT * FROM products WHERE name = '${name}';`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          }) as Products[];
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export const getProductUtil = async (idProducts: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT * FROM products WHERE idProducts = '${idProducts}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as Products[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const getProductsUtil = async () => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `SELECT * FROM products ORDER BY name DESC;`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          }) as Products[];
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export const getProductsByTipoPacientUtil = async (tipoPacient: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT * FROM products WHERE tipo = '${tipoPacient}' ORDER BY name DESC;`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as Products[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const updateProductUtil = async (idProducts: string, stock: number) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `UPDATE products SET stock = ${stock} WHERE idProducts = '${idProducts}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}

export const deleteProductUtil = async (idProducts: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `DELETE FROM products WHERE idProducts = '${idProducts}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}