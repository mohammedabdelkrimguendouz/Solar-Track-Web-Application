import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addLeader as addLeaderApi,
  deleteLeader as deleteLeaderApi,
  getLeaders,
  toggleLeaderStatus as toggleLeaderStatusApi,
} from '../../services/leaderApi'

export const fetchLeaders = createAsyncThunk(
  'leadersApi/fetchLeaders',
  async () => {
    const data = await getLeaders()
    if (data) return data
    return []
  }
)

export const addLeader = createAsyncThunk(
  'leadersApi/addLeader',
  async (leader) => {
    const data = await addLeaderApi(leader)
    if (data) return data
    return null
  }
)

export const deleteLeader = createAsyncThunk(
  'leadersApi/deleteLeader',
  async (leaderId) => {
    const isDeleted = await deleteLeaderApi(leaderId)

    if (isDeleted) return leaderId
    return null
  }
)

export const toggleLeaderStatus = createAsyncThunk(
  'leadersApi/toggleLeaderStatus',
  async (leaderId) => {
    const data = await toggleLeaderStatusApi(leaderId)
    if (data) return { id: leaderId, is_active: data.is_active }
    return null
  }
)
const initialState = {
  leaders: [],
  isAddingLeader: false,
  isDeletingLeader: false,
  isLoading: false,
  error: null,
}

export const leadersApiSlice = createSlice({
  name: 'leadersApi',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeaders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchLeaders.fulfilled, (state, action) => {
        state.isLoading = false
        state.leaders = action.payload
      })
      .addCase(fetchLeaders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(addLeader.pending, (state) => {
        state.isAddingLeader = true
        state.error = null
      })
      .addCase(addLeader.fulfilled, (state, action) => {
        state.isAddingLeader = false
        if (action.payload) {
          state.leaders.push(action.payload)
        }
      })
      .addCase(addLeader.rejected, (state, action) => {
        state.isAddingLeader = false
        state.error = action.error.message
      })
      .addCase(deleteLeader.pending, (state) => {
        state.isDeletingLeader = true
        state.error = null
      })
      .addCase(deleteLeader.fulfilled, (state, action) => {
        state.isDeletingLeader = false
        if (action.payload) {
          state.leaders = state.leaders.filter(
            (leader) => leader.id !== action.payload
          )
        }
      })
      .addCase(deleteLeader.rejected, (state, action) => {
        state.isDeletingLeader = false
        state.error = action.error.message
      })

      .addCase(toggleLeaderStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.leaders = state.leaders.map((leader) =>
            leader.id === action.payload.id
              ? { ...leader, is_active: action.payload.is_active }
              : leader
          )
        }
      })
  },
})

export default leadersApiSlice.reducer
