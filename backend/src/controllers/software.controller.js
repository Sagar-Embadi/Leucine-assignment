// // src/controllers/software.controller.js
// const { Software } = require('../entities/Software');

// exports.createSoftware = async (req, res) => {
//   const { name, description, accessLevels } = req.body;

//   try {
//     const software = Software.create({ name, description, accessLevels });
//     await software.save();
//     res.status(201).json(software);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllSoftware = async (req, res) => {
//   try {
//     const software = await Software.find();
//     res.json(software);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import { AppDataSource } from '../config/database.js';
import { Software } from '../entities/Software.js';
import { Request } from '../entities/Request.js';

const softwareRepo = AppDataSource.getRepository(Software);
const requestRepo = AppDataSource.getRepository(Request);

export const createSoftware = async (req, res) => {
  const { name, description } = req.body;
  try {
    const existing = await softwareRepo.findOne({ where: { name } });
    if (existing) return res.status(400).json({ message: 'Software already exists' });

    const software = softwareRepo.create({ name, description });
    await softwareRepo.save(software);
    res.status(201).json({ message: 'Software created', software });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSoftware = async (req, res) => {
  try {
    const software = await softwareRepo.find();
    res.json(software);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSoftware = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const software = await softwareRepo.findOne({ where: { id: Number(id) } }); // use Number or UUID as needed

    if (!software) {
      return res.status(404).json({ message: 'Software not found' });
    }

    software.name = name ?? software.name;
    software.description = description ?? software.description;

    await softwareRepo.save(software);

    res.json({ message: 'Software updated', software });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSoftware = async (req, res) => {
  const { id } = req.params;

  try {
    const software = await softwareRepo.findOne({ where: { id: Number(id) } }); // or just id if UUID

    if (!software) {
      return res.status(404).json({ message: 'Software not found' });
    }

    await requestRepo.delete({ software: { id: Number(id) } });

    // Then delete the software
    await softwareRepo.remove(software);

    res.json({ message: 'Software and associated requests deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};