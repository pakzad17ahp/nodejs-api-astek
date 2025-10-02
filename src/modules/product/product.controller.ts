import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {
  productService = new ProductService();

  async getAll(req: Request, res: Response) {
    const products = await this.productService.getAll();
    return res.status(200).json(products);
  }

  async getById(req: Request, res: Response) {
    const product = await this.productService.getById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product_not_found" });
    return res.status(200).json(product);
  }

  async create(req: Request, res: Response) {
    try {
      const { name, product_type, color } = req.body;
      const userId = req.user.id;

      const product = await this.productService.create({
        name,
        product_type,
        color,
        user_id: userId,
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error creating product", error: err });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, product_type, color } = req.body;
      const userId = req.user.id;

      const product = await this.productService.update(req.params.id, {
        name,
        product_type,
        color,
        user_id: userId,
      });

      if (!product)
        return res.status(404).json({ message: "Product_not_found" });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error updating product", error: err });
    }
  }
}
