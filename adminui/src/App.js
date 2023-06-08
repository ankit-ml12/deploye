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
import SingleUser from './SingleUser'

const url =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

function App() {
  const [users, setAllUsers] = useState([])
  const [userList, setUserList] = useState([])
  const [numberOfPage, setNumberOfPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [seachquery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchtheUserDetail()
  }, [])
  const fetchtheUserDetail = async () => {
    setLoading(true)
    const users = await axios.get(url)
    setAllUsers(users.data)
    setUserList(users.data)
    setLoading(false)
  }

  const changePage = (value) => {
    console.log(value)
    setCurrentPage(value - 1)
  }

  const filterUser = async (searchTerm) => {
    const result = users.filter((user) => {
      for (let value of Object.values(user)) {
        if (value.includes(searchTerm)) {
          return true
        }
      }
      return false
    })
    console.log(searchTerm)
    setNumberOfPage(Math.ceil(result.length / 10))
    console.log(result)

    await setUserList(result)
  }

  const handleSave = ({ id, name, email, role }) => {
    const result = users.map((user) => {
      if (user.id != id) return user
      else return { id, name, email, role }
    })
    setUserList(result)
    setAllUsers(result)
  }
  const remove = (id) => {
    const result = users.filter((user) => {
      if (user.id != id) return true
      else return false
    })
    setUserList(result)
    setNumberOfPage(Math.ceil(result.length / 10))
    setAllUsers(result)
  }

  // useEffect(() => {
  //   setLoading(true)
  //   filterUser(seachquery)
  //   setLoading(false)
  // }, [seachquery])
  const handle = async (e) => {
    setLoading(true)
    setSearchQuery(e.target.value)
    filterUser(e.target.value)
    const timeoutid = setTimeout(() => {
      setLoading(false)
    }, 500)

    // await clearTimeout(timeoutid)
  }
  const removeAll = () => {
    setAllUsers([])
    setUserList([])
  }

  // if (loading) {
  //   return <Typography variant="h2">Loading...</Typography>
  // }
  return (
    <Container maxWidth="lg" component={Box} p={15}>
      <Box p={2} border={2}>
        <TextField
          fullWidth
          value={seachquery}
          onChange={(e) => handle(e)}
        ></TextField>
      </Box>
      <Box border={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  Role
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <h3>Loading</h3>
            ) : (
              <TableBody>
                {console.log(1, rowsPerPage, currentPage)};
                {console.log(2, userList)}
                {console.log(
                  3,
                  userList.slice(
                    rowsPerPage * currentPage,
                    rowsPerPage * (currentPage + 1)
                  )
                )}
                {userList
                  .slice(
                    rowsPerPage * currentPage,
                    rowsPerPage * (currentPage + 1)
                  )
                  .map((user, index) => {
                    return (
                      <SingleUser
                        key={index}
                        user={user}
                        handleSave={handleSave}
                        remove={remove}
                      />
                    )
                  })}
              </TableBody>
            )}
          </Table>
          <Box border={2} p={2} display={'flex'} justifyContent={'center'}>
            {userList.length === 0 ? (
              <h1>No result found</h1>
            ) : (
              <Box display={'flex'} gap={44}>
                <Pagination
                  count={numberOfPage}
                  onChange={(e, value) => changePage(value)}
                  showFirstButton
                  showLastButton
                  size="large"
                />
                <Button color="error" variant="contained" onClick={removeAll}>
                  delet all
                </Button>
              </Box>
            )}
          </Box>
        </TableContainer>
      </Box>
    </Container>
  )
}

export default App
