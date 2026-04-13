import { prisma } from "../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { CategoryModel } from "../models/category.model";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string): Promise<CategoryModel> {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      throw new Error("Categoria existente");
    }

    const category = await prisma.category.create({
      data: {
        userId,
        name: data.name,
      },
    });

    return category;
  }

  async updateCategory(data: UpdateCategoryInput, id: string) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      throw new Error("Categoria não encontrada");
    }

    return prisma.category.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
  }

  async listCategories(userId: string): Promise<CategoryModel[]> {
    return prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteCategory(id: string) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      throw new Error("Categoria não encontrada");
    }

    return prisma.category.delete({
      where: { id },
    });
  }
}