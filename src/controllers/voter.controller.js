import { voter } from '../models/voter.js'
import { candidate } from '../models/candidate.js'
import { where, Op } from 'sequelize'

export const getAllVoters = async (req, res) => {
    const voters = await voter.findAll()
    res.json(voters)
}

export const getVoterById = async (req, res) => {
    const { id } = req.params
    const voterData = await voter.findByPk(id)
    if (!voterData) return res.status(404).json({ message: 'Votante no encontrado' })
    res.json(voterData)
}

export const registerVoter = async (req, res) => {
    const { name, email } = req.body

    const verifyCandidate = await candidate.findOne({ where: { name : { [Op.iLike]: name }}})
    if (verifyCandidate) return res.status(400).json({ message: 'Un candidato no puede registrarse como votante' })
    
    const newVoter = await voter.create({ name, email })
    res.status(201).json(newVoter)
}

export const deleteVoter = async (req, res) => {
    await voter.destroy({ where: { id: req.params.id } })
    res.json({ message: 'Votante eliminado exitosamente' })
}