import {
  Button,
  Typography,
  Container,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  Pagination,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SingleUser = ({ user, handleSave, remove }) => {
  const { id, name, email, role } = user
  const [edit, setEdit] = useState(false)
  const [userObj, setUserObj] = useState(user)
  const handleChange = (e) => {
    const { name, value } = e.target
    // user.name = e.target.value
    console.log(name, value)
    setUserObj({ ...userObj, [name]: value })
  }
  const handlesa = () => {
    setEdit(!edit)
    handleSave(userObj)
  }
  return (
    <TableRow s>
      <TableCell width={'30%'}>
        {edit == false ? (
          user.name
        ) : (
          <TextField
            name="name"
            onChange={handleChange}
            size="small"
            value={userObj.name}
          ></TextField>
        )}
      </TableCell>
      <TableCell>
        {edit == false ? (
          user.email
        ) : (
          <TextField
            name="email"
            onChange={handleChange}
            size="small"
            value={userObj.email}
          ></TextField>
        )}
      </TableCell>
      <TableCell>
        {edit == false ? (
          user.role
        ) : (
          <TextField
            name="role"
            onChange={handleChange}
            size="small"
            value={userObj.role}
          ></TextField>
        )}
      </TableCell>

      <TableCell>
        <Button variant="contained" onClick={() => handlesa()}>
          {edit ? 'save' : 'edit'}
        </Button>
        <Button
          disabled={edit}
          variant="contained"
          color="error"
          sx={{ marginLeft: '10px' }}
          onClick={() => remove(id)}
        >
          delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default SingleUser
