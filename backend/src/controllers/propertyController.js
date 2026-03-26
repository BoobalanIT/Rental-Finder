const { createProperty, getAllProperties,deletePropertyById,getPropertyById,updatePropertyById } = require('../models/propertyModel');

const addProperty = async (req, res) => {
  try {
    const data = {
      ...req.body,
      owner_id: req.user.id
    };

    const property = await createProperty(data);
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const fetchProperties = async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const property = await getPropertyById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // 🔐 Authorization check
    if (
      property.owner_id !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await deletePropertyById(propertyId);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const property = await getPropertyById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // 🔐 Authorization check
    if (
      property.owner_id !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const updated = await updatePropertyById(propertyId, req.body);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addProperty,fetchProperties,deleteProperty,updateProperty};