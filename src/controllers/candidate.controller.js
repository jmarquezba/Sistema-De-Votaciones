import { voter } from '../models/voter.js'
import { candidate } from '../models/candidate.js'
import { where, Op } from 'sequelize'

export const getAllCandidates = async (req, res) => {
    const candidates = await candidate.findAll()
    res.json(candidates)
}

export const registerCandidate = async (req, res) => {
    const { name, party } = req.body

    console.log(name, party)

    const verifyVoter = await voter.findOne({ where: { name : { [Op.eq]: name }}})
    if (verifyVoter) return res.status(400).json({ message: 'Un votante no puede registrarse como candidato' })
    
    const newCandidate = await candidate.create({ name, party })
    res.status(201).json(newCandidate)
}


export const getCandidateById = async (req, res) => {
    const { id } = req.params
    const candidateData = await candidate.findByPk(id)
    if (!candidateData) return res.status(404).json({ message: 'Candidato no encontrado' })
    res.json(candidateData)
}


export const deleteCandidate = async (req, res) => {
    await candidate.destroy({ where: { id: req.params.id } })
    res.json({ message: 'Candidato eliminado exitosamente' })
}