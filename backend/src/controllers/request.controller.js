// // src/controllers/request.controller.js
// const { Request } = require('../entities/Request');
// const { User } = require('../entities/User');
// const { Software } = require('../entities/Software');

// exports.submitRequest = async (req, res) => {
//   const userId = req.user.id;
//   const { softwareId, accessType, reason } = req.body;

//   try {
//     const user = await User.findOneBy({ id: userId });
//     const software = await Software.findOneBy({ id: softwareId });

//     if (!user || !software) return res.status(404).json({ message: 'User or software not found' });

//     const request = Request.create({ user, software, accessType, reason, status: 'Pending' });
//     await request.save();

//     res.status(201).json(request);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getPendingRequests = async (req, res) => {
//   try {
//     const requests = await Request.find({ relations: ['user', 'software'], where: { status: 'Pending' } });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateRequestStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     const request = await Request.findOneBy({ id });
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     request.status = status;
//     await request.save();

//     res.json({ message: 'Status updated' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import { AppDataSource } from '../config/database.js';
import { Request } from '../entities/Request.js';
import { User } from '../entities/User.js';
import { Software } from '../entities/Software.js';

const requestRepo = AppDataSource.getRepository(Request);

export const createRequest = async (req, res) => {
  const { softwareId, accessType,reason, } = req.body;

  try {
    const software = await AppDataSource.getRepository(Software).findOneBy({ id: softwareId });
    if (!software) return res.status(404).json({ message: 'Software not found' });

    const user = await AppDataSource.getRepository(User).findOneBy({ id: req.user.id });

    const request = requestRepo.create({ software, user, access: accessType, reason });
    await requestRepo.save(request);
    res.status(201).json({ message: 'Request submitted', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    let requests;
    if (req.user.role === 'Admin' || req.user.role === 'Manager' || req.user.role === 'Employee') {
      requests = await requestRepo.find();
    } else {
      requests = await requestRepo.find({ where: { user: { id: req.user.id } } });
    }
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const updateRequestStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!['Approved', 'Rejected'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status' });
//   }

//   try {
//     const request = await requestRepo.findOne({ id: parseInt(id) });
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     request.status = status;
//     await requestRepo.save(request);

//     res.json({ message: 'Status updated', request });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const request = await requestRepo.findOne({
      where: { id: parseInt(id) },
    });

    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await requestRepo.save(request);

    res.json({ message: 'Status updated', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
