import React, { FC } from "react";
import { db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import MultiSelectDropdown from "./MultiSelectDropdown";
const StudentMngmt: FC = () => {
	const [students, setStudents] = React.useState({
		name: "",
		rollNumber: "",
		hobbies: [""],
		status: [""],
		id: null,
	});
	// dexie hook to get live data
	const studentList = useLiveQuery(() => db.students.toArray());

	const addStudent = React.useCallback(async () => {
		if (
			students?.name &&
			students?.rollNumber &&
			students?.hobbies.some((hobby) => hobby !== "") &&
			students?.status.length == 1 &&
			students?.status.some((skill) => skill !== "")
		) {
			try {
				await db.students.add({
					name: students?.name,
					rollNumber: Number(students?.rollNumber),
					hobbies: students.hobbies,
					status: students.status,
				});
				setStudents({
					name: "",
					rollNumber: "",
					hobbies: [""],
					status: [],
					id: null,
				});
			} catch (error) {
				console.error("Error adding student:", error);
			}
		}
	}, [students]);
	// update student
	const updateStudent = React.useCallback(async () => {
		if (
			students?.id &&
			students?.name &&
			students?.rollNumber &&
			students?.hobbies.some((hobby) => hobby !== "") &&
			students?.status.length > 0 &&
			students?.status.some((skill) => skill !== "")
		) {
			await db.students.put({
				id: students?.id,
				name: students?.name,
				rollNumber: Number(students?.rollNumber),
				hobbies: students?.hobbies,
				status: students?.status,
			});
			setStudents({
				name: "",
				rollNumber: "",
				hobbies: [""],
				status: [],
				id: null,
			});
		}
	}, [students]);

	// delete student
	const deleteStudent = React.useCallback(async (id: any) => {
		await db.students.delete(id);
	}, []);

	const StudentList = () => {
		return (
			<div className="">
				<table>
					<tbody>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>ROLL NUMBER </th>
							<th>HOBBIES</th>
							<th>STATUS</th>
							<th>DELETE </th>
							<th>UPDATE </th>
						</tr>
					</tbody>
					{studentList?.map((i: any, index: number) => {
						return (
							<tr key={index}>
								<td style={{ paddingTop: "10px" }}>
									<span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
										{i.id}
									</span>
								</td>
								<td style={{ paddingTop: "10px" }}>
									<span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
										{i.name}
									</span>
								</td>
								<td style={{ paddingTop: "10px" }}>
									{" "}
									<span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
										{i.rollNumber}
									</span>
								</td>
								<td style={{ paddingTop: "10px" }}>
									{" "}
									<span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
										{i.hobbies}
									</span>
								</td>
								<td style={{ paddingTop: "10px" }}>
									{" "}
									<span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
										{i.status}
									</span>
								</td>
								<td style={{ paddingTop: "10px" }}>
									{" "}
									<button
										onClick={addStudent}
										style={{
											paddingLeft: "10px",
											paddingRight: "10px",
											marginLeft: "10px",
										}}
										onClickCapture={() => deleteStudent(i.id)}
									>
										DELETE
									</button>
								</td>
								<td style={{ paddingTop: "10px" }}>
									<button
										onClick={() => setStudents({ ...i })}
										style={{
											paddingLeft: "10px",
											paddingRight: "10px",
											marginLeft: "10px",
										}}
									>
										UPDATE
									</button>
								</td>
							</tr>
						);
					})}
				</table>
			</div>
		);
	};

	// Add and Update Form Component
	return (
		<div>
			<div style={{ paddingLeft: "30px" }}>
				<h2 style={{ marginBottom: "20px", marginTop: "20px" }}>
					{students?.id ? "Update" : "Add"} Student{" "}
				</h2>
				<div>
					<div id="nameFields" style={{ display: "block" }}>
						<label
							htmlFor="Name"
							style={{ display: "block", paddingRight: "10px" }}
						>
							Name
						</label>
						<input
							type="text"
							value={students?.name}
							onChange={(e) =>
								setStudents({ ...students, name: e.target.value })
							}
							placeholder="Name"
							name="Name"
							style={{ marginRight: "30px" }}
						/>
					</div>
					<div id="rollFields" style={{ display: "block" }}>
						<label
							htmlFor="roll"
							style={{ display: "block", paddingRight: "10px" }}
						>
							Roll Number{" "}
						</label>
						<input
							type="number"
							value={students?.rollNumber}
							onChange={(e) =>
								setStudents({ ...students, rollNumber: e.target.value })
							}
							placeholder="Roll Number"
							name="rollNumber"
						/>
					</div>
					<div id="hobbyFields" style={{ display: "block" }}>
						<label htmlFor="Hobbies" style={{ paddingRight: "10px" }}>
							Hobbies
						</label>
						{students.hobbies.map((hobby, index) => (
							<div key={index}>
								<input
									type="text"
									value={hobby}
									onChange={(e) =>
										setStudents({
											...students,
											hobbies: [
												...students.hobbies.slice(0, index),
												e.target.value,
												...students.hobbies.slice(index + 1),
											],
										})
									}
									placeholder={`Hobby ${index + 1}`}
								/>
								{index !== 0 && (
									<button
										onClick={() =>
											setStudents({
												...students,
												hobbies: students.hobbies.filter((_, i) => i !== index),
											})
										}
									>
										- Remove
									</button>
								)}
							</div>
						))}
						<button
							onClick={() =>
								setStudents({ ...students, hobbies: [...students.hobbies, ""] })
							}
						>
							+ Add another hobby
						</button>
					</div>
					<div id="status" style={{ display: "blcok" }}>
						<label htmlFor="Status">Status</label>
						<MultiSelectDropdown
							label=""
							options={["Open", "inIssue", "Resolved"]}
							selectedValues={students.status}
							onValuesChange={(value) =>
								setStudents({ ...students, status: value })
							}
						/>
					</div>
					{students?.id ? (
						<button
							onClick={updateStudent}
							style={{
								paddingLeft: "10px",
								paddingRight: "10px",
								marginLeft: "10px",
							}}
						>
							SUBMIT
						</button>
					) : (
						<button
							onClick={addStudent}
							style={{
								paddingLeft: "10px",
								paddingRight: "10px",
								marginLeft: "10px",
							}}
						>
							ADD
						</button>
					)}
				</div>
				<h2 style={{ marginBottom: "20px", marginTop: "20px" }}>
					Student List
				</h2>
				<div>
					<StudentList />
				</div>
			</div>
		</div>
	);
};
export default StudentMngmt;
