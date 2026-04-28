export interface SubCategoryDto {
  id: number;
  name: string;
  iconName: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  color: string;
  iconName: string;
}

export interface CategoryWihtSubCategoriesDto extends CategoryDto {
  subCategories: SubCategoryDto[];
}
