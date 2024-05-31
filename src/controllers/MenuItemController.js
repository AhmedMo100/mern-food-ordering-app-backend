// controllers/MenuItemController.js

import MenuItem from "../models/MenuItem";

// Controller function to update a menu item
const updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, description, price, category } = req.body;

    // Check if the item exists
    const existingItem = await MenuItem.findById(itemId);
    if (!existingItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Update the item with the new data
    existingItem.name = name;
    existingItem.description = description;
    existingItem.price = price;
    existingItem.category = category;

    // Save the updated item to the database
    await existingItem.save();

    res.status(200).json({ message: "Menu item updated successfully", menuItem: existingItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { updateMenuItem };
