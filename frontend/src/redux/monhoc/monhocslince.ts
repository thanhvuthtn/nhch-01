import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Types } from 'mongoose';

export interface iMonHoc {
    _id: Types.ObjectId|null;
    maMonHoc: string;
    tenMonHoc:string;
  }

  export interface iMonHocsState{
    value:{
        monHocs:Array<iMonHoc>;
        monHoc:iMonHoc;
    };
  }
  

  const initialState: iMonHocsState ={
    value:{
        monHocs:[],
        monHoc:{
            _id:null,
            maMonHoc:'',
            tenMonHoc:'',
        }
    },
  }  

export const monHocSlice = createSlice({
    name: 'monHocs',
    initialState,
    reducers:{
        setMonHocs:(state, action:PayloadAction<Array<iMonHoc>>)=>{
            state.value.monHocs=action.payload;
        },
        AddNewMonHoc:(state,action:PayloadAction<iMonHoc>)=>{
            state.value.monHocs=[...state.value.monHocs, action.payload]
        },
        setMonHoc:(state, action:PayloadAction<string>)=>{
            const monHocs:Array<iMonHoc> = state.value.monHocs.filter((mh)=> mh._id?.toString() === action.payload )
            const arrLen = monHocs.length;
            if (arrLen>0){
                state.value.monHoc=monHocs[0];
            }else{
                state.value.monHoc={
                    _id:null,
                    maMonHoc:'',
                    tenMonHoc:''
                }
            }
        },
        DeleteMonHoc:(state,action:PayloadAction<iMonHoc>)=>{
            const monHocs:Array<iMonHoc>=state.value.monHocs.filter((mh)=> mh._id !==action.payload._id)
            state.value.monHocs=monHocs
        },
        UpdateMonHocs:(state, action:PayloadAction<iMonHoc>)=>{
            const monHoc=state.value.monHocs.find((mh)=>mh._id===action.payload._id)
            if (monHoc){
                monHoc.maMonHoc=action.payload.maMonHoc;
                monHoc.tenMonHoc=action.payload.tenMonHoc;
            }
        },
        UpdateTenMonHoc:(state, action:PayloadAction<string>)=>{
            state.value.monHoc.tenMonHoc=action.payload;
        },
        UpdateMaMonHoc:(state, action:PayloadAction<string>)=>{
            state.value.monHoc.maMonHoc=action.payload;
        }
    }
}
)

// Action creators are generated for each case reducer function
export const { setMonHocs, AddNewMonHoc, setMonHoc, DeleteMonHoc,UpdateMonHocs, UpdateTenMonHoc,UpdateMaMonHoc } = monHocSlice.actions

export default monHocSlice.reducer