import axios from "axios";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {HomeTableContent} from "./HomeTableContent";



export const HomePage = (props) => {
    const [updateLinkedDevices,setUpdateLinkedDevices] = useState(Math.random)
    const [skipCount, setSkipCount] = useState(true);
    const [skipCount2, setSkipCount2] = useState(true);


    useLayoutEffect(() => {
        axios.post("http://localhost:8000/get-linked-devices", {
            'user_aadhaar_number': props.userAadhaarNumber
        }).then((result) => {
            console.log(result)
            if (result.data) {
                props.setUserLinkedDevices([])
                props.setUserLinkedDevices(result.data)
            }
        })
    }, [updateLinkedDevices]);

    useLayoutEffect(() => {

        if (skipCount2 || props.setUserLinkedDevices === []) setSkipCount2(false);
        else if (!skipCount2) {
            axios.post("http://localhost:8000/get-user-name", {
                'user_aadhaar_number': props.userAadhaarNumber
            }).then((result) => {
                console.log(result)
                if (result.data) {
                    props.setUserName(result.data[0].name)
                }
            })
        }


    }, [props.userLinkedDevices]);




    return (
        <>
            <div className="container rounded bg-white ">
                <div className="row">
                    <div className="col-md-3">
                        <p>container 1 start</p>
                        <div className="d-flex flex-column  "><img
                            className="rounded-circle mt-5" width="250px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                            <p className="font-weight-bold">Aadhaar: {props.userAadhaarNumber}</p>
                            <p className="font-weight-bold">Name: {props.userName}</p>
                            <p className="font-weight-bold">Number of Devices: {props.userLinkedDevices.length}</p>
                        </div>
                    </div>
                    <div className="col align-items-centre">
                        <p>container 2 start</p>
                        <h3>Linked Devices</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Device IMEI</th>
                                <th scope="col">Manufacturer</th>
                                <th scope="col">Model Name</th>
                                <th scope="col">Recycle Device</th>
                                <th scope="col">Report Theft</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.userLinkedDevices.map((linkedDevice,index) => {
                                return <HomeTableContent setUpdateLinkedDevices={setUpdateLinkedDevices} linkedDevice={linkedDevice} index={index} setSelectedDeviceDetails={props.setSelectedDeviceDetails}  />
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
