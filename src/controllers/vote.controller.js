import { voter } from '../models/voter.js'
import { candidate } from '../models/candidate.js'
import { vote } from '../models/vote.js'
import { sequelize } from '../config/db.js'

export const castVote = async (req, res) => {
    const { voter_id, candidate_id } = req.body

    try {
        const voterData = await voter.findByPk(voter_id)
        if (!voterData) return res.status(404).json({ message: 'El votante no ha sido encontrado' })
        if (voterData.has_voted) return res.status(400).json({ message: 'El votante ya emitió su voto' })

        const candidateData = await candidate.findByPk(candidate_id)
        if (!candidateData) return res.status(404).json({ message: 'El candidato no ha sido encontrado' })

        const newVote = await vote.create({ voter_id, candidate_id })

        await voter.update({ has_voted: true }, { where: { id: voter_id } })

        await candidate.increment('votes', { by: 1, where: { id: candidate_id } })

        res.status(201).json({ message: 'Voto emitido exitosamente', vote: newVote })
    
    } catch (error) {
        console.error('Error emitiendo el voto', error)
        res.status(500).json({ message: 'Error al emitir el voto' })
    }
}

export const getAllVotes = async (req, res) => {
    const votes = await vote.findAll()
    res.json(votes)
}

export const generateStatistics = async (req, res) => {
    try {
        const totalVotes = await vote.count()

        const votesByCandidate = await vote.findAll({
            attributes: [
                'candidate_id', 
                [sequelize.fn('COUNT', sequelize.col('candidate_id')), 'voteCount']
            ],
            group: 'candidate_id',
            include: [{
                model: candidate,
                as: 'candidate', // Usar el alias definido en las relaciones
                attributes: ['name', 'party']
            }]
        }); 

        const statistics = votesByCandidate.map(vote => {
            const voteCount = parseInt(vote.getDataValue('voteCount'))
            const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0

            return {
                candidateId: vote.candidate_id,
                candidateName: vote.candidate?.name || 'Unknown',
                candidateParty: vote.candidate?.party || 'Unknown',
                voteCount,
                percentage: parseFloat(percentage)
            }
        });

        // CAMBIO PRINCIPAL: Devolver la respuesta
        res.json({
            totalVotes,
            statistics
        })
        
    } catch (error) {
        console.error('Error generando las estadísticas', error)
        return res.status(500).json({ message: 'Error generando las estadísticas' })
    }
}
