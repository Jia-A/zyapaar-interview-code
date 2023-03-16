import { useState, useRef  } from "react";
import {v4 as uuid} from "uuid"
import { employeeList } from "../appData";
import "../styles/emp-styles.css"
const Employee = () =>{

    console.log(employeeList)

    const [empList, setEmpList] = useState(employeeList)
    const [updateID, setUpdateID] = useState(-1)

    const nameRef= useRef()
    const positionRef = useRef()


    const newEmpHandler = (event) =>{
        event.preventDefault();
        let employeeName = event.target.elements.name.value
        let position = event.target.elements.position.value
        let newList = {
            id : uuid(),
            employeeName,
            position
        }
        setEmpList((prevList)=>{
            return prevList.concat(newList)
    })   
        nameRef.current.value =""
        positionRef.current.value = ""
    }

    const updateListHandler = (event) =>{
        event.preventDefault()
        let employeeName = event.target.elements.employeeName.value
        let position = event.target.elements.position.value
        let newList = empList.map(item=> item.id === updateID ? {...item, employeeName, position} : item)
        setEmpList(newList)
        setUpdateID(-1)
    }
    const deleteHandler = (id) =>{
        let newList = empList.filter((item) => (
            item.id !== id
         ))

        setEmpList(newList)
    }

    const editHandler =(id) =>{
        setUpdateID(id)
    }
    return (
        <div className="main-body"> 
            <form className= "form-main" onSubmit={newEmpHandler}>
                <label htmlFor="name">Name 
                    <input type="text" name="name" placeholder="Enter Name" ref={nameRef} />
                </label>
                <label htmlFor="name">Position 
                    <input type="text" name="position" placeholder="Enter Position" ref={positionRef}/>
                </label>
                <button className="newEmpBtn">Add New Employee</button>
            </form>
            <form className="list-form" onSubmit={updateListHandler}>
            <table className="emp-table">
                {empList.map((item)=>(
                    updateID === item.id ? <Edit item={item} empList={empList} setEmpList={setEmpList}/> : (
                    <tr className="eachRow">
                        <td>{item.employeeName}</td>
                        <td>{item.position}</td>
                        <td>
                            <button className="editBtn" onClick={()=>editHandler(item.id)}>Edit</button>
                            <button className="delBtn" onClick={()=>deleteHandler(item.id)}>Delete</button>
                        </td>
                    </tr>
                    )
                    ))} 
            </table>
            </form>
        </div>
    )
}

const Edit = ({item, empList, setEmpList}) =>{
    const handleName = (event) =>{
        const name = event.target.value
        const newList = empList.map((current) =>
            current.id === item.id ? {...current, employeeName : name} : current
            )
            setEmpList(newList)
        }

    

    const handlePos = (event) =>{
        const position = event.target.value
        const newList = empList.map((current) =>
        current.id === item.id ? {...current, position : position} : current
        )
        setEmpList(newList)
    }
    return(
        <tr>
            <td><input type="text" name="employeeName" value={item.employeeName} onChange={event => handleName(event)}/></td>
            <td><input type="text" name="position" value={item.position}  onChange={event => handlePos(event)}/></td>
            <td>
                <button className="updateBtn" type="submit">Update</button>
            </td>
        </tr>

    )
}
export {Employee};