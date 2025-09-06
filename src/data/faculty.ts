export interface Faculty {
  id: number
  name: string
  designation: string
  specialization: string[]
  email: string
  phone: string
  experience: number // in years
  education: string
  publications: number
}

export const featuredFaculty: Faculty[] = [
  {
    id: 1,
    name: "Dr. Yash Paul",
    designation: "Coordinator & Head of Department",
    specialization: ["AI, Data Science, ML, and Biomedical Signal Processing"],
    email: "yash_99yash@yahoo.co.in",
    phone: "+91-9622603978",
    experience: "15+ Years",
    education: "Ph.D. Computer Science, Eötvös Loránd University, Hungary",
    publications: "--",
    photo: null
  },
  // {
  //   id: 2,
  //   name: "Prof. Rana Hashmy",
  //   designation: "Professor of Practise",
  //   specialization: ["DM & DW, BD, CC, OT, SNA, ONA, ML"],
  //   email: "ranahashmy@cukashmir.ac.in",
  //   phone: "--",
  //   experience: "37+ years",
  //   education: "Ph.D. in Computer Science, JNU, New Delhi",
  //   publications: "--",
  //   photo: null
  // },
  {
    id: 2,
    name: "Dr. Zahoor Ahmad",
    designation: "Sr. Assistant Professor",
    specialization: ["Network Security, IoT, Image Processing"],
    phone: "+91-9419505159",
    experience: "14+ Years",
    education: "Ph.D. Computer Science Engineering, NIT Srinagar",
    publications: "--",
    photo: null
  },
  {
    id: 3,
    name: "Afaq Alam Khan",
    designation: "Sr. Assistant Professor",
    specialization: ["Web Technology"],
    email: "afaqalamkhan@cukashmir.ac.in",
    phone: "+91-9469054115",
    experience: "17+ Years",
    education: "--",
    publications: "--",
    photo: null
  },
  {
    id: 4,
    name: "Dr. Shahid Sultan",
    designation: "Assistant Professor",
    specialization: ["Internet of Things, Fog Computing, Resource Optimization"],
    email: "shahid.sultan@cukashmir.ac.in",
    phone: "+91-7006687396",
    experience: "--",
    education: "Ph.D. Computer Science Engineering, NIT Srinagar",
    publications: "--",
    photo: null
  },
  // {
  //   id: 5,
  //   name: "Ms. Sanya Malik",
  //   designation: "Assistant Professor",
  //   specialization: ["UI/UX Design", "Human-Computer Interaction", "Web Technologies"],
  //   email: "sanya.malik@cukashmir.ac.in",
  //   phone: "+91-9876543215",
  //   experience: "5+ Years",
  //   education: "M.Tech Computer Science, CUK",
  //   publications: "15+ Research Papers",
  //   photo: null
  // }
]