import { useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

//import {  } from './ABI';
import { SimpliFactoryABI } from '../ContractABIs/FactoryABI';


const factory1 = "0xD6ff05a3Ef112A5dc5CCc7216414F61fe79e1095";


export function createToken(account, token, symbol, supply){
    console.log("INPUTS:", token, symbol, supply)
    console.log("Connected Account:", account)
    

}