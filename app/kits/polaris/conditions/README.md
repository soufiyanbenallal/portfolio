# Conditions Components

A set of reusable components for building condition-based interfaces (e.g., Validation Rules, Automations, Segments).

## Components

### 1. `ConditionsListSection` (High-level Wrapper)

The primary component to use for most features. It handles the layout of the list, empty states, and the "Add Condition" popover.

**Usage:**

```tsx
<ConditionsListSection
  title="Conditions"
  description="Define when this triggers."
  items={activeConditions}
  popoverGroups={popoverGroups}
  onSelectItem={handleAddCondition}
  getItemLabel={(item) => item.label}
  renderItem={(item, index) => (
    <ConditionItem
      renderField={...}
      renderOperator={...}
      renderValue={...}
      onDelete={() => handleDelete(index)}
    />
  )}
/>
```

### 2. `ConditionItem`

The layout component for a single condition row. It uses a consistent 4-column grid: Field | Operator | Value | Actions.

### 3. `ConditionPopover`

A generic 2-level drill-down popover for selecting items from categories.

- Level 1: Categories/Groups
- Level 2: Specific Items/Fields

## Design Principles

- **Aesthetics**: Uses `bg-surface-secondary` for items and no borders for a clean, modern look.
- **Consistency**: Labels (Field, Operator, Value) always appear above inputs.
- **Accessibility**: Support for disabled states in the menu for already-added items.
