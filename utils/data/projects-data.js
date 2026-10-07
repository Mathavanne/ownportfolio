import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'Freelancer Site (In Progress)',
        description:` "This project is a comprehensive freelancer marketplace designed to connect
          service providers across various industries with customers seeking their expertise.
          The platform supports a wide range of professionals, including drivers, doctors, 
          plumbers, electricians, IT freelancers, and more, enabling users to find and hire 
          experts for their specific needs"`,
        tools: ["C#","Asp.Net", "MS-SQL Server","Blazor","Docker"],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        image: travel,
    },
    
   
    {
        id: 2,
        name: 'Shopping Cart',
        description: 'Developed a full-featured e-commerce web application featuring a fully dynamic shopping cart and streamlined payment gateway integration. Built a robust backend using Node.js and Java, paired with a high-performance frontend using React, Next.js, Tailwind CSS, and SCSS for responsive styling. Integrated MongoDB for efficient database management, product cataloging, and secure order processing across web platforms.',
        tools: ['React', 'Next.js', 'Tailwind CSS', 'SCSS', 'Node.js', 'Java', 'MongoDB', 'Docker'],
        code: '',
        role: 'Full Stack Developer',
        demo: '',
        image: ayla,
    },

{
    id: 3,
    name: 'Company Website',
    description: 'Designed and developed a responsive corporate web application for an import-export business (Wavlix) to showcase interactive product catalogs featuring high-quality images of available goods like spices, produce, and pulses. Integrated Telegram API for instant enquiry messaging and lead routing directly from client inquiries. Utilized React and Next.js for SSR performance, MongoDB for dynamic product data handling, Tailwind CSS and SCSS for custom UI styling, and containerized the entire app using Docker.',
    tools: ['React', 'Next.js', 'MongoDB', 'Telegram API', 'Tailwind CSS', 'SCSS', 'Docker'],
    code: '',
    role: 'Full Stack Developer',
    demo: 'https://www.wavlix.com',
    image: crefin,
}
    ,
    // {
    //     id: 4,
    //     name: 'Newsroom Management',
    //     description: "My team and I developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries. We used React Redux to manage the application's state and React-hook-form and Sun Editor to handle forms.",
    //     tools: ['NextJS', 'Material UI', 'Redux', 'Sun Editor', "Calendar"],
    //     code: '',
    //     demo: '',
    //     image: ayla,
    //     role: 'Full Stack Developer',
    // }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },
