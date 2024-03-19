import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../axios'

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/login',
        {name, email, password },
        config
      )

      localStorage.setItem('token', data.token)
      return data

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)