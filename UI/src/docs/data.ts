export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly usedBuildings: string[];
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: 'ATF', label: 'Automotive and Tractor Faculty', usedBuildings: ['1','8','11','16','17','20']},
    { value: 'FMEE', label: 'The Faculty of Mining and Engineering Ecology', usedBuildings: ['1','7','9','18']},
    { value: 'MSF', label: 'Faculty of Mechanical Engineering', usedBuildings: ['1','6','17']},
    { value: 'MTF', label: 'The Faculty of Mechanics and Technology', usedBuildings: ['1','7','8']},
    { value: 'FMME', label: 'The Faculty of Marketing, Management, Entrepreneurship', usedBuildings: ['18']},
    { value: 'FE', label: 'The Faculty of Energy', usedBuildings: ['1','2','8','11','18']},
    { value: 'FITR', label: 'Faculty of Information Technology and Robotics', usedBuildings: ['1','6','11']},
    { value: 'FMTH', label: 'Faculty of Management Technologies and Humanization', usedBuildings: ['1','9']},
    { value: 'FEE', label: 'Faculty of Engineering and Education', usedBuildings: ['1','17','20']},
    { value: 'FEC', label: 'Faculty of Energy Construction', usedBuildings: ['1','2','6','8','11']},
    { value: 'AF', label: 'Architecture faculty', usedBuildings: ['1','5','6','7','8','12','17']},
    { value: 'FCE', label: 'Faculty of Civil Engineering', usedBuildings: ['1','11','16','17','20']},
    { value: 'FI', label: 'Faculty of Instrumentation', usedBuildings: ['1','17']},
    { value: 'FTC', label: 'Faculty of Transport Communications', usedBuildings: ['1','8','11','16','17','20']},
    { value: 'MTF', label: 'Military Technical Faculty', usedBuildings: ['1','4','6','7','8','11','17','18']},
    { value: 'STF', label: 'Sports and technical faculty', usedBuildings: ['1','8','17',]},            
  ];

export interface BuildingOption{
  readonly id: number;
  readonly value: string;
  readonly checked: boolean;
}

  export const buildingOptions: readonly BuildingOption[] = [
    {id: 1, value: '1', checked: false},
    {id: 2, value: '2', checked: false},
    {id: 3, value: '3', checked: false},
    {id: 4, value: '4', checked: false},
    {id: 5, value: '6', checked: false},
    {id: 6, value: '7', checked: false},
    {id: 7, value: '8', checked: false},
    {id: 8, value: '9', checked: false},
    {id: 9, value: '11', checked: false},
    {id: 10, value: '12', checked: false},
    {id: 11, value: '15', checked: false},
    {id: 12, value: '16', checked: false},
    {id: 13, value: '17', checked: false},
    {id: 14, value: '18', checked: false},
    {id: 15, value: '20', checked: false},    
  ];

  export interface IMapMarkers{
    readonly id: number;
    readonly geo: number[]
    readonly text: string;
  }
  
  export const mapMarkers: readonly IMapMarkers[] = [
    {
        id: 1,
        geo: [53.92109521712205, 27.59302856072052],
        text: '1'
    },
    {
      id: 2,
      geo: [53.92235461607026, 27.591866567238426],
      text: '2'
    },
    {
      id: 3,
      geo: [53.921488, 27.591520],
      text: '3'
    },
    {
      id: 4,
      geo: [53.919097365377816, 27.58990635733893],
      text: '4'
    },
    {
      id: 5,
      geo: [53.923249, 27.594045],
      text: '6'
    },
    {
      id: 6,
      geo: [53.924010375687665, 27.59251482430599],
      text: '7'
    },
    {
      id: 7,
      geo: [53.920592, 27.588745],
      text: '8'
    },
    {
      id: 8,
      geo: [53.921526, 27.590074],
      text: '9'
    },
    {
      id: 9,
      geo: [53.92354601790836, 27.59476787985397],
      text: '11'
    },
    {
      id: 10,
      geo: [53.923671, 27.593768],
      text: '12'
    },
    {
      id: 11,
      geo: [53.93789930283648, 27.668509542331684],
      text: '15'
    },
    {
      id: 12,
      geo: [53.929474457516434, 27.669153099999996],
      text: '16'
    },
    {
      id: 13,
      geo: [53.92337608578156, 27.59217818650766],
      text: '17'
    },
    {
      id: 14,
      geo: [53.921479668477815, 27.594813124743567],
      text: '18'
    },
    {
      id: 15,
      geo: [53.921843, 27.594328],
      text: '20'
    }
  ]