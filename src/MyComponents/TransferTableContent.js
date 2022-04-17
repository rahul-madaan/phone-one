import React, {useLayoutEffect, useState} from 'react'
import axios from "axios";

export const TransferTableContent = (props) => {
    const [currentOwnerAadhaar, setCurrentOwnerAadhaar] = useState('')
    const [selectedDeviceIMEI, setSelectedDeviceIMEI] = useState('')
    const [skipCount, setSkipCount] = useState(true);

    const approveRequest = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setSelectedDeviceIMEI(e.target.value)
        console.log(e.target.getAttribute('data-value-buyer'))
        axios.post("http://localhost:8000/update-device-ownership", {
            "IMEI": e.target.value,
            "buyer_aadhaar": e.target.getAttribute('data-value-buyer')
        }).then((result)=>{
            console.log(result.data[0])
            setCurrentOwnerAadhaar('')
            setCurrentOwnerAadhaar(e.target.value)
        })
        //change phone ownership  ===> DONE
        //remove entry of device from transfer_request table

    }

    useLayoutEffect(()=>{
        if (skipCount || currentOwnerAadhaar === '') setSkipCount(false);
        else if (!skipCount) {
            axios.post("http://localhost:8000/detete-transfer-request?IMEI=" + selectedDeviceIMEI)
                .then((result) => {
                    console.log("Executed and deleted the transfer request")
                    props.setUpdateTransferRequestTable(Math.random())
            })
        }
    },[currentOwnerAadhaar])

    return (

        <>
            <tr>
                <th scope="row">{props.index +1}</th>
                <td>{props.transferRequestArray.IMEI}</td>
                <td>{props.transferRequestArray.device_name}</td>
                <td>{props.transferRequestArray.buyer_name+": "+props.transferRequestArray.transfer_to_aadhaar}</td>
                <td><button type="button" className="btn btn-outline-success " onClick={approveRequest} data-value-buyer={props.transferRequestArray.transfer_to_aadhaar} value={props.transferRequestArray.IMEI}>Approve Request</button></td>
            </tr>
        </>
    )
}