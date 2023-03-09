export const courseList = [
    {
        id: 1,
        name: 1,
        selected: false
    },
    {
        id: 2,
        name: 2,
        selected: false
    },
    {
        id: 3,
        name: 3,
        selected: false
    },
    {
        id: 4,
        name: 4,
        selected: false
    },
    {
        id: 5,
        name: 5,
        selected: false
    },    
];

export const categoryList = [
    {        
        id: 1,
        name: 'Lecture',
        selected: false       
    },
    {
        id: 2,
        name: 'Laboratories',
        selected: false
    },
    // {
    //     id: 3,
    //     name: 'Practice',
    //     selected: false
    // },  
];

export const dataList = [
    {
        "id": 1,
        "campusNumber": 1,
        "workspaceNumber": 1,
        "categoryId": 1,
        "description": "Seating: fixed rows. Desks: fixed rows. Layout: rows facing teaching wall. Floor: 1. Walls: painted. Ventilation: fully internal room. Blackout: no natural light. Equipment: Whiteboard, Visualiser, Blu-ray playback, Laptop Connectivity - HDMI, VGA and mini jack audio, Wireless Coverage, PC, Slide Advancer/Laser Pointer, Equipment: Control - Extron touch screen, Desk Microphone, Induction Loop, Wireless Microphones x3, Hybrid - Capture & Stream",
        "numberOfSeats": 120,
        "courseNumber": 1,
        "specialEquipment": false,
        "isAvailable": true
    },
    {
        "id": 2,
        "campusNumber": 11,
        "workspaceNumber": 2,
        "categoryId": 1,
        "description": "Seating: fixed rows. Desks: fixed rows. Floor: 2. Walls: painted. Ventilation: windows. Blackout: by means of pull-down black blinds. Equipment: Whiteboard, Visualiser, Blu-ray playback, Laptop Connectivity - HDMI, VGA and mini jack audio, Wireless Coverage, PC, Slide Advancer/Laser Pointer, Data Projector, Equipment Control - Extron touch screen, Wireless Microphones, Induction Loop, Whiteboard - Double Column, Hybrid - Capture & Stream",
        "numberOfSeats": 160,
        "courseNumber": 3,
        "specialEquipment": true,
        "isAvailable": false
    },
    {
        "id": 3,
        "campusNumber": 2,
        "workspaceNumber": 3,
        "categoryId": 3,
        "description": "Equipment: Whiteboard, Visualiser, Blu-ray playback, Laptop Connectivity - HDMI, VGA and mini jack audio, Wireless Coverage, PC, Slide Advancer/Laser Pointer, Data Projector, Equipment Control - Extron touch screen, Desk Microphone, Induction Loop, Hybrid - Capture & Stream",
        "numberOfSeats": 160,
        "courseNumber": 1,
        "specialEquipment": false,
        "isAvailable": false
    },
]
export const bookingsList = [
    {
        "id": 1,
        "userId": 1,
        "workspaceId": 2,
        "isWorkspaceAvailable": true,
        "dayOfWeek": 1,//numberOfWeek
        "startBookingTime": "2023-02-20T12:00:04.256Z",
        "groupNumber": 10702319
    },
    {
        "id": 2,
        "userId": 1,
        "workspaceId": 2,
        "isWorkspaceAvailable": true,
        "dayOfWeek": 2,//numberOfWeek
        "startBookingTime": "2023-02-21T12:00:04.256Z",
        "groupNumber": 10702419
    },
]