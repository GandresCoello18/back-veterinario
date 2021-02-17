import { Products } from "../../models/product";
import { dataBase } from "../database";

export const createProductUtil = async (product: Products) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `INSERT INTO products (idProducts, name, stock, update_at, source, description) VALUES ('${product.idProducts}', '${product.name}', ${product.stock}, '${product.update_at}', ${product.source ? `'${product.source}'` : null}, ${product.description ? `'${product.description}'` : null});`,
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
