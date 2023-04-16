
import { Layout } from '@/components/layouts';
import { capitalize ,Card, CardHeader, Grid, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '@/interfaces';
import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {

  const { updateEntry } = useContext( EntriesContext )

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touced, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touced, [inputValue, touced])

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputValue( event.target.value )
}

const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus( event.target.value as EntryStatus )
}

const onSave = () => {
  if ( inputValue.trim().length === 0 ) return

  const updatedEntry: Entry = {
    ...entry,
    status,
    description: inputValue
    
  }

  updateEntry( updatedEntry, true )
}

  return (
    <Layout title='Home - OpenJira'>
      <Grid 
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
        >
          <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
            <Card>
              <CardHeader
                title={`Entrada: ${ inputValue.substring(0, 20) }`}
                subheader={`Creado ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }`}
              />
              <CardContent>
                  <TextField 
                    sx={{ marginTop: 2, marginBottom: 1 }}
                    fullWidth
                    placeholder='Nueva Entrada'
                    autoFocus
                    multiline
                    label='Nueba Entrada'
                    value={ inputValue }
                    onBlur={ () => setTouched( true ) }
                    onChange={ onTextFieldChanges }
                    helperText={ isNotValid && 'Ingrese un valor' }
                    error={ isNotValid }
                  />

                  <FormControl>
                    <FormLabel>Estado:</FormLabel>
                    <RadioGroup
                      row
                      value={ status }
                      onChange={ onStatusChange }
                    >
                      {
                        validStatus.map( option => (
                          <FormControlLabel 
                            key={ option }
                            value={ option }
                            control={ <Radio/> }
                            label={ capitalize(option) }
                          />
                        ) )
                      }
                    </RadioGroup>
                  </FormControl>

              </CardContent>

              <CardActions>
                <Button
                startIcon={ <SaveOutlinedIcon/> }
                variant='contained'
                fullWidth
                onClick={ onSave }
                disabled={ inputValue.length <= 0 }
                >
                  Save
                </Button>
              </CardActions>

            </Card>
          </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
      >
          <DeleteOutlinedIcon/>
      </IconButton>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById( id )

  if ( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
     props: {
        entry
      } 
    }

}

export default EntryPage