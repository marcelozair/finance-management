import { useMemo } from "react";
import {
  Box,
  Flex,
  Portal,
  Select,
  createListCollection,
  type CollectionOptions,
} from "@chakra-ui/react";
import { RenderIcon } from "@shared/presentation/components/RenderIcon/RenderIcon";

import type {
  SubCategoryDto,
  CategoryWihtSubCategoriesDto,
} from "src/modules/transaction/domain/interfaces/CategoryWithSubCategoryDto";

interface CategorySelectProps {
  categories: CategoryWihtSubCategoriesDto[];
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
  error?: string;
}

interface CollectionCategory {
  icon: string;
  color: string;
  label: string;
  value: string;
}

export const CategorySelect = ({
  categories,
  value,
  onValueChange,
  error,
}: CategorySelectProps) => {
  const categoriesCollection = useMemo(() => {
    return createListCollection<CollectionCategory>(
      categories.reduce(
        (collection: CollectionOptions<CollectionCategory>, category) => {
          const subcategories = category.subCategories.map(
            (subCategory: SubCategoryDto) => ({
              color: category.color,
              label: subCategory.name,
              icon: subCategory.iconName,
              value: JSON.stringify({
                categoryId: category.id,
                subCategoryId: subCategory.id,
              }),
            }),
          );

          collection.items = [...collection.items, ...subcategories];

          return collection;
        },
        { items: [] },
      ),
    );
  }, [categories]);

  const selectedItem = useMemo(() => {
    if (!value || value.length === 0) return null;
    return categoriesCollection.items.find((item) => item.value === value[0]);
  }, [value, categoriesCollection.items]);

  return (
    <>
      <Select.Root
        collection={categoriesCollection}
        size="sm"
        width="100%"
        value={value}
        onValueChange={onValueChange}
      >
        <Select.HiddenSelect />
        <Select.Label>Category</Select.Label>
        <Select.Control>
          <Select.Trigger>
            {selectedItem ? (
              <Flex align="center" gap={2}>
                <Box
                  rounded="md"
                  bg={selectedItem.color}
                  p={1}
                  h="24px"
                  w="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <RenderIcon name={selectedItem.icon} />
                </Box>
                {selectedItem.label}
              </Flex>
            ) : (
              <Select.ValueText placeholder="Select a category" />
            )}
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categories.map((category) => {
                return (
                  <Select.ItemGroup key={category.id}>
                    <Select.ItemGroupLabel>
                      <Flex align="center" gap={2}>
                        <RenderIcon name={category.iconName} />
                        {category.name}
                      </Flex>
                    </Select.ItemGroupLabel>

                    {category.subCategories.map((subCategory) => {
                      const valueString = JSON.stringify({
                        categoryId: category.id,
                        subCategoryId: subCategory.id,
                      });
                      const collectionItem = categoriesCollection.items.find(
                        (i) => i.value === valueString,
                      ) || {
                        value: valueString,
                        label: subCategory.name,
                        icon: subCategory.iconName,
                        color: category.color,
                      };

                      return (
                        <Select.Item
                          item={collectionItem}
                          key={valueString}
                          pl={4}
                        >
                          <Flex align="center" gap={2}>
                            <Box rounded="md" bg={category.color} p={2}>
                              <RenderIcon name={subCategory.iconName} />
                            </Box>
                            {subCategory.name}
                          </Flex>
                        </Select.Item>
                      );
                    })}
                  </Select.ItemGroup>
                );
              })}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {error && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </div>
      )}
    </>
  );
};
