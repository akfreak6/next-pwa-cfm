import Dexie, { Table } from "dexie";
// table inteface
export interface Student {
	id?: number;
	name: string;
	rollNumber: number;
	hobbies: string[];
  status: string[];
}
export class DB extends Dexie {
	// table name is student
	students!: Table<Student>;
	constructor() {
		super("myDatabase");
		this.version(1).stores({
			students: "++id, name, rollNumber, hobbies, status",
		});
	}
}
export const db = new DB(); // export the db
