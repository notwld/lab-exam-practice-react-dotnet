import React, { Component } from 'react'
import url from './Variables'

export default class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            RId: 0,
            SName: "",
            NIC: "",
            PNumber: ""
        }
    }

    getStudents() {
        fetch(url.baseUrl + "Register")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    students: data
                })
            })
    }

    componentDidMount() {
        this.getStudents();
    }

    createStudent() {
        fetch(url.baseUrl + "Register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                SName: this.state.SName,
                NIC: this.state.NIC,
                PNumber: this.state.PNumber,
            })
        })
            .then(res => {
                alert("Student Registered!")
                this.getStudents()
            })
            .catch(err => {
                alert(err)
            })
    }
    updateStudent() {
        fetch(url.baseUrl + "Register", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                RId: this.state.RId,
                SName: this.state.SName,
                NIC: this.state.NIC,
                PNumber: this.state.PNumber,
            })
        })
            .then(res => {
                alert("Student Updated!")
                this.getStudents()
            })
            .catch(err => {
                alert(err)
            })
    }

    delStudent(id) {
        fetch(url.baseUrl + "Register", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                RId: id
            })
        })
            .then(res => {
                alert("Student Deleted!")
                this.getStudents()
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        const { students, RId, SName, NIC, PNumber } = this.state
        return (
            <div className='container my-5'>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="display-3">
                        Students
                    </h1>
                    <button className="btn btn-primary" data-bs-toggle="modal" onClick={() => { this.setState({ RId: 0, SName: "", NIC: "", PNumber: "" }) }} data-bs-target="#exampleModal">
                        Register Student
                    </button>
                </div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>RId</th>
                            <th>SName</th>
                            <th>NIC</th>
                            <th>PNumber</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(s => {
                                return (
                                    <tr>
                                        <td>{s.RId}</td>
                                        <td>{s.SName}</td>
                                        <td>{s.NIC}</td>
                                        <td>{s.PNumber}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary"
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                onClick={() => { this.setState({ RId: s.RId, SName: s.SName, NIC: s.NIC, PNumber: s.PNumber }) }}>Edit</button> | <button className="btn btn-sm btn-danger"
                                                    onClick={()=>this.delStudent(s.RId)}
                                                >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Register Student</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Student Name</label>
                                        <input type="text" class="form-control" value={SName} onChange={(e) => this.setState({ SName: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Student NIC</label>
                                        <input type="text" class="form-control" value={NIC} onChange={(e) => this.setState({ NIC: e.target.value })} id="exampleInputPassword1" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Phone Number</label>
                                        <input type="text" class="form-control" value={PNumber} onChange={(e) => this.setState({ PNumber: e.target.value })} id="exampleInputPassword1" />
                                    </div>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {
                                    RId === 0 ? <button type="button" class="btn btn-primary" onClick={() => this.createStudent()} data-bs-dismiss="modal" >Save changes</button>
                                        : <button type="button" class="btn btn-primary" onClick={() => this.updateStudent()} data-bs-dismiss="modal" >Update Student</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
