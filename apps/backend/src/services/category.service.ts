import { Category } from "../../prisma/generated/prisma/client";
import { prisma } from "../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string): Promise<Category> {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: data.name,
        userId,
      },
    });

    if (existingCategory) {
      throw new Error("Categoria existente");
    }

    const category = await prisma.category.create({
      data: {
        userId,
        name: data.name,
        icon: data.iconName,
        color: data.color,
      },
    });

    return category;
  }

  async updateCategory(data: UpdateCategoryInput, id: string, userId: string) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!existingCategory) {
      throw new Error("Categoria não encontrada");
    }

    return prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        icon: data.iconName,
        color: data.color,
      },
    });
  }

  async listCategories(userId: string): Promise<Category[]> {
    return prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteCategory(id: string, userId: string) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!existingCategory) {
      throw new Error("Categoria não encontrada");
    }

    return prisma.category.delete({
      where: { id },
    });
  }

  async findCategory(id: string): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    return category;
  }
}