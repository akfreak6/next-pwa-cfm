import Image from "next/image";
import { Inter } from "next/font/google";
import StudentMngmt from "@/components/StudentMngmt";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return <StudentMngmt />;
}
