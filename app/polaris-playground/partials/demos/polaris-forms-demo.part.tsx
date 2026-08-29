"use client";

import React from "react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";

export function PolarisFormsDemoPart() {
  const propsConfig = usePolarisPlaygroundStore((state) => state.propsConfig);
  const updatePropsConfig = usePolarisPlaygroundStore(
    (state) => state.updatePropsConfig,
  );

  return (
    <div className="w-full rounded-2xl border border-gray-30 bg-white p-6 shadow-sm overflow-x-auto">
      <s-page heading="Create New Product" inlineSize="base">
        <s-section heading="Product Information">
          <s-stack direction="block" gap="base">
            <s-text-field
              label="Product Title"
              name="title"
              value={propsConfig.formInputTitle}
              placeholder="e.g. Minimalist Ceramic Mug"
              required
            ></s-text-field>

            <s-text-area
              label="Description"
              name="description"
              rows={4}
            ></s-text-area>

            <s-grid gridTemplateColumns="1fr 1fr" gap="base">
              <s-money-field
                label="Price"
                name="price"
                min={0}
                max={99999}
              ></s-money-field>

              <s-number-field
                label="Inventory Quantity"
                name="inventory"
                min={0}
                step={1}
              ></s-number-field>
            </s-grid>

            <s-select label="Collection" name="collection">
              <s-option value="electronics">Electronics &amp; Gear</s-option>
              <s-option value="home">Home &amp; Kitchen</s-option>
              <s-option value="apparel">Apparel &amp; Accessories</s-option>
            </s-select>

            <s-color-field
              label="Accent Color"
              name="accentColor"
              value={propsConfig.selectedColor}
            ></s-color-field>

            <s-switch
              label="Track inventory for this product"
              name="trackInventory"
              checked={propsConfig.switchChecked}
            ></s-switch>

            <s-drop-zone
              label="Upload Product Images"
              name="images"
              accept=".jpg,.png,.webp"
              multiple
            ></s-drop-zone>

            <s-button-group gap="base">
              <s-button variant="primary" icon="save">Create Product</s-button>
              <s-button variant="secondary">Save as Draft</s-button>
            </s-button-group>
          </s-stack>
        </s-section>
      </s-page>
    </div>
  );
}
