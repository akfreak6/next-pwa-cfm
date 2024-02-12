import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
const StudentMngmt: FC = () => {
  const [students, setStudents] = React.useState({ name: '', rollNumber: '', hobbies: '', id: null });
  // dexie hook to get live data 
  const studentList = useLiveQuery(() => db.students.toArray());

  // add student 
  const addStudent = React.useCallback(async () => {
    if (students?.name && students?.rollNumber && students?.hobbies) {
      await db.students.add({
        name: students?.name,
        rollNumber: Number(students?.rollNumber),
        hobbies: students?.hobbies
      });
      setStudents({ name: '', rollNumber: '', hobbies: '', id: null });
    }
  }, [students])

  // update student 
  const updateStudent = React.useCallback(async () => {
    if (students?.id && students?.name && students?.rollNumber && students?.hobbies) {
      await db.students.put({
        id: students?.id,
        name: students?.name,
        rollNumber: Number(students?.rollNumber),
        hobbies: students?.hobbies
      });
      setStudents({ name: '', rollNumber: '', hobbies: '', id: null });
    }
  }, [students])

  // delete student 
  const deleteStudent = React.useCallback(async (id: any) => {
    await db.students.delete(id);
  }, [])

  // add hobbies
  // const addMoreHobbies = React.useCallback(async() =>{

  // }, [students]);

  // Student list Component
  const StudentList = () => {
    return (
      <div className="">
        <table >
          <tbody>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ROLL NUMBER </th>
              <th>HOBBIES</th>
              <th>DELETE   </th>
              <th>UPDATE  </th>
            </tr>
          </tbody>
          {
            studentList?.map((i: any, index: number) => {
              return (
                <tr key={index}>
                  <td style={{ paddingTop: '10px' }} ><span style={{ paddingLeft: '10px', paddingRight: '10px' }}>{i.id}</span></td>
                  <td style={{ paddingTop: '10px' }} ><span style={{ paddingLeft: '10px', paddingRight: '10px' }}>{i.name}</span></td>
                  <td style={{ paddingTop: '10px' }} > <span style={{ paddingLeft: '10px', paddingRight: '10px' }}>{i.rollNumber}</span></td>
                  <td style={{ paddingTop: '10px' }} > <span style={{ paddingLeft: '10px', paddingRight: '10px' }}>{i.hobbies}</span></td>
                  <td style={{ paddingTop: '10px' }} > <button onClick={addStudent} style={{ paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px' }} onClickCapture={() => deleteStudent(i.id)}>DELETE</button></td>
                  <td style={{ paddingTop: '10px' }} ><button onClick={() => setStudents({ ...i })} style={{ paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px' }}>UPDATE</button></td>
                </tr>
              )
            })
          }
        </table>
      </div>)
  }

  // Add and Update Form Component 
  return (
    <div>
      <div style={{ paddingLeft: '30px' }} >
        <h2 style={{ marginBottom: '20px', marginTop: '20px' }}>{students?.id ? 'Update' : 'Add'} Student </h2>
        <div >
          <label htmlFor="Name" style={{ paddingRight: '10px' }}>Name</label>
          <input type="text" value={students?.name} onChange={(e) => setStudents({ ...students, name: e.target.value })} placeholder="Name" name="Name" style={{ marginRight: '30px' }} />
          <label htmlFor="roll" style={{ paddingRight: '10px' }}>Roll Number </label>
          <input type="number" value={students?.rollNumber} onChange={(e) => setStudents({ ...students, rollNumber: e.target.value })} placeholder="Roll Number" name="rollNumber" />
          <label htmlFor="Hobbies" style={{ paddingRight: '10px' }}>Hobbies </label>
          <input type="text" value={(students?.hobbies)} onChange={(e) => setStudents({ ...students, hobbies: e.target.value })} placeholder="Hobbies" name="Hobbies" />
          {/* <button onClick={} style={{ paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px' }}>+</button> */}
          {
            students?.id ? (
              <button onClick={updateStudent} style={{ paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px' }}>SUBMIT</button>
            ) : (
              <button onClick={addStudent} style={{ paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px' }}>ADD</button>
            )
          }
        </div>
        <h2 style={{ marginBottom: '20px', marginTop: '20px' }}>Student List</h2>
        <div><StudentList /></div>
      </div>
    </div>
  );
}
export default StudentMngmt
