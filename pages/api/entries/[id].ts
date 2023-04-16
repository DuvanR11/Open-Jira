import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

  const { id } = req.query

  if ( !mongoose.isValidObjectId( id ) ) {
    return res.status(400).json({ message: 'El  id no es valido ' + id })
  }

  switch ( req.method ) {
    case 'PUT':
        return putEntries( req, res )
    case 'GET':
        return getEntries( req, res )
        
    default:
        return  res.status(400).json({ message: 'Endpoin no existe' })
  }

}

const putEntries = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query

    await db.connect()

    const entryToUpdate = await Entry.findById( id )

    if ( !entryToUpdate ) {
        await db.disconnect()
        return  res.status(400).json({ message: 'No hay entrada con ese id ' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body

    try {
        const updateEntry = await Entry.findByIdAndUpdate( id, { description,  status }, { runValidators: true, new: true } )
        await db.disconnect()
        res.status(200).json( updateEntry! )

    } catch (error: any) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }

}

const getEntries = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query

    await db.connect()
    const entryGet = await Entry.findById( id )
    await db.disconnect()

    if ( !entryGet ) {
        return  res.status(400).json({ message: 'No hay entrada con ese id ' + id })
    }

    res.status(200).json( entryGet! )
   
}